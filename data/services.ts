export interface ServiceDetail {
  slug: string;
  title: string;
  metaDescription: string;
  icon: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  pricing: {
    name: string;
    price: string;
    period?: string;
    features: string[];
    popular?: boolean;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  cta: string;
}

export const services: ServiceDetail[] = [
  {
    slug: 'creation-site-web',
    title: 'Création de Sites Web Professionnels',
    metaDescription: 'Création de sites web modernes, rapides et optimisés SEO en Algérie. Sites vitrines, e-commerce, applications web sur mesure.',
    icon: '🌐',
    heroTitle: 'Sites web qui convertissent vos visiteurs en clients',
    heroSubtitle: 'Design moderne, performance optimale, SEO intégré. Votre site web professionnel livré en 21 jours.',
    description: 'Nous créons des sites web sur mesure qui ne sont pas juste beaux — ils sont conçus pour générer des résultats. Chaque pixel, chaque ligne de code, chaque mot est optimisé pour convertir vos visiteurs en clients.',
    features: [
      {
        title: 'Design Sur-Mesure',
        description: 'Chaque site est unique. Pas de templates. Design personnalisé qui reflète votre marque et se démarque de la concurrence.',
        icon: '🎨'
      },
      {
        title: 'Responsive & Mobile-First',
        description: 'Votre site s\'adapte parfaitement à tous les écrans : mobile, tablette, desktop. 89% de vos visiteurs sont sur mobile.',
        icon: '📱'
      },
      {
        title: 'SEO Intégré',
        description: 'Chaque page est optimisée pour Google dès le départ. Structure, balises, vitesse, schema markup — tout est inclus.',
        icon: '🔍'
      },
      {
        title: 'Ultra-Rapide',
        description: 'Temps de chargement < 2 secondes. Technologies modernes (React, Next.js) pour une performance maximale.',
        icon: '⚡'
      },
      {
        title: 'Sécurisé',
        description: 'SSL gratuit, protection DDoS, sauvegardes automatiques. Votre site et les données de vos clients sont protégés.',
        icon: '🔒'
      },
      {
        title: 'Maintenance Incluse',
        description: '3 mois de maintenance gratuite inclus. Mises à jour, corrections, support technique par WhatsApp.',
        icon: '🛠️'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Consultation gratuite',
        description: 'On discute de votre projet, vos objectifs et votre budget. 60 minutes pour tout comprendre.'
      },
      {
        step: 2,
        title: 'Maquette & Design',
        description: 'Création de maquettes Figma. Vous validez chaque page avant le développement. Modifications illimitées.'
      },
      {
        step: 3,
        title: 'Développement',
        description: 'Codage propre et moderne. Technologies performantes. Tests sur tous les appareils et navigateurs.'
      },
      {
        step: 4,
        title: 'Tests & Optimisation',
        description: 'Tests de performance, SEO, sécurité et compatibilité. On ne livre que quand c\'est parfait.'
      },
      {
        step: 5,
        title: 'Livraison & Formation',
        description: 'Mise en ligne + formation pour gérer votre site. Documentation complète fournie.'
      }
    ],
    pricing: [
      {
        name: 'Site Vitrine',
        price: '150,000 DZD',
        features: [
          '5 pages optimisées',
          'Design responsive',
          'Formulaire de contact',
          'SEO de base',
          'SSL gratuit',
          'Livraison en 14 jours',
          '1 mois de maintenance'
        ]
      },
      {
        name: 'Site Business',
        price: '350,000 DZD',
        popular: true,
        features: [
          '10 pages optimisées',
          'Design sur-mesure',
          'Blog intégré',
          'SEO avancé',
          'Analytics intégré',
          'WhatsApp integration',
          'Livraison en 21 jours',
          '3 mois de maintenance'
        ]
      },
      {
        name: 'Site Premium',
        price: '600,000+ DZD',
        features: [
          'Pages illimitées',
          'Design premium',
          'Fonctionnalités avancées',
          'Multi-langue (FR/AR)',
          'Dashboard admin',
          'SEO premium',
          'Livraison en 30 jours',
          '6 mois de maintenance'
        ]
      }
    ],
    faq: [
      {
        question: 'Combien de temps pour créer un site web ?',
        answer: 'Un site vitrine prend 14 jours, un site business 21 jours, et un site premium 30 jours. Ces délais sont garantis après validation de la maquette.'
      },
      {
        question: 'Est-ce que je peux modifier mon site moi-même ?',
        answer: 'Oui ! Nous intégrons un système de gestion de contenu (CMS) simple. Nous vous formons à son utilisation. Sinon, on s\'en charge pour vous.'
      },
      {
        question: 'Le site sera-t-il visible sur Google ?',
        answer: 'Absolument. Le SEO est intégré dès la conception : structure optimisée, balises meta, vitesse de chargement, sitemap, et soumission à Google Search Console.'
      },
      {
        question: 'Quel hébergement recommandez-vous ?',
        answer: 'Nous recommandons Vercel ou Cloudflare Pages (gratuits et ultra-rapides) pour les sites vitrines, et des VPS pour les sites avec backend. L\'hébergement est inclus la première année.'
      },
      {
        question: 'Et si je ne suis pas satisfait ?',
        answer: 'Nous offrons des modifications illimitées sur la maquette. Le développement ne commence qu\'après votre validation à 100%. Satisfaction garantie.'
      }
    ],
    cta: 'Demander mon devis site web gratuit'
  },

  {
    slug: 'marketing-digital',
    title: 'Marketing Digital & Publicité en Ligne',
    metaDescription: 'Agence marketing digital en Algérie. Facebook Ads, Google Ads, SEO, réseaux sociaux. Stratégies qui génèrent des clients.',
    icon: '📈',
    heroTitle: 'Stratégies marketing qui génèrent de vrais clients',
    heroSubtitle: 'Facebook Ads, Google Ads, SEO, réseaux sociaux. On transforme votre budget marketing en retour sur investissement.',
    description: 'Le marketing digital ne se résume pas à poster sur Facebook. C\'est une stratégie complète qui combine plusieurs canaux pour atteindre vos objectifs business. Nous créons et exécutons cette stratégie pour vous.',
    features: [
      {
        title: 'Facebook & Instagram Ads',
        description: 'Campagnes publicitaires ciblées. Audience algérienne ultra-qualifiée. ROI mesurable et optimisation continue.',
        icon: '📱'
      },
      {
        title: 'Google Ads',
        description: 'Apparaissez en premier quand vos clients cherchent vos services. CPC ultra-bas en Algérie = ROI massif.',
        icon: '🔍'
      },
      {
        title: 'Community Management',
        description: 'Gestion complète de vos réseaux sociaux. Contenu, engagement, modération. Croissance organique réelle.',
        icon: '💬'
      },
      {
        title: 'SEO & Référencement',
        description: 'Dominez Google pour vos mots-clés. SEO technique, contenu, backlinks. Résultats durables à long terme.',
        icon: '📊'
      },
      {
        title: 'Email Marketing',
        description: 'Séquences email automatisées. Newsletters engageantes. Fidélisation client et ventes récurrentes.',
        icon: '📧'
      },
      {
        title: 'Analytics & Reporting',
        description: 'Dashboard en temps réel. Rapports mensuels détaillés. On mesure chaque dinar investi.',
        icon: '📉'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Audit stratégique gratuit',
        description: 'Analyse de votre présence en ligne, vos concurrents, et vos opportunités. 60 minutes offertes.'
      },
      {
        step: 2,
        title: 'Stratégie personnalisée',
        description: 'Plan d\'action détaillé avec objectifs SMART, canaux prioritaires, budget et timeline.'
      },
      {
        step: 3,
        title: 'Exécution & Création',
        description: 'Création de contenu, setup des campagnes, optimisation SEO. On gère tout.'
      },
      {
        step: 4,
        title: 'Optimisation continue',
        description: 'A/B testing, ajustement des budgets, optimisation des conversions. Amélioration permanente.'
      },
      {
        step: 5,
        title: 'Reporting mensuel',
        description: 'Rapport détaillé avec KPIs, insights et recommandations. Réunion mensuelle de suivi.'
      }
    ],
    pricing: [
      {
        name: 'Starter',
        price: '80,000 DZD',
        period: '/mois',
        features: [
          'Gestion 2 réseaux sociaux',
          '12 posts/mois',
          'Stories hebdomadaires',
          'Rapport mensuel',
          'Community management basique'
        ]
      },
      {
        name: 'Growth',
        price: '180,000 DZD',
        period: '/mois',
        popular: true,
        features: [
          'Gestion 3 réseaux sociaux',
          '20 posts/mois',
          'Facebook Ads management',
          'Création de contenu vidéo',
          'SEO basique',
          'Rapport bi-mensuel',
          'Support WhatsApp'
        ]
      },
      {
        name: 'Scale',
        price: '350,000+ DZD',
        period: '/mois',
        features: [
          'Tous les réseaux sociaux',
          'Posts illimités',
          'Facebook + Google Ads',
          'SEO avancé',
          'Email marketing',
          'Shooting photo/vidéo',
          'Dashboard en temps réel',
          'Account manager dédié'
        ]
      }
    ],
    faq: [
      {
        question: 'Combien de temps avant de voir des résultats ?',
        answer: 'Les publicités génèrent des résultats dès la première semaine. Le SEO et le contenu organique prennent 3-6 mois pour des résultats significatifs.'
      },
      {
        question: 'Quel budget publicitaire recommandez-vous ?',
        answer: 'Minimum 10,000 DZD/jour pour Facebook Ads et 5,000 DZD/jour pour Google Ads. Nous optimisons pour maximiser le ROI peu importe le budget.'
      },
      {
        question: 'Est-ce que je garde le contrôle de mes comptes ?',
        answer: 'Absolument. Vous restez propriétaire de tous vos comptes (Facebook, Google, Instagram). Nous avons un accès gestion, que vous pouvez révoquer à tout moment.'
      }
    ],
    cta: 'Demander mon audit marketing gratuit'
  },

  {
    slug: 'branding-identite-visuelle',
    title: 'Branding & Identité Visuelle',
    metaDescription: 'Création de marque et identité visuelle en Algérie. Logo, charte graphique, naming. Démarquez-vous de la concurrence.',
    icon: '🎨',
    heroTitle: 'Une marque forte qui marque les esprits',
    heroSubtitle: 'Logo, charte graphique, identité complète. On crée l\'ADN visuel de votre marque pour qu\'elle soit inoubliable.',
    description: 'Votre marque est le premier contact avec vos clients. Elle doit communiquer professionnalisme, confiance et différenciation en quelques secondes. Nous créons des identités de marque mémorables.',
    features: [
      {
        title: 'Création de Logo',
        description: 'Logo unique et mémorable. Recherche approfondie, 3 propositions, modifications illimitées jusqu\'à satisfaction totale.',
        icon: '✏️'
      },
      {
        title: 'Charte Graphique',
        description: 'Document complet : couleurs, typographies, utilisations du logo, templates. La bible visuelle de votre marque.',
        icon: '📋'
      },
      {
        title: 'Naming & Slogan',
        description: 'Création de nom de marque et slogan impactant. Vérification de disponibilité du domaine et des réseaux sociaux.',
        icon: '💡'
      },
      {
        title: 'Supports Marketing',
        description: 'Cartes de visite, flyers, brochures, roll-up, packaging. Tous les supports physiques dont vous avez besoin.',
        icon: '🖨️'
      },
      {
        title: 'Kit Réseaux Sociaux',
        description: 'Templates pour tous vos réseaux : couvertures, posts, stories, highlights. Cohérence visuelle garantie.',
        icon: '📱'
      },
      {
        title: 'Brand Guidelines',
        description: 'Guide complet d\'utilisation de votre marque. Pour que votre équipe et vos prestataires respectent votre identité.',
        icon: '📖'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Brief créatif',
        description: 'On apprend tout sur votre entreprise, vos valeurs, votre cible et vos concurrents. Questionnaire détaillé + call.'
      },
      {
        step: 2,
        title: 'Recherche & Moodboard',
        description: 'Recherche d\'inspiration, analyse des tendances, création de moodboards pour définir la direction créative.'
      },
      {
        step: 3,
        title: 'Propositions créatives',
        description: '3 directions créatives présentées avec logo, couleurs et typographie. Vous choisissez votre préférée.'
      },
      {
        step: 4,
        title: 'Affinage & Finalisation',
        description: 'Modifications illimitées sur la direction choisie. On ne s\'arrête que quand c\'est parfait pour vous.'
      },
      {
        step: 5,
        title: 'Livraison complète',
        description: 'Tous les fichiers (AI, SVG, PNG, PDF), charte graphique, templates. Tout est organisé et documenté.'
      }
    ],
    pricing: [
      {
        name: 'Logo Essential',
        price: '40,000 DZD',
        features: [
          'Recherche & brief',
          '3 propositions de logo',
          'Modifications illimitées',
          'Fichiers AI + PNG + SVG',
          'Versions couleur & noir',
          'Livraison en 7 jours'
        ]
      },
      {
        name: 'Brand Identity',
        price: '150,000 DZD',
        popular: true,
        features: [
          'Tout de Logo Essential',
          'Charte graphique (20 pages)',
          'Palette de couleurs',
          'Typographies',
          'Carte de visite',
          'Kit réseaux sociaux',
          'Signature email',
          'Livraison en 14 jours'
        ]
      },
      {
        name: 'Full Branding',
        price: '350,000+ DZD',
        features: [
          'Tout de Brand Identity',
          'Naming & slogan',
          'Flyers & brochures',
          'Roll-up & kakemono',
          'Packaging design',
          'Brand guidelines complètes',
          'Shooting photo',
          'Livraison en 21 jours'
        ]
      }
    ],
    faq: [
      {
        question: 'Combien de propositions de logo vais-je recevoir ?',
        answer: '3 propositions créatives différentes. Vous choisissez celle qui vous plaît le plus, puis on l\'affine avec des modifications illimitées.'
      },
      {
        question: 'Et si aucune proposition ne me plaît ?',
        answer: 'C\'est très rare grâce à notre brief détaillé, mais si c\'est le cas, on recommence avec 3 nouvelles propositions. Satisfaction garantie.'
      },
      {
        question: 'Je reçois quels fichiers ?',
        answer: 'Tous les formats : AI (éditable), SVG (web), PNG (transparent), PDF (print), JPG. En haute et basse résolution. Plus les fonts utilisées.'
      }
    ],
    cta: 'Créer mon identité de marque'
  },

  {
    slug: 'production-audiovisuelle',
    title: 'Production Audiovisuelle & Contenu Vidéo',
    metaDescription: 'Production vidéo professionnelle en Algérie. Spots publicitaires, vidéos corporate, contenu réseaux sociaux, drone.',
    icon: '🎬',
    heroTitle: 'Des vidéos qui captent l\'attention et vendent',
    heroSubtitle: 'Production vidéo professionnelle. Spots pub, corporate, réseaux sociaux, drone. Du concept à la diffusion.',
    description: 'La vidéo est le format n°1 en 2026. Elle génère 3x plus d\'engagement que tout autre contenu. Nous produisons des vidéos professionnelles qui racontent votre histoire et vendent vos produits.',
    features: [
      {
        title: 'Spots Publicitaires',
        description: 'Vidéos pub courtes (15-60s) optimisées pour Facebook, Instagram et TikTok. Scripting, tournage, montage.',
        icon: '📺'
      },
      {
        title: 'Vidéos Corporate',
        description: 'Présentez votre entreprise, vos valeurs, votre équipe. Vidéos professionnelles pour site web et LinkedIn.',
        icon: '🏢'
      },
      {
        title: 'Contenu Réseaux Sociaux',
        description: 'Reels, TikTok, Stories. Contenu vidéo court et viral adapté à chaque plateforme.',
        icon: '📱'
      },
      {
        title: 'Prise de Vue Drone',
        description: 'Images aériennes spectaculaires. Idéal pour immobilier, tourisme, événements, construction.',
        icon: '🚁'
      },
      {
        title: 'Motion Design',
        description: 'Animations 2D/3D, infographies animées, logos animés. Pour expliquer des concepts complexes simplement.',
        icon: '🎭'
      },
      {
        title: 'Shooting Photo',
        description: 'Photos produit, portraits corporate, événements. Retouche professionnelle incluse.',
        icon: '📸'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Brief & Concept',
        description: 'On définit ensemble l\'objectif, le message, la cible et le ton. Écriture du script et storyboard.'
      },
      {
        step: 2,
        title: 'Pré-production',
        description: 'Planification du tournage : repérage, casting si nécessaire, planning, matériel.'
      },
      {
        step: 3,
        title: 'Tournage',
        description: 'Équipe pro sur place : caméra 4K, éclairage, son professionnel. Direction artistique soignée.'
      },
      {
        step: 4,
        title: 'Post-production',
        description: 'Montage, étalonnage couleur, sound design, motion graphics. Votre validation à chaque étape.'
      },
      {
        step: 5,
        title: 'Livraison multi-format',
        description: 'Versions optimisées pour chaque plateforme (16:9, 9:16, 1:1). Fichiers master + versions compressées.'
      }
    ],
    pricing: [
      {
        name: 'Contenu Social',
        price: '60,000 DZD',
        features: [
          '3 vidéos courtes (15-30s)',
          'Tournage 1/2 journée',
          'Montage + musique',
          'Format vertical (9:16)',
          'Livraison en 5 jours'
        ]
      },
      {
        name: 'Spot Publicitaire',
        price: '200,000 DZD',
        popular: true,
        features: [
          '1 spot pub (30-60s)',
          'Script + storyboard',
          'Tournage 1 journée',
          'Montage professionnel',
          'Étalonnage couleur',
          'Sound design',
          '3 formats (16:9, 9:16, 1:1)',
          'Livraison en 10 jours'
        ]
      },
      {
        name: 'Pack Corporate',
        price: '500,000+ DZD',
        features: [
          'Vidéo corporate (2-5 min)',
          '5 contenus réseaux sociaux',
          'Photos corporate',
          'Prise de vue drone',
          'Motion graphics',
          'Script + voix off',
          'Tournage 2 jours',
          'Livraison en 15 jours'
        ]
      }
    ],
    faq: [
      {
        question: 'Quel matériel utilisez-vous ?',
        answer: 'Caméras Sony A7IV / Canon R5 en 4K, stabilisateur DJI RS3, drone DJI Mini 4 Pro, éclairage Aputure, micro Rode. Matériel professionnel garanti.'
      },
      {
        question: 'Combien de modifications sont incluses ?',
        answer: '2 tours de modifications inclus dans chaque formule. Modifications supplémentaires disponibles si besoin.'
      },
      {
        question: 'Vous vous déplacez où en Algérie ?',
        answer: 'Partout ! Blida, Alger, et toutes les wilayas. Frais de déplacement inclus pour Blida/Alger, devis spécifique pour les autres wilayas.'
      }
    ],
    cta: 'Demander un devis vidéo'
  }
];

export const getService = (slug: string): ServiceDetail | undefined => {
  return services.find(s => s.slug === slug);
};
