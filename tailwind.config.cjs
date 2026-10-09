module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        md: '2rem',
        lg: '4.5rem',
      },
    },
    extend: {
      colors: {
        // ===== Palette éditoriale monochrome "iVISION" — crème chaud + noir d'encre =====
        navy: '#14120f',                    // = encre (texte principal / fond sombre)
        'brand-blue': '#14120f',            // accent = encre (boutons noirs, mots d'accent)
        'brand-white': '#fbf8f2',           // = papier ivoire
        'brand-gray': '#6b6259',            // gris chaud, lisible sur crème
        'brand-dark': '#14120f',
        'brand-accent': '#55504a',          // graphite chaud (secondaire)
        'brand-paper': '#fbf8f2',
        'brand-border': 'rgba(20,18,15,0.12)',
      },
      fontFamily: {
        sans: ['Jost', 'system-ui', 'sans-serif'],
        display: ['"Bodoni Moda"', 'Times New Roman', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
