/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0F0C',
        surface: '#0F1511',
        outline: '#1E2A22',
        neon: '#39FF14',
        primary: '#21C55E',
        text: '#E7F2EC',
        subtext: '#A9B9AE'
      },
      boxShadow: {
        glow: '0 0 32px rgba(57,255,20,0.15), 0 0 8px rgba(57,255,20,0.35)',
      },
      borderRadius: {
        xl2: '1.25rem'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      backgroundImage: {
        'radial-soft': 'radial-gradient(600px 300px at 20% 10%, rgba(33,197,94,0.20), rgba(0,0,0,0))',
        'radial-soft-2': 'radial-gradient(600px 300px at 90% 20%, rgba(57,255,20,0.14), rgba(0,0,0,0))',
        'grid': 'linear-gradient(rgba(57,255,20,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.08) 1px, transparent 1px)'
      },
      backgroundSize: {
        'grid': '24px 24px'
      }
    },
  },
  plugins: [],
}
