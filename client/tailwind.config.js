/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Physical document color tokens (Endorsement Design System)
        ink: {
          DEFAULT: '#152238',
          2: '#33445F',
          3: '#6B7A92',
        },
        bond: '#EDEFE8',
        paper: '#F5F6F1',
        field: '#DDE2DA',
        rule: '#C3C8BC',
        seal: '#B0332B',
        brass: '#A8843C',
        veridian: '#1F5D4C',
        
        // Dark Mode specific overrides
        dark: {
          bg: '#0E1725',
          surface: '#141F30',
          type: '#E7EAE2',
          rule: '#2A3648',
          field: '#1B273A',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['"Public Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"Courier Prime"', 'Courier', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '2px',
        xl: '4px',
      },
      boxShadow: {
        'stamp-hover': '3px 3px 0 #B0332B',
        'stamp-hover-dark': '3px 3px 0 #D4483E',
        'stamp-active': '1px 1px 0 #B0332B',
        'subtle': '0 1px 3px rgba(21, 34, 56, 0.06)',
      },
      letterSpacing: {
        'fraunces-h1': '-0.022em',
      },
      maxWidth: {
        'prose-gov': '63ch',
      },
    },
  },
  plugins: [],
}
