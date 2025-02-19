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
        primary: '#6F42C1',
        secondary: '#007BFF',
        supporting: {
          teal: '#00CCCC',
          cyan: '#0DCAF0',
          blue: '#17A2B8',
        },
        dark: {
          primary: '#8B5CF6',
          secondary: '#3B82F6',
          supporting: {
            teal: '#2DD4D4',
            cyan: '#22D3EE',
            blue: '#38BDF8',
          },
          background: '#0F172A',
          foreground: '#E2E8F0',
        },
        light: {
          background: '#FFFFFF',
          foreground: '#0F172A',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};

export default config;
