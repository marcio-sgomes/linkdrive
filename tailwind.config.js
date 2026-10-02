/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        primary: '#004D5B',
        secondary: '#28C6C0',
        accent: '#FAD218',
        dark: { bg: '#212121', card: '#2A2A2A', line: '#333333', muted: '#8B9DAE' },
        light: { bg: '#F5F7FA', card: '#FFFFFF', line: '#E5E7EB', muted: '#6B7280' }
      },
      minHeight: { touch: '48px' }
    }
  },
  plugins: []
}
