// ===== Révélations au scroll + compteurs animés =====
// Observe les éléments `.iv-reveal` / `.iv-reveal-img` / `[data-count]`
// et leur ajoute `.is-visible` à l'entrée dans le viewport.
// Un MutationObserver couvre les sections lazy (Suspense) et les changements de route.

let initialized = false;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const animateCount = (el: HTMLElement) => {
  if (el.getAttribute('data-count-done')) return;
  el.setAttribute('data-count-done', '1');

  const finalText = el.textContent || '';
  const match = finalText.match(/(\d[\d\s.,]*)(.*)/);
  if (!match) return;

  const target = parseFloat(match[1].replace(/[\s.,]/g, ''));
  if (!Number.isFinite(target)) return;
  const suffix = match[2];

  const duration = 1500;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.round(target * easeOutCubic(progress));
    el.textContent = `${value}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = finalText;
  };

  requestAnimationFrame(tick);
};

export const initReveal = () => {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    document
      .querySelectorAll('.iv-reveal, .iv-reveal-img')
      .forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('is-visible');
        el.querySelectorAll('[data-count]').forEach((counter) =>
          animateCount(counter as HTMLElement)
        );
        if (el.hasAttribute('data-count')) animateCount(el);
        io.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  const observeAll = () => {
    document
      .querySelectorAll('.iv-reveal:not(.is-visible), .iv-reveal-group:not(.is-visible), .iv-reveal-img:not(.is-visible), [data-count]:not([data-count-done])')
      .forEach((el) => {
        // les compteurs déjà animés ne sont pas ré-observés
        if (el.hasAttribute('data-count') && el.hasAttribute('data-count-done')) return;
        io.observe(el);
      });
  };

  const mo = new MutationObserver(() => observeAll());
  mo.observe(document.body, { childList: true, subtree: true });
  observeAll();
};
