import React, { useEffect, useState, useRef } from 'react';
import { Language } from '../lib/translations';

interface HeaderProps {
  translations: {
    links: string[];
    cta: string;
  };
  onQuoteClick: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  forceScrolled?: boolean;
}

type DropdownKey = 'services' | 'portfolio' | 'tools' | null;

const Header: React.FC<HeaderProps> = ({
  translations,
  onQuoteClick,
  language,
  onChangeLanguage,
  forceScrolled = false,
}) => {
  const [scrolled, setScrolled] = useState(forceScrolled);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileSection, setMobileSection] = useState<DropdownKey>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const isAr = language === 'ar';
  const navLabels = {
    home: isAr ? 'الرئيسية' : 'Accueil',
    about: isAr ? 'من نحن' : 'À propos',
    services: isAr ? 'خدماتنا' : 'Services',
    blog: isAr ? 'المدونة' : 'Blog',
    contact: isAr ? 'اتصل بنا' : 'Contact',
  };

  useEffect(() => {
    const onScroll = () => setScrolled(forceScrolled || window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [forceScrolled]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.classList.toggle('iv-menu-open', open);
    if (!open) {
      setMobileSection(null);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('iv-menu-open');
    };
  }, [open]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const openDropdown = (key: DropdownKey) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(key);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 160);
  };

  const toggleDropdown = (key: Exclude<DropdownKey, null>) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const navigateToSection = (href: string) => {
    setOpen(false);
    setActiveDropdown(null);
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    const targetSelector = href === '#work' ? '#etudes-de-cas' : href;
    const scrollToTarget = () => {
      if (targetSelector === '#home' || targetSelector === '#accueil') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.querySelector(targetSelector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    const currentHash = window.location.hash;
    const isSubRoute = currentHash.startsWith('#/') && currentHash !== '#/';
    if (isSubRoute) {
      window.location.hash = '/';
      window.setTimeout(scrollToTarget, 160);
      window.setTimeout(scrollToTarget, 420);
      return;
    }
    window.setTimeout(scrollToTarget, 40);
  };

  const serviceColumns = isAr
    ? [
        {
          heading: '01 / الاستراتيجية والاستحواذ',
          items: [
            {
              title: 'التسويق الرقمي 360°',
              desc: 'استراتيجية الحضور، التموقع وخطة القنوات في الجزائر',
              href: '/agence-marketing-digital-algerie.html',
              tag: 'STRATÉGIE',
            },
            {
              title: 'إعلانات Meta & Google Ads',
              desc: 'حملات ممولة مرتبطة بصفحات هبوط وقياس الطلبات',
              href: '/publicite-meta-google-ads-algerie.html',
              tag: 'ADS',
            },
            {
              title: 'دليل SEO أو Google & Meta Ads',
              desc: 'مقارنة عملية لاختيار القناة الأنسب لميزانيتك',
              href: '/choisir-seo-google-ads-meta-algerie.html',
              tag: 'GUIDE SEO',
            },
          ],
        },
        {
          heading: '02 / صناعة المحتوى والتواصل',
          items: [
            {
              title: 'صناعة المحتوى والاستوديو',
              desc: 'إخراج فني، فيديوهات Reels، تصوير ونصوص إعلانية',
              href: '/creation-contenu-algerie.html',
              tag: 'STUDIO',
            },
            {
              title: 'معرض أعمال التواصل الاجتماعي',
              desc: 'صيغ النشر، التصاميم والفيديوهات القصيرة',
              href: '/portfolio-social-media-algerie.html',
              tag: 'SOCIAL',
            },
            {
              title: 'مرافقة مراكز التدريب والمدارس',
              desc: 'حلول مخصصة لملء الأفواج واستقطاب المسجلين',
              href: '/#/centres',
              tag: 'ACADÉMIQ',
            },
          ],
        },
        {
          heading: '03 / مواقع الويب والتحويل',
          items: [
            {
              title: 'إنشاء وتطوير مواقع الويب',
              desc: 'مواقع تعريفية، متاجر إلكترونية وتجديد مواقع',
              href: '/creation-site-web-algerie.html',
              tag: 'SITES WEB',
            },
            {
              title: 'معرض مواقع الويب المنجزة',
              desc: 'تصفح 8 مشاريع ويب ومتاجر إلكترونية مباشرة',
              href: '/portfolio-sites-web-algerie.html',
              tag: 'PORTFOLIO',
            },
            {
              title: 'طلب عرض سعر خاص بموقع ويب',
              desc: 'استمارة مخصصة لمشاريع الويب بدون التزام إعلاني',
              href: '/#/devis?service=site-web',
              tag: 'DEVIS WEB',
            },
          ],
        },
      ]
    : [
        {
          heading: '01 / STRATÉGIE & ACQUISITION',
          items: [
            {
              title: 'Marketing Digital 360°',
              desc: 'Positionnement, plan d’action multicanal & suivi en Algérie',
              href: '/agence-marketing-digital-algerie.html',
              tag: 'STRATÉGIE',
            },
            {
              title: 'Publicité Meta & Google Ads',
              desc: 'Campagnes sponsorisées, créas & génération de demandes',
              href: '/publicite-meta-google-ads-algerie.html',
              tag: 'ADS',
            },
            {
              title: 'Guide SEO vs Google & Meta Ads',
              desc: 'Comparatif clair pour prioriser vos investissements',
              href: '/choisir-seo-google-ads-meta-algerie.html',
              tag: 'GUIDE SEO',
            },
          ],
        },
        {
          heading: '02 / CRÉATION & SOCIAL MEDIA',
          items: [
            {
              title: 'Création de Contenu & Studio',
              desc: 'Direction artistique, Reels, visuels de marque & copywriting',
              href: '/creation-contenu-algerie.html',
              tag: 'STUDIO',
            },
            {
              title: 'Portfolio Social Media',
              desc: 'Formats éditoriaux, vidéos courtes & univers de marque',
              href: '/portfolio-social-media-algerie.html',
              tag: 'SOCIAL',
            },
            {
              title: 'Offre Centres de Formation',
              desc: 'Système d’acquisition dédié aux écoles & instituts',
              href: '/#/centres',
              tag: 'ACADÉMIQ',
            },
          ],
        },
        {
          heading: '03 / SITES WEB & EXPÉRIENCE',
          items: [
            {
              title: 'Création de Sites Web',
              desc: 'Sites vitrines, boutiques e-commerce & refonte SEO',
              href: '/creation-site-web-algerie.html',
              tag: 'SITES WEB',
            },
            {
              title: 'Portfolio Sites Web',
              desc: '8 réalisations web, e-commerce et produits digitaux',
              href: '/portfolio-sites-web-algerie.html',
              tag: 'PORTFOLIO',
            },
            {
              title: 'Devis Projet Site Web',
              desc: 'Formulaire dédié aux sites web sans budget pub imposé',
              href: '/#/devis?service=site-web',
              tag: 'DEVIS WEB',
            },
          ],
        },
      ];

  const portfolioItems = isAr
    ? [
        {
          num: '01',
          title: 'معرض مواقع الويب',
          desc: 'متاجر إلكترونية، مواقع تعريفية ومنتجات رقمية (8 مشاريع)',
          href: '/portfolio-sites-web-algerie.html',
        },
        {
          num: '02',
          title: 'معرض التواصل الاجتماعي',
          desc: 'مختارات المحتوى البصري، Reels وإدارة العلامات',
          href: '/portfolio-social-media-algerie.html',
        },
        {
          num: '03',
          title: 'مختارات الصفحة الرئيسية',
          desc: 'استعراض تفاعلي لأهم المشاريع على الرئيسية',
          href: '#work',
        },
      ]
    : [
        {
          num: '01',
          title: 'Portfolio Sites Web',
          desc: 'Boutiques e-commerce, sites vitrines & produits digitaux (8 projets)',
          href: '/portfolio-sites-web-algerie.html',
        },
        {
          num: '02',
          title: 'Portfolio Social Media',
          desc: 'Créations visuelles, formats courts Reels & direction artistique',
          href: '/portfolio-social-media-algerie.html',
        },
        {
          num: '03',
          title: 'Études de cas (Accueil)',
          desc: 'Parcourir la galerie interactive sur la page d’accueil',
          href: '#work',
        },
      ];

  const toolsItems = isAr
    ? [
        {
          num: '01',
          title: 'التشخيص الرقمي (Digital Score)',
          desc: 'قيّم نضج حضورك الرقمي من 100 في 60 ثانية',
          href: '/#/outils?tool=diagnostic',
        },
        {
          num: '02',
          title: 'حاسبة الفرص الضائعة',
          desc: 'احسب الزوار والطلبات المهدرة بسبب بطء الموقع بالدينار',
          href: '/#/outils?tool=pertes',
        },
        {
          num: '03',
          title: 'فحص SEO المجاني (الجزائر)',
          desc: 'قائمة فحص شاملة لجاهزية موقعك على محرك جوجل',
          href: '/#/outils?tool=audit-seo',
        },
        {
          num: '04',
          title: 'مصمم ومحاكي الموقع الإلكتروني',
          desc: 'اختر الصيغة والصفحات الأنسب لمشروعك القادم',
          href: '/#/outils?tool=simulateur-web',
        },
        {
          num: '05',
          title: 'حاسبة عرض السعر الفورية',
          desc: 'كوّن أقطاب مشروعك وأرسل الملخص مباشرة للفريق',
          href: '/#/outils?tool=calculateur',
        },
      ]
    : [
        {
          num: '01',
          title: 'Diagnostic Digital Score',
          desc: 'Évaluez votre maturité digitale sur 100 en 60 secondes',
          href: '/#/outils?tool=diagnostic',
        },
        {
          num: '02',
          title: 'Compteur de Pertes & Trafic',
          desc: 'Simulez les demandes et le CA manqués avec un site lent',
          href: '/#/outils?tool=pertes',
        },
        {
          num: '03',
          title: 'Audit SEO Gratuit',
          desc: 'Vérifiez les 8 piliers de visibilité Google en Algérie',
          href: '/#/outils?tool=audit-seo',
        },
        {
          num: '04',
          title: 'Simulateur de Site Web',
          desc: 'Trouvez l’architecture et le format adaptés à votre cible',
          href: '/#/outils?tool=simulateur-web',
        },
        {
          num: '05',
          title: 'Calculateur de Devis',
          desc: 'Configurez vos pôles sur mesure avant chiffrage',
          href: '/#/outils?tool=calculateur',
        },
      ];

  const mobileServiceItems = isAr
    ? [
        {
          title: 'التسويق الرقمي 360°',
          desc: 'استراتيجية الحضور والقنوات في الجزائر',
          href: '/agence-marketing-digital-algerie.html',
          tag: 'STRATÉGIE',
        },
        {
          title: 'صناعة المحتوى والاستوديو',
          desc: 'إخراج فني، فيديوهات Reels وتصاميم',
          href: '/creation-contenu-algerie.html',
          tag: 'STUDIO',
        },
        {
          title: 'إعلانات Meta & Google Ads',
          desc: 'حملات ممولة وقياس التحويلات',
          href: '/publicite-meta-google-ads-algerie.html',
          tag: 'ADS',
        },
        {
          title: 'إنشاء وتطوير مواقع الويب',
          desc: 'مواقع تعريفية ومتاجر إلكترونية',
          href: '/creation-site-web-algerie.html',
          tag: 'SITES WEB',
        },
        {
          title: 'دليل SEO أو Google & Meta Ads',
          desc: 'مقارنة لاختيار القناة الأنسب لميزانيتك',
          href: '/choisir-seo-google-ads-meta-algerie.html',
          tag: 'GUIDE',
        },
        {
          title: 'مرافقة مراكز التدريب والمدارس',
          desc: 'حلول مخصصة لملء الأفواج واستقطاب المسجلين',
          href: '/#/centres',
          tag: 'ACADÉMIQ',
        },
      ]
    : [
        {
          title: 'Marketing Digital 360°',
          desc: 'Positionnement, plan multicanal & suivi',
          href: '/agence-marketing-digital-algerie.html',
          tag: 'STRATÉGIE',
        },
        {
          title: 'Création de Contenu & Studio',
          desc: 'Direction artistique, Reels & visuels',
          href: '/creation-contenu-algerie.html',
          tag: 'STUDIO',
        },
        {
          title: 'Publicité Meta & Google Ads',
          desc: 'Campagnes sponsorisées & génération de leads',
          href: '/publicite-meta-google-ads-algerie.html',
          tag: 'ADS',
        },
        {
          title: 'Création de Sites Web',
          desc: 'Sites vitrines, e-commerce & refonte SEO',
          href: '/creation-site-web-algerie.html',
          tag: 'SITES WEB',
        },
        {
          title: 'Guide SEO vs Ads',
          desc: 'Comparatif pour choisir le bon levier',
          href: '/choisir-seo-google-ads-meta-algerie.html',
          tag: 'GUIDE',
        },
        {
          title: 'Offre Centres de Formation',
          desc: 'Système d’acquisition dédié aux écoles',
          href: '/#/centres',
          tag: 'ACADÉMIQ',
        },
      ];

  return (
    <>
      <header className={`iv-header ${scrolled || open || activeDropdown ? 'is-scrolled' : ''}`}>
        <div className="iv-header-inner">
          <a
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#accueil');
            }}
            className="iv-logo"
            aria-label="iVISION"
          >
            <img src="/images/ivision-logo-white.png" alt="iVISION" width={120} height={38} />
          </a>

          <nav
            ref={navRef}
            className="iv-nav"
            aria-label={isAr ? 'التنقل الرئيسي' : 'Navigation principale'}
          >
            <a
              href="#accueil"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('#accueil');
              }}
            >
              {navLabels.home}
            </a>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('#about');
              }}
            >
              {navLabels.about}
            </a>

            {/* MENU DÉROULANT : SERVICES (MEGA-MENU 3 COLONNES) */}
            <div
              className={`iv-nav-item has-dropdown ${activeDropdown === 'services' ? 'is-open' : ''}`}
              onMouseEnter={() => openDropdown('services')}
              onMouseLeave={scheduleCloseDropdown}
            >
              <button
                type="button"
                className="iv-nav-trigger"
                aria-expanded={activeDropdown === 'services'}
                onClick={() => toggleDropdown('services')}
              >
                <span>{navLabels.services}</span>
                <i className="iv-caret" aria-hidden="true">⌄</i>
              </button>

              <div className="iv-dropdown iv-dropdown-mega" role="region" aria-label={navLabels.services}>
                <div className="iv-mega-grid">
                  {serviceColumns.map((col) => (
                    <div key={col.heading} className="iv-mega-col">
                      <span className="iv-mega-heading">{col.heading}</span>
                      <div className="iv-mega-list">
                        {col.items.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="iv-dropdown-link"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="iv-dropdown-link-top">
                              <strong>{item.title}</strong>
                              <em>{item.tag}</em>
                            </div>
                            <span>{item.desc}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="iv-dropdown-footer">
                  <span>
                    {isAr
                      ? 'كل مشروع يبدأ بتشخيص واضح لأهدافك في السوق الجزائري.'
                      : 'Chaque accompagnement est calibré sur mesure pour le marché algérien.'}
                  </span>
                  <a href="#services" onClick={(e) => { e.preventDefault(); navigateToSection('#services'); }}>
                    {isAr ? 'استعراض جميع الخدمات ↓' : 'Voir le résumé des services ↓'}
                  </a>
                </div>
              </div>
            </div>

            {/* MENU DÉROULANT : PORTFOLIO */}
            <div
              className={`iv-nav-item has-dropdown ${activeDropdown === 'portfolio' ? 'is-open' : ''}`}
              onMouseEnter={() => openDropdown('portfolio')}
              onMouseLeave={scheduleCloseDropdown}
            >
              <button
                type="button"
                className="iv-nav-trigger"
                aria-expanded={activeDropdown === 'portfolio'}
                onClick={() => toggleDropdown('portfolio')}
              >
                <span>{isAr ? 'المعرض' : 'Portfolio'}</span>
                <i className="iv-caret" aria-hidden="true">⌄</i>
              </button>

              <div className="iv-dropdown iv-dropdown-list" role="region" aria-label="Portfolio">
                <span className="iv-mega-heading">
                  {isAr ? 'أعمالنا ومشاريعنا المعروضة' : 'SÉLECTION DE RÉALISATIONS iVISION'}
                </span>
                <div className="iv-mega-list">
                  {portfolioItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="iv-dropdown-link"
                      onClick={(e) => {
                        if (item.href.startsWith('#')) {
                          e.preventDefault();
                          navigateToSection(item.href);
                        } else {
                          setActiveDropdown(null);
                        }
                      }}
                    >
                      <div className="iv-dropdown-link-top">
                        <strong>{item.title}</strong>
                        <em>{item.num}</em>
                      </div>
                      <span>{item.desc}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* MENU DÉROULANT : OUTILS INTERACTIFS */}
            <div
              className={`iv-nav-item has-dropdown ${activeDropdown === 'tools' ? 'is-open' : ''}`}
              onMouseEnter={() => openDropdown('tools')}
              onMouseLeave={scheduleCloseDropdown}
            >
              <button
                type="button"
                className="iv-nav-trigger"
                aria-expanded={activeDropdown === 'tools'}
                onClick={() => toggleDropdown('tools')}
              >
                <span>{isAr ? 'الأدوات' : 'Outils'}</span>
                <i className="iv-caret" aria-hidden="true">⌄</i>
              </button>

              <div className="iv-dropdown iv-dropdown-list" role="region" aria-label={isAr ? 'الأدوات' : 'Outils'}>
                <span className="iv-mega-heading">
                  {isAr ? 'أدوات تفاعلية مجانية لاتخاذ القرار' : 'OUTILS & SIMULATEURS INTERACTIFS'}
                </span>
                <div className="iv-mega-list">
                  {toolsItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="iv-dropdown-link"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="iv-dropdown-link-top">
                        <strong>{item.title}</strong>
                        <em>{item.num}</em>
                      </div>
                      <span>{item.desc}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="/#/blog"
              onClick={() => {
                setOpen(false);
                setActiveDropdown(null);
              }}
            >
              {navLabels.blog}
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('#contact');
              }}
            >
              {navLabels.contact}
            </a>
          </nav>

          <div className="iv-header-actions">
            <div
              className="iv-lang-switch"
              role="group"
              aria-label={isAr ? 'تغيير اللغة' : 'Changer de langue'}
            >
              <button
                type="button"
                className={`iv-lang-btn ${language === 'fr' ? 'is-active' : ''}`}
                onClick={() => onChangeLanguage('fr')}
                aria-pressed={language === 'fr'}
                title="Français"
              >
                FR
              </button>
              <button
                type="button"
                className={`iv-lang-btn ${language === 'ar' ? 'is-active' : ''}`}
                onClick={() => onChangeLanguage('ar')}
                aria-pressed={language === 'ar'}
                title="العربية"
              >
                AR
              </button>
            </div>

            <button onClick={onQuoteClick} className="iv-header-cta">
              <span>{translations.cta}</span>
              <b aria-hidden="true">↗</b>
            </button>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className={`iv-menu-button ${open ? 'is-open' : ''}`}
              aria-expanded={open}
              aria-label={
                open
                  ? isAr
                    ? 'إغلاق القائمة'
                    : 'Fermer le menu'
                  : isAr
                    ? 'فتح القائمة'
                    : 'Ouvrir le menu'
              }
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`iv-mobile-backdrop ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div className={`iv-mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div
          className="iv-mobile-lang"
          role="group"
          aria-label={isAr ? 'تغيير اللغة' : 'Changer de langue'}
        >
          <button
            type="button"
            className={`iv-lang-btn ${language === 'fr' ? 'is-active' : ''}`}
            onClick={() => onChangeLanguage('fr')}
            aria-pressed={language === 'fr'}
          >
            Français
          </button>
          <button
            type="button"
            className={`iv-lang-btn ${language === 'ar' ? 'is-active' : ''}`}
            onClick={() => onChangeLanguage('ar')}
            lang="ar"
            aria-pressed={language === 'ar'}
          >
            العربية
          </button>
        </div>

        <nav className="iv-mobile-nav" aria-label={isAr ? 'قائمة الهاتف' : 'Navigation mobile'}>
          <a
            href="#accueil"
            className="iv-mobile-row"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#accueil');
            }}
          >
            <span>{navLabels.home}</span>
          </a>

          <a
            href="#about"
            className="iv-mobile-row"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#about');
            }}
          >
            <span>{navLabels.about}</span>
          </a>

          {/* ACCORDÉON MOBILE : SERVICES */}
          <div className={`iv-mobile-group ${mobileSection === 'services' ? 'is-open' : ''}`}>
            <button
              type="button"
              className="iv-mobile-row iv-mobile-accordion-btn"
              aria-expanded={mobileSection === 'services'}
              onClick={() => setMobileSection((prev) => (prev === 'services' ? null : 'services'))}
            >
              <span>{navLabels.services}</span>
              <i className="iv-caret" aria-hidden="true">⌄</i>
            </button>
            {mobileSection === 'services' && (
              <div className="iv-mobile-sublist">
                {mobileServiceItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="iv-mobile-sublink"
                    onClick={() => setOpen(false)}
                  >
                    <div className="iv-mobile-sublink-top">
                      <strong>{item.title}</strong>
                      <em>{item.tag}</em>
                    </div>
                    <small>{item.desc}</small>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ACCORDÉON MOBILE : PORTFOLIO */}
          <div className={`iv-mobile-group ${mobileSection === 'portfolio' ? 'is-open' : ''}`}>
            <button
              type="button"
              className="iv-mobile-row iv-mobile-accordion-btn"
              aria-expanded={mobileSection === 'portfolio'}
              onClick={() => setMobileSection((prev) => (prev === 'portfolio' ? null : 'portfolio'))}
            >
              <span>{isAr ? 'المعرض' : 'Portfolio'}</span>
              <i className="iv-caret" aria-hidden="true">⌄</i>
            </button>
            {mobileSection === 'portfolio' && (
              <div className="iv-mobile-sublist">
                {portfolioItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="iv-mobile-sublink"
                    onClick={(e) => {
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        navigateToSection(item.href);
                      } else {
                        setOpen(false);
                      }
                    }}
                  >
                    <div className="iv-mobile-sublink-top">
                      <strong>{item.title}</strong>
                      <em>{item.num}</em>
                    </div>
                    <small>{item.desc}</small>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ACCORDÉON MOBILE : OUTILS */}
          <div className={`iv-mobile-group ${mobileSection === 'tools' ? 'is-open' : ''}`}>
            <button
              type="button"
              className="iv-mobile-row iv-mobile-accordion-btn"
              aria-expanded={mobileSection === 'tools'}
              onClick={() => setMobileSection((prev) => (prev === 'tools' ? null : 'tools'))}
            >
              <span>{isAr ? 'الأدوات التفاعلية' : 'Outils & Simulateurs'}</span>
              <i className="iv-caret" aria-hidden="true">⌄</i>
            </button>
            {mobileSection === 'tools' && (
              <div className="iv-mobile-sublist">
                {toolsItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="iv-mobile-sublink"
                    onClick={() => setOpen(false)}
                  >
                    <div className="iv-mobile-sublink-top">
                      <strong>{item.title}</strong>
                      <em>{item.num}</em>
                    </div>
                    <small>{item.desc}</small>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="/#/blog"
            className="iv-mobile-row"
            onClick={() => setOpen(false)}
          >
            <span>{navLabels.blog}</span>
          </a>

          <a
            href="#contact"
            className="iv-mobile-row"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('#contact');
            }}
          >
            <span>{navLabels.contact}</span>
          </a>

          <button
            type="button"
            className="iv-mobile-cta-btn"
            onClick={() => {
              setOpen(false);
              onQuoteClick();
            }}
          >
            <span>{translations.cta}</span>
            <b aria-hidden="true">↗</b>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;
