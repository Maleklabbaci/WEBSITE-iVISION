import { useEffect, useState } from 'react';
import { navigate } from '../lib/router';
import { updateSEO } from '../lib/seo-utils';

const QuotePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    updateSEO({
      title: 'Demander un Devis Gratuit',
      description: 'Demandez votre devis gratuit pour votre projet web, marketing digital ou branding. Réponse en 24h garantie.',
      canonical: 'https://ivision-agency.com/quote',
    });
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build WhatsApp message
    const message = `🔔 *Nouvelle demande de devis*
    
👤 *Nom :* ${formData.name}
📧 *Email :* ${formData.email}
📞 *Tél :* ${formData.phone}
🏢 *Entreprise :* ${formData.company || 'Non spécifié'}
🎯 *Service :* ${formData.service}
💰 *Budget :* ${formData.budget}
📝 *Message :* ${formData.message}`;

    const whatsappUrl = `https://wa.me/213563839404?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <section className="min-h-screen bg-black pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <span className="text-6xl block mb-6">✅</span>
          <h1 className="text-3xl font-bold text-white mb-4">Demande envoyée !</h1>
          <p className="text-gray-400 mb-8">
            Merci ! Nous vous répondrons dans les 24 heures. Vérifiez aussi WhatsApp.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-500 transition"
          >
            Retour à l'accueil
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition mb-6 inline-flex items-center gap-2"
          >
            ← Retour
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Demandez votre{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              devis gratuit
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Réponse garantie en 24h. Consultation de 60 min offerte. Sans engagement.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Téléphone *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="05XX XX XX XX"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Entreprise
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nom de votre entreprise"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Service souhaité *
            </label>
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition appearance-none"
            >
              <option value="" className="bg-gray-900">Sélectionnez un service</option>
              <option value="site-web" className="bg-gray-900">Création de site web</option>
              <option value="marketing-digital" className="bg-gray-900">Marketing digital</option>
              <option value="branding" className="bg-gray-900">Branding & identité visuelle</option>
              <option value="video" className="bg-gray-900">Production vidéo</option>
              <option value="seo" className="bg-gray-900">SEO & référencement</option>
              <option value="social-media" className="bg-gray-900">Réseaux sociaux</option>
              <option value="autre" className="bg-gray-900">Autre</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Budget estimé
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition appearance-none"
            >
              <option value="" className="bg-gray-900">Sélectionnez votre budget</option>
              <option value="< 100,000 DZD" className="bg-gray-900">&lt; 100,000 DZD</option>
              <option value="100,000 - 300,000 DZD" className="bg-gray-900">100,000 - 300,000 DZD</option>
              <option value="300,000 - 500,000 DZD" className="bg-gray-900">300,000 - 500,000 DZD</option>
              <option value="500,000 - 1,000,000 DZD" className="bg-gray-900">500,000 - 1,000,000 DZD</option>
              <option value="> 1,000,000 DZD" className="bg-gray-900">&gt; 1,000,000 DZD</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Décrivez votre projet *
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Parlez-nous de votre projet, vos objectifs, vos délais..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition"
          >
            Envoyer ma demande via WhatsApp →
          </button>

          <p className="text-gray-500 text-sm text-center">
            En soumettant, vous serez redirigé vers WhatsApp pour finaliser votre demande.
            Réponse en 24h garantie.
          </p>
        </form>

        {/* Contact direct */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <a href="tel:+213563839404" className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition">
            <span className="text-2xl block mb-2">📞</span>
            <span className="text-white font-medium block">Téléphone</span>
            <span className="text-gray-400 text-sm">+213 563 839 404</span>
          </a>
          <a href="https://wa.me/213563839404" target="_blank" className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-green-500/30 transition">
            <span className="text-2xl block mb-2">💬</span>
            <span className="text-white font-medium block">WhatsApp</span>
            <span className="text-gray-400 text-sm">Chat direct</span>
          </a>
          <a href="mailto:contact@ivision-agency.com" className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition">
            <span className="text-2xl block mb-2">📧</span>
            <span className="text-white font-medium block">Email</span>
            <span className="text-gray-400 text-sm">contact@ivision.dz</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default QuotePage;
