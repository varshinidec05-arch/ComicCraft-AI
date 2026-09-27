/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          charcoal: '#0A0D14',
          surface: '#0F1420',
          navy: '#131A2B',
          navyLight: '#182238',
          border: 'rgba(139, 92, 246, 0.18)',
          borderHover: 'rgba(139, 92, 246, 0.45)',
          violet: '#8B5CF6',
          purple: '#A855F7',
          cyan: '#06B6D4',
          sky: '#38BDF8',
          textMuted: '#94A3B8',
          textMain: '#F8FAFC',
        }
      },
      fontFamily: {
        comic: ['Bangers', 'Anton', 'sans-serif'],
        sans: ['Inter', 'Poppins', 'sans-serif']
      },
      backgroundImage: {
        'halftone': 'radial-gradient(circle, rgba(139,92,246,0.12) 1px, transparent 1px)',
        'hero-radial': 'radial-gradient(ellipse at 50% -20%, rgba(139, 92, 246, 0.25) 0%, rgba(6, 182, 212, 0.1) 40%, rgba(10, 13, 20, 1) 90%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'btn-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
        'card-glow': 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.12), transparent 40%)'
      },
      backgroundSize: {
        'halftone-size': '16px 16px',
      },
      boxShadow: {
        'glow-purple': '0 0 35px -5px rgba(139, 92, 246, 0.45)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.4)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'comic': '4px 4px 0px 0px #0A0D14',
      }
    },
  },
  plugins: [],
}
