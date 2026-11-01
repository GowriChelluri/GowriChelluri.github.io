/** @type {import('tailwindcss').Config} */
const withAlpha = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        bg: withAlpha('bg'),
        surface: withAlpha('surface'),
        'surface-2': withAlpha('surface-2'),
        line: withAlpha('line'),
        fg: withAlpha('fg'),
        muted: withAlpha('muted'),
        accent: withAlpha('accent'),
        'accent-2': withAlpha('accent-2'),
        success: withAlpha('success'),
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk Variable"', '"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--accent) / 0.25), 0 10px 40px -10px rgb(var(--accent) / 0.45)',
        card: '0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 20px 50px -30px rgb(0 0 0 / 0.6)',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(6%, -8%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-6%, 6%, 0) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translate3d(0, -120px, 0)', opacity: '0' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
        ping: { '75%, 100%': { transform: 'scale(2.2)', opacity: '0' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        blob: 'blob 22s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 9s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        ping: 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
      },
    },
  },
  plugins: [],
}
