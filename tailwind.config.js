/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000212',
        foreground: '#ffffff',
      },
      fontFamily: {
        playfair: ['var(--font-playfair-display)'],
      },
      gridTemplateColumns: {
        '33': 'repeat(33, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
