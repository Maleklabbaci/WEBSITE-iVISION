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
        // ===== Palette unique "iVISION" (source : design system iv-* de index.html) =====
        navy: '#0f1213',                    // = --iv-black (fond principal)
        'brand-blue': '#ff390c',            // = --iv-orange / --iv-magenta (accent signature)
        'brand-white': '#f6f6f6',           // = --iv-white (texte principal)
        'brand-gray': '#7c7c79',            // = gris lisible sur fond clair ET sombre
        'brand-dark': '#0f1213',
        'brand-accent': '#00674f',          // = --iv-green (accent secondaire)
        'brand-paper': '#f3f3f3',           // = --iv-paper
        'brand-border': 'rgba(15,18,19,0.10)',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'system-ui', 'sans-serif'],
        display: ['Geist', '"Open Sans"', 'sans-serif'],
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
