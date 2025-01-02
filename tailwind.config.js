/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'heading': ["Mango Grotesque", "sans-serif"]
    },
    colors: {
      'brown-400': '#411905',
      'brown': '#321C12',
      'brown-bg':'#847670',
      'brown-100': '#FFEFC5',
      'brown-300': '#FEEFDF',
      'brown-400': '#FFD3AF',
      'orange-100': '#CDA177',
      'orange': '#F85C2C',
      'white': '#FFFF',
      'brown-200': '#FFF7E9',
      'blue': '#1e3a8a',
      'orange-200': '#EB5E260D',
      'gray-100': '#727272',
      'red-500': '#FF0000',
      'green-wa':'#25d366'
      
    },
    backgroundImage: {
      'loading-screen': "url('/bg.jpg')",
      'reserve-form': "url('/reservationform.png')"
    },
    opacity: {
      'opacity': "80%",
      'opacity-50': "85%",
      'opacity-100': "90%",
    },
    extend: {
      animation: {
        'fade-out': 'fadeOut 1s forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'scale(0.9)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
       
      },
    },
  },
  plugins: [],
}