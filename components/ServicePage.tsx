import { useEffect, useState } from 'react';
import { getService, type ServiceDetail } from '../data/services';
import { updateSEO, generateServiceSchema } from '../lib/seo-utils';

interface Props {
  slug: string;
}

const ServicePage = ({ slug }: Props) => {
  const [service, setService] = useState<ServiceDetail | undefined>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const found = getService(slug);
    setService(found);

    if (found) {
      updateSEO({
        title: found.title,
        description: found.metaDescription,
        canonical: `https://ivision-agency.com/services/${found.slug}`,
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

  if (!service) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-navy dark:text-white mb-4">Service non trouvé</h1>
          <button
            onClick={() => (window.location.hash = '')}
            className="btn-ivision px-6 py-3"
          >
            ← Retour à l'accueil
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <button
            onClick={() => (window.location.hash = '')}
            className="text-brand-gray hover:text-brand-blue transition mb-8 inline-flex items-center gap-2 font-medium"
          >
            ← Retour
          </button>
          <span className="text-6xl block mb-6">{service.icon}</span>
          <h1 className="text-4xl md:text-6xl font-black text-navy dark:text-white mb-6 leading-tight tracking-tighter">
            {service.heroTitle}
          </h1>
          <p className="text-brand-gray dark:text-brand-gray/80 text-xl max-w-3xl mx-auto mb-10">
            {service.heroSubtitle}
          </p>
          <button
            onClick={() => (window.location.hash = '/devis')}
            className="btn-ivision px-8 py-4 text-lg"
          >
            {service.cta} →
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 border-t border-navy/5 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-navy dark:text-white text-center mb-4 tracking-tighter">
            Ce qui est inclus
          </h2>
          <p className="text-brand-gray text-center mb-12 max-w-2xl mx-auto">
            {service.description}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-[2rem] p-6 hover:border-brand-blue/30 transition"
              >
                <span className="text-3xl block mb-4">{feature.icon}</span>
                <h3 className="text-navy dark:text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-brand-gray dark:text-brand-gray/80 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 border-t border-navy/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-navy dark:text-white text-center mb-12 tracking-tighter">
            Notre process
          </h2>
          <div className="space-y-8">
            {service.process.map((step) => (
              <div key={step.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-black text-lg">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-navy dark:text-white font-bold text-lg mb-1">{step.title}</h3>
                  <p className="text-brand-gray dark:text-brand-gray/80">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 border-t border-navy/5 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-navy dark:text-white text-center mb-4 tracking-tighter">
            Tarifs transparents
          </h2>
          <p className="text-brand-gray text-center mb-12">
            Pas de frais cachés. Ce que vous voyez est ce que vous payez.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {service.pricing.map((plan, i) => (
              <div
                key={i}
                className={`relative bg-white dark:bg-white/5 border rounded-[2rem] p-8 ${
                  plan.popular
                    ? 'border-brand-blue shadow-xl shadow-brand-blue/10'
                    : 'border-navy/10 dark:border-white/10'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
                    Populaire
                  </span>
                )}
                <h3 className="text-navy dark:text-white font-bold text-xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-navy dark:text-white">{plan.price}</span>
                  {plan.period && <span className="text-brand-gray text-sm">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-brand-gray dark:text-brand-gray/80 text-sm">
                      <span className="text-green-500 mt-0.5 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => (window.location.hash = '/devis')}
                  className={`w-full py-3 rounded-2xl font-bold transition ${
                    plan.popular
                      ? 'btn-ivision'
                      : 'bg-navy/5 dark:bg-white/10 text-navy dark:text-white hover:bg-navy/10 dark:hover:bg-white/20'
                  }`}
                >
                  Choisir ce plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 border-t border-navy/5 dark:border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-navy dark:text-white text-center mb-12 tracking-tighter">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {service.faq.map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-navy dark:text-white font-medium pr-4">{item.question}</span>
                  <span className={`text-brand-blue text-xl font-bold transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-brand-gray dark:text-brand-gray/80 leading-relaxed border-t border-navy/5 dark:border-white/5 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 border-t border-navy/5 dark:border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-navy dark:text-white mb-4 tracking-tighter">
            Prêt à démarrer ?
          </h2>
          <p className="text-brand-gray mb-8">
            Consultation gratuite de 60 minutes. Sans engagement.
          </p>
          <button
            onClick={() => (window.location.hash = '/devis')}
            className="btn-ivision px-8 py-4 text-lg"
          >
            {service.cta} →
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
