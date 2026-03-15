import { useEffect, useState, useRef } from 'react';
import { getService, type ServiceDetail } from '../data/services';
import { updateSEO, generateServiceSchema } from '../lib/seo-utils';

interface Props {
  slug: string;
}

const ServicePage = ({ slug }: Props) => {
  const [service, setService] = useState<ServiceDetail | undefined>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const featuresRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const found = getService(slug);
    setService(found);

    if (found) {
      updateSEO({
        title: found.title,
        description: found.metaDescription,
        canonical: `https://maleklabbaci.github.io/WEBSITE-iVISION/#/services/${found.slug}`,
      });

      const schema = generateServiceSchema(found);
      let scriptTag = document.querySelector('#service-schema');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'service-schema';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    }

    window.scrollTo(0, 0);

    return () => {
      const s = document.querySelector('#service-schema');
      if (s) s.remove();
    };
  }, [slug]);

  useEffect(() => {
    const refs = [
      { ref: featuresRef, id: 'features' },
      { ref: processRef, id: 'process' },
      { ref: pricingRef, id: 'pricing' },
      { ref: faqRef, id: 'faq' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [service]);

  if (!service) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-navy dark:text-white tracking-tighter uppercase">Service non trouvé</h1>
          <p className="text-brand-gray mt-4">Ce service n'existe pas.</p>
          <button
            onClick={() => (window.location.hash = '')}
            className="btn-ivision mt-8 px-8 py-4"
          >
            Retour
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-navy transition-colors duration-500">

      {/* ===== HERO ===== */}
      <section className="pt-32 md:pt-44 pb-20 md:pb-32 relative overflow-hidden">
        <div className="container">
          <button
            onClick={() => (window.location.hash = '')}
            className="flex items-center gap-2 text-brand-gray hover:text-brand-blue transition-colors mb-10 text-[11px] font-bold uppercase tracking-widest"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M7 7h10v10" />
            </svg>
            Retour
          </button>

          <div className="max-w-4xl">
            <div className="sketch-badge mb-6 md:mb-8">{service.title.split(' ')[0]}</div>
            <h1 className="text-[clamp(2rem,5vw,6rem)] font-black text-navy dark:text-white tracking-tighter leading-[1] md:leading-[0.85] uppercase transition-colors duration-500">
              {service.heroTitle.split(' ').slice(0, Math.ceil(service.heroTitle.split(' ').length / 2)).join(' ')} <br className="hidden md:block" />
              <span className="text-brand-blue">{service.heroTitle.split(' ').slice(Math.ceil(service.heroTitle.split(' ').length / 2)).join(' ')}</span>
            </h1>
            <p className="text-base md:text-xl text-brand-gray dark:text-brand-gray/80 max-w-2xl mt-8 font-medium leading-relaxed">
              {service.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={() => (window.location.hash = '/devis')}
                className="btn-ivision px-8 py-4"
              >
                {service.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" />
                </svg>
              </button>
              <a
                href="#pricing-section"
                onClick={(e) => {
                  e.preventDefault();
                  pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-navy/60 dark:text-white/60 hover:text-brand-blue transition-colors px-8 py-4 border border-navy/10 dark:border-white/10 rounded-xl hover:border-brand-blue"
              >
                Voir les tarifs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section
        id="features"
        ref={featuresRef}
        className="py-24 md:py-40 border-t border-navy/5 dark:border-white/5 transition-colors duration-500"
      >
        <div className="container">
          <div className={`mb-16 md:mb-24 transition-all duration-1000 ${visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="sketch-badge mb-6 md:mb-8">Inclus</div>
            <h2 className="text-[clamp(1.5rem,4vw,5rem)] font-black text-navy dark:text-white tracking-tighter leading-[1] md:leading-[0.85] uppercase">
              Ce que vous <br className="hidden md:block" />
              <span className="text-brand-blue">obtenez</span>
            </h2>
            <p className="text-base md:text-lg text-brand-gray dark:text-brand-gray/80 max-w-2xl mt-6 font-medium">
              {service.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className={`group glass-card p-8 md:p-10 hover:border-brand-blue/30 transition-all duration-700 ${
                  visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all transform group-hover:rotate-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-black text-navy dark:text-white uppercase tracking-tighter leading-tight mb-3 group-hover:text-brand-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-brand-gray dark:text-brand-gray/80 text-sm leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section
        id="process"
        ref={processRef}
        className="py-24 md:py-40 border-t border-navy/5 dark:border-white/5 transition-colors duration-500"
      >
        <div className="container">
          <div className={`mb-16 md:mb-24 transition-all duration-1000 ${visibleSections.has('process') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="sketch-badge mb-6 md:mb-8">Process</div>
            <h2 className="text-[clamp(1.5rem,4vw,5rem)] font-black text-navy dark:text-white tracking-tighter leading-[1] md:leading-[0.85] uppercase">
              Comment on <br className="hidden md:block" />
              <span className="text-brand-blue">travaille</span>
            </h2>
          </div>

          <div className="max-w-3xl">
            {service.process.map((step, i) => (
              <div
                key={step.step}
                className={`flex gap-6 md:gap-10 transition-all duration-700 ${
                  visibleSections.has('process') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150 + 200}ms` }}
              >
                {/* Timeline */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center text-white font-black text-lg">
                    {step.step}
                  </div>
                  {i < service.process.length - 1 && (
                    <div className="w-[2px] h-full min-h-[60px] bg-brand-blue/10 mt-3"></div>
                  )}
                </div>

                {/* Content */}
                <div className="pb-10 md:pb-14">
                  <h3 className="text-xl md:text-2xl font-black text-navy dark:text-white uppercase tracking-tighter leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-brand-gray dark:text-brand-gray/80 text-sm md:text-base leading-relaxed font-medium mt-2 opacity-70">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section
        id="pricing"
        ref={pricingRef}
        className="py-24 md:py-40 border-t border-navy/5 dark:border-white/5 transition-colors duration-500"
      >
        <div className="container">
          <div className={`mb-16 md:mb-24 text-center transition-all duration-1000 ${visibleSections.has('pricing') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="sketch-badge mb-6 md:mb-8 mx-auto">Tarifs</div>
            <h2 className="text-[clamp(1.5rem,4vw,5rem)] font-black text-navy dark:text-white tracking-tighter leading-[1] md:leading-[0.85] uppercase">
              Tarifs <span className="text-brand-blue">transparents</span>
            </h2>
            <p className="text-brand-gray dark:text-brand-gray/80 mt-6 font-medium text-base md:text-lg max-w-xl mx-auto">
              Pas de frais cachés. Ce que vous voyez est ce que vous payez.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {service.pricing.map((plan, i) => (
              <div
                key={i}
                className={`relative glass-card p-8 md:p-10 transition-all duration-700 ${
                  plan.popular ? 'border-brand-blue shadow-xl shadow-brand-blue/5' : ''
                } ${visibleSections.has('pricing') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 150 + 200}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="sketch-badge text-[8px]">Populaire</span>
                  </div>
                )}

                <h3 className="text-xl font-black text-navy dark:text-white uppercase tracking-tighter">{plan.name}</h3>

                <div className="flex items-baseline gap-1 mt-4 mb-8">
                  <span className="text-3xl md:text-4xl font-black text-navy dark:text-white tracking-tighter">{plan.price}</span>
                  {plan.period && <span className="text-brand-gray text-sm font-medium">{plan.period}</span>}
                </div>

                <ul className="space-y-3 mb-10">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <svg className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-brand-gray dark:text-brand-gray/80 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => (window.location.hash = '/devis')}
                  className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${
                    plan.popular
                      ? 'btn-ivision'
                      : 'bg-navy/5 dark:bg-white/5 text-navy dark:text-white border border-navy/10 dark:border-white/10 hover:bg-brand-blue hover:border-brand-blue hover:text-white'
                  }`}
                >
                  Choisir ce plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section
        id="faq"
        ref={faqRef}
        className="py-24 md:py-40 border-t border-navy/5 dark:border-white/5 transition-colors duration-500"
      >
        <div className="container">
          <div className={`mb-16 md:mb-24 transition-all duration-1000 ${visibleSections.has('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="sketch-badge mb-6 md:mb-8">FAQ</div>
            <h2 className="text-[clamp(1.5rem,4vw,5rem)] font-black text-navy dark:text-white tracking-tighter leading-[1] md:leading-[0.85] uppercase">
              Questions <span className="text-brand-blue">fréquentes</span>
            </h2>
          </div>

          <div className="max-w-3xl space-y-3">
            {service.faq.map((item, i) => (
              <div
                key={i}
                className={`glass-card overflow-hidden transition-all duration-700 ${
                  visibleSections.has('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <span className="text-navy dark:text-white font-bold text-sm md:text-base pr-4 uppercase tracking-tight">{item.question}</span>
                  <div className={`w-8 h-8 bg-brand-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === i ? 'bg-brand-blue rotate-45' : ''}`}>
                    <svg className={`w-4 h-4 transition-colors ${openFaq === i ? 'text-white' : 'text-brand-blue'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === i ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-brand-gray dark:text-brand-gray/80 text-sm leading-relaxed font-medium border-t border-navy/5 dark:border-white/5 pt-4">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-24 md:py-40 border-t border-navy/5 dark:border-white/5 transition-colors duration-500">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <div className="sketch-badge mb-6 md:mb-8 mx-auto">Commencer</div>
            <h2 className="text-[clamp(1.5rem,4vw,5rem)] font-black text-navy dark:text-white tracking-tighter leading-[1] md:leading-[0.85] uppercase">
              Prêt à <span className="text-brand-blue">démarrer</span> ?
            </h2>
            <p className="text-brand-gray dark:text-brand-gray/80 mt-6 font-medium text-base md:text-lg">
              Consultation gratuite de 60 minutes. Sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <button
                onClick={() => (window.location.hash = '/devis')}
                className="btn-ivision px-10 py-5"
              >
                {service.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" />
                </svg>
              </button>
              <a
                href="https://wa.me/213563839404"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-navy/60 dark:text-white/60 hover:text-brand-blue transition-colors px-8 py-4 border border-navy/10 dark:border-white/10 rounded-xl hover:border-brand-blue"
              >
                WhatsApp direct
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
