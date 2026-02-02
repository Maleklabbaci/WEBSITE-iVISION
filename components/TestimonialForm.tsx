
import React, { useState } from 'react';

const FORMSPARK_FORM_ID = "3hB9voxjF";

interface TestimonialFormProps {
    translations: {
        title: string;
        nameLabel: string;
        brandLabel: string;
        ratingLabel: string;
        messageLabel: string;
        cta: string;
        success: string;
    }
}

const StarRating: React.FC<{ rating: number; setRating: (r: number) => void }> = ({ rating, setRating }) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`text-2xl transition-all duration-300 transform hover:scale-125 ${
            star <= rating ? 'text-brand-accent drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]' : 'text-brand-gray/30'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill={star <= rating ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.36h6.704c.969 0 1.371 1.24.588 1.81l-5.423 3.945 2.07 6.36c.3.921-.755 1.688-1.54 1.118l-5.424-3.946-5.424 3.946c-.784.57-1.838-.197-1.539-1.118l2.07-6.36-5.422-3.945c-.783-.57-.38-1.81.588-1.81h6.704l2.07-6.36z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

const TestimonialForm: React.FC<TestimonialFormProps> = ({ translations }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const testimonialData = {
      name,
      brand,
      rating,
      message,
      date: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=38BDF8&color=0D1117&bold=true`
    };

    try {
      await fetch(`https://submit-form.com/${FORMSPARK_FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 
          ...testimonialData,
          "_email.subject": `Nouveau Témoignage: ${name}` 
        }),
      });

      const existing = JSON.parse(localStorage.getItem('user_testimonials') || '[]');
      localStorage.setItem('user_testimonials', JSON.stringify([testimonialData, ...existing]));

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error", error);
      setIsSubmitted(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelClass = "block text-[10px] font-black uppercase tracking-widest text-brand-gray mb-2 ms-1 text-start";
  const inputClass = "w-full p-4 bg-brand-dark/50 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent transition-all text-xs text-start rtl:text-right outline-none";

  return (
    <section className="py-12 md:py-20 animate-fade-in-up">
      <div className="container px-6">
        <div className="bg-brand-dark/40 border border-brand-border p-8 md:p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden max-w-2xl mx-auto">
          {isSubmitted ? (
            <div className="text-center py-16">
               <div className="mx-auto bg-brand-accent/20 text-brand-accent w-20 h-20 rounded-full flex items-center justify-center mb-8 scale-in">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
               </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight uppercase">{translations.success}</h3>
              <a href="#accueil" className="mt-12 inline-block bg-brand-accent text-brand-dark font-black py-4 px-12 rounded-2xl transition-all shadow-xl shadow-brand-accent/20 uppercase tracking-widest text-xs">Accueil</a>
            </div>
          ) : (
            <>
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">{translations.title}</h2>
                <div className="w-16 h-0.5 bg-brand-accent mx-auto rounded-full opacity-50"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                   <div>
                    <label className={labelClass}>{translations.ratingLabel}</label>
                    <div className="flex justify-center md:justify-start">
                        <StarRating rating={rating} setRating={setRating} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>{translations.nameLabel}</label>
                    <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass} 
                    />
                  </div>

                  <div>
                    <label className={labelClass}>{translations.brandLabel}</label>
                    <input 
                        type="text" 
                        required 
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className={inputClass} 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2 ms-1">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gray">{translations.messageLabel}</label>
                        <span className={`text-[10px] font-bold ${message.length > 90 ? 'text-brand-accent' : 'text-brand-gray'}`}>
                            {message.length}/100
                        </span>
                    </div>
                    <textarea 
                        required 
                        maxLength={100}
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={`${inputClass} resize-none`}
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-center md:justify-start">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto min-w-[200px] bg-brand-accent text-brand-dark font-black py-4 px-10 rounded-2xl uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-brand-accent/20"
                  >
                    {isSubmitting ? '...' : translations.cta}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialForm;
