import React, { useMemo, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

const copy = {
  fr: { eyebrow: 'Préparer son budget', title: 'VOTRE POINT', accent: 'DE RENTABILITÉ.', intro: 'Une estimation simple pour comprendre le nombre de ventes nécessaires avant de parler stratégie.', budget: 'Budget publicitaire mensuel', ticket: 'Panier moyen', margin: 'Marge brute', sales: 'Ventes nécessaires pour couvrir le budget', roas: 'ROAS d’équilibre', note: 'Estimation indicative : elle ne garantit ni ventes, ni résultat publicitaire. Le coût réel dépend de votre offre, de votre marché et de vos campagnes.', currency: 'DA' },
  en: { eyebrow: 'Plan your budget', title: 'YOUR BREAK-EVEN', accent: 'STARTING POINT.', intro: 'A simple estimate to understand the sales volume needed before discussing strategy.', budget: 'Monthly ad budget', ticket: 'Average order value', margin: 'Gross margin', sales: 'Sales needed to cover the budget', roas: 'Break-even ROAS', note: 'Indicative estimate only. It does not guarantee sales or advertising results.', currency: 'DZD' },
  ar: { eyebrow: 'حدد ميزانيتك', title: 'نقطة', accent: 'التعادل.', intro: 'تقدير بسيط لفهم عدد المبيعات اللازمة قبل مناقشة الاستراتيجية.', budget: 'ميزانية الإعلانات الشهرية', ticket: 'متوسط قيمة الطلب', margin: 'الهامش الإجمالي', sales: 'المبيعات اللازمة لتغطية الميزانية', roas: 'ROAS التعادل', note: 'تقدير إرشادي فقط ولا يضمن المبيعات أو النتائج الإعلانية.', currency: 'دج' },
};

const formatNumber = (value: number, language: Language) => new Intl.NumberFormat(language === 'ar' ? 'ar-DZ' : 'fr-DZ', { maximumFractionDigits: 1 }).format(value);

const BudgetCalculator: React.FC<{ language: Language }> = ({ language }) => {
  const [budget, setBudget] = useState(100000);
  const [ticket, setTicket] = useState(10000);
  const [margin, setMargin] = useState(40);
  const t = copy[language];
  const result = useMemo(() => {
    const contribution = ticket * (margin / 100);
    return { sales: contribution > 0 ? Math.ceil(budget / contribution) : 0, roas: margin > 0 ? 100 / margin : 0 };
  }, [budget, ticket, margin]);

  return (
    <section id="calculateur" className="py-24 md:py-36">
      <div className="container grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20 items-start">
        <div>
          <div className="sketch-badge mb-6">{t.eyebrow}</div>
          <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-black tracking-tighter leading-[0.88] text-navy dark:text-white uppercase">{t.title}<br /><span className="text-brand-blue">{t.accent}</span></h2>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-brand-gray dark:text-brand-gray/80 leading-relaxed">{t.intro}</p>
        </div>
        <div className="rounded-[2rem] bg-white/70 dark:bg-white/[0.04] border border-navy/10 dark:border-white/10 p-7 md:p-10 shadow-xl">
          <label className="block text-xs font-black uppercase tracking-widest text-navy dark:text-white mb-3">{t.budget}</label>
          <input type="range" min="20000" max="1000000" step="10000" value={budget} onChange={e => { setBudget(Number(e.target.value)); trackEvent('budget_calculator_change', { field: 'budget' }); }} className="w-full accent-brand-blue" />
          <div className="flex justify-between text-sm font-black text-brand-blue mt-2 mb-7"><span>20 000 {t.currency}</span><span>{formatNumber(budget, language)} {t.currency}</span></div>
          <label className="block text-xs font-black uppercase tracking-widest text-navy dark:text-white mb-3">{t.ticket}</label>
          <input type="number" min="100" value={ticket} onChange={e => setTicket(Math.max(100, Number(e.target.value)))} className="w-full rounded-2xl border border-navy/10 dark:border-white/10 bg-navy/5 dark:bg-white/5 p-4 text-navy dark:text-white font-bold mb-7" />
          <label className="block text-xs font-black uppercase tracking-widest text-navy dark:text-white mb-3">{t.margin}: {margin}%</label>
          <input type="range" min="5" max="95" step="5" value={margin} onChange={e => setMargin(Number(e.target.value))} className="w-full accent-brand-blue mb-8" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-brand-blue p-6 text-white"><p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-3">{t.sales}</p><p className="text-4xl font-black">{formatNumber(result.sales, language)}</p></div>
            <div className="rounded-2xl bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 p-6"><p className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-3">{t.roas}</p><p className="text-4xl font-black text-navy dark:text-white">{formatNumber(result.roas, language)}x</p></div>
          </div>
          <p className="mt-6 text-xs text-brand-gray dark:text-brand-gray/70 leading-relaxed">{t.note}</p>
        </div>
      </div>
    </section>
  );
};

export default BudgetCalculator;
