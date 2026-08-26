import React from 'react';
import type { Language } from '../lib/translations';

type LegalPageProps = { language: Language; type: 'privacy' | 'terms' };

const copy = {
  fr: {
    privacy: { title: 'Politique de confidentialité', intro: 'Chez iVISION Agency, nous accordons une importance primordiale à la protection de vos données personnelles.', sections: [['Collecte des données', 'Nous collectons les informations que vous fournissez via nos formulaires (nom, téléphone, e-mail, entreprise et informations de projet) uniquement pour traiter vos demandes de devis.'], ['Utilisation', 'Vos données servent à répondre à votre demande et à vous contacter par WhatsApp ou e-mail. Les formulaires utilisent Formspark pour transmettre les demandes à iVISION ; ne saisissez jamais de données bancaires ou de mots de passe.'], ['Sécurité', 'Nous limitons l’accès aux demandes reçues et appliquons des mesures raisonnables de sécurité. Les données peuvent être traitées par Formspark selon ses propres conditions et sa politique de confidentialité.']] },
    terms: { title: 'Conditions générales', intro: 'En utilisant les services d’iVISION Agency, vous acceptez les conditions suivantes.', sections: [['Services', 'iVISION Agency fournit des services de marketing digital, de création de contenu et de développement web haute performance.'], ['Engagement', 'Toute collaboration fait l’objet d’un contrat spécifique détaillant les objectifs, les délais et les modalités de paiement.'], ['Propriété', 'Sauf mention contraire, tous les éléments créés restent la propriété intellectuelle de l’agence jusqu’au paiement intégral de la prestation.']] },
    back: 'Retour à l’accueil', close: 'Demander un devis',
  },
  en: {
    privacy: { title: 'Privacy policy', intro: 'At iVISION Agency, we take the protection of your personal data seriously.', sections: [['Data collection', 'We collect the information you submit through our forms only to process your quote requests.'], ['Use', 'Your data is used to answer your request and contact you by WhatsApp or email. Never submit banking details or passwords.'], ['Security', 'We limit access to received requests and apply reasonable security measures.']] },
    terms: { title: 'Terms and conditions', intro: 'By using iVISION Agency services, you accept the following terms.', sections: [['Services', 'iVISION Agency provides digital marketing, content creation and high-performance web development services.'], ['Engagement', 'Each collaboration is covered by a specific agreement describing objectives, timelines and payment terms.'], ['Ownership', 'Unless otherwise agreed, created materials remain the agency’s intellectual property until full payment.']] },
    back: 'Back to home', close: 'Request a quote',
  },
  ar: {
    privacy: { title: 'سياسة الخصوصية', intro: 'نولي في iVISION Agency أهمية كبيرة لحماية بياناتك الشخصية.', sections: [['جمع البيانات', 'نجمع المعلومات التي تقدمها عبر النماذج لمعالجة طلبات عروض الأسعار فقط.'], ['الاستخدام', 'تستخدم بياناتك للرد على طلبك والتواصل معك عبر واتساب أو البريد الإلكتروني.'], ['الأمان', 'نحد من الوصول إلى الطلبات ونطبق إجراءات أمنية معقولة.']] },
    terms: { title: 'الشروط والأحكام', intro: 'باستخدام خدمات iVISION Agency، فإنك توافق على الشروط التالية.', sections: [['الخدمات', 'تقدم iVISION Agency خدمات التسويق الرقمي وصناعة المحتوى وتطوير المواقع عالية الأداء.'], ['الالتزام', 'تخضع كل شراكة لاتفاقية تحدد الأهداف والمواعيد وشروط الدفع.'], ['الملكية', 'تبقى المواد المنشأة ملكية فكرية للوكالة حتى الدفع الكامل ما لم يتم الاتفاق على خلاف ذلك.']] },
    back: 'العودة إلى الصفحة الرئيسية', close: 'اطلب عرضاً',
  },
};

const LegalPage: React.FC<LegalPageProps> = ({ language, type }) => {
  const t = copy[language];
  const content = t[type];
  return (
    <main className="min-h-screen pt-32 md:pt-44 pb-24">
      <section className="container max-w-4xl">
        <a href="#accueil" className="text-xs font-black uppercase tracking-widest text-brand-gray hover:text-brand-blue transition-colors">← {t.back}</a>
        <div className="mt-12">
          <div className="sketch-badge mb-6">iVISION</div>
          <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-black text-navy dark:text-white tracking-tighter leading-[0.9] uppercase">{content.title}</h1>
          <p className="mt-8 text-lg md:text-xl text-brand-gray dark:text-brand-gray/80 leading-relaxed">{content.intro}</p>
        </div>
        <div className="mt-12 grid gap-5">
          {content.sections.map(([title, text], index) => (
            <article key={title} className="glass-card p-7 md:p-9">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mb-3">0{index + 1}</p>
              <h2 className="text-xl font-black uppercase text-navy dark:text-white mb-3">{title}</h2>
              <p className="text-brand-gray dark:text-brand-gray/80 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
        <a href="#/devis" className="btn-ivision mt-10 inline-flex">{t.close}<span aria-hidden="true">→</span></a>
      </section>
    </main>
  );
};

export default LegalPage;
