/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'agent-orange': '#FF4E00',
        'agent-pink': '#EC008C',
        'agent-purple': '#7B2CBF',
        'agent-blue': '#2E6BFF',
        'agent-teal': '#009BB9',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-agent': 'linear-gradient(135deg, #FF4E00, #EC008C, #7B2CBF, #2E6BFF)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'slow-zoom': 'slow-zoom 30s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slow-zoom': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};
