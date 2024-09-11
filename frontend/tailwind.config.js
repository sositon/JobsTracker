module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#F3E8FF',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        pink: {
          100: '#FCE7F3',
          500: '#EC4899',
        },
        yellow: {
          300: '#FDE047',
          400: '#FACC15',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}