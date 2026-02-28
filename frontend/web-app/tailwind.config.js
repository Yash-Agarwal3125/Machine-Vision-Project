/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cream-bg": "#FDFCF8",
        "cream-accent": "#F2F0E9",
        "slate-deep": "#1E293B",
        "slate-medium": "#475569",
        "slate-light": "#94A3B8",
        "gold-primary": "#C5A028", 
        "gold-light": "#E8DDB5",
        "gold-dark": "#A08018",
        // Keeping legacy names mapped for potential copy-paste compatibility, but PRIMARY is Gold/Slate
        "cream-50": "#FDFBF7",
        "cream-100": "#F5F2EA",
        "cream-200": "#EBE5D5",
        "champagne-100": "#F9F1D8",
        "champagne-400": "#D4AF37",
        "champagne-500": "#C5A028",
        "champagne-600": "#B08D1E",
      },
      fontFamily: {
        "serif": ["Playfair Display", "serif"],
        "sans": ["Lato", "sans-serif"],
        "display": ["Playfair Display", "serif"],
        "body": ["Dm Sans", "sans-serif"]
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      }
    },
  },
  plugins: [],
}
