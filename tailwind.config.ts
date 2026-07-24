import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#07111F',
        carbon: '#0B1523',
        charcoal: '#141C28',
        gold: '#C8CDD2',
        ambergold: '#FFFFFF',
        smoke: '#C8CDD2'
      },
      fontFamily: {
        display: ['var(--font-romantic)', 'Bodoni 72', 'Didot', 'serif'],
        body: ['var(--font-calista)', 'Cormorant Garamond', 'Georgia', 'serif'],
        romantic: ['var(--font-romantic)', 'Bodoni 72', 'Didot', 'serif'],
        calista: ['var(--font-calista)', 'Cormorant Garamond', 'Georgia', 'serif'],
        brand: ['var(--font-brand)', 'Cinzel Decorative', 'serif'],
        lucky: ['var(--font-lucky)', 'Playfair Display', 'Georgia', 'serif'],
        grande: ['var(--font-grande)', 'Libre Bodoni', 'Bodoni 72', 'serif']
      },
      boxShadow: {
        gold: '0 24px 90px rgba(200, 205, 210, 0.22)',
        card: '0 24px 80px rgba(0,0,0,.38)'
      },
      backgroundImage: {
        'gold-radial': 'radial-gradient(circle at center, rgba(200,205,210,.24), transparent 38rem)'
      }
    }
  },
  plugins: []
};

export default config;
