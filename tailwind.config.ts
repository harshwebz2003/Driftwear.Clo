import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        carbon: '#111111',
        charcoal: '#191919',
        gold: '#f6b326',
        ambergold: '#ffcf66',
        smoke: '#a4a4a4'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        gold: '0 24px 90px rgba(246, 179, 38, 0.22)',
        card: '0 24px 80px rgba(0,0,0,.38)'
      },
      backgroundImage: {
        'gold-radial': 'radial-gradient(circle at center, rgba(246,179,38,.28), transparent 38rem)'
      }
    }
  },
  plugins: []
};

export default config;
