/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#4F46E5',
        accent: '#0EA5E9',
        supporting: {
          teal: '#0D9488',
          amber: '#F59E0B',
          rose: '#E11D48',
        },
        dark: {
          primary: '#3B82F6',
          secondary: '#6366F1',
          accent: '#38BDF8',
          supporting: {
            teal: '#14B8A6',
            amber: '#FBBF24',
            rose: '#FB7185',
          },
          background: '#0F172A',
          foreground: '#F1F5F9',
        },
        light: {
          background: '#FFFFFF',
          foreground: '#1E293B',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};

export default config;
