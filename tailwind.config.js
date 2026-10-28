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
        crm: {
          ground: 'var(--crm-ground)',
          surface: 'var(--crm-surface)',
          secondary: 'var(--crm-secondary)',
          border: 'var(--crm-border)',
          divider: 'var(--crm-divider)',
          text: 'var(--crm-text)',
          muted: 'var(--crm-muted)',
          subtle: 'var(--crm-subtle)',
          accent: 'var(--crm-accent)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
