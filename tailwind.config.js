/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // White Shades
        "bg-white": "var(--color-bg-white)",
        "bg-light": "var(--color-bg-light)",
        "bg-slate-50": "var(--color-bg-slate-50)",
        "bg-slate-100": "var(--color-bg-slate-100)",
        
        // Grey Shades
        "border-light": "var(--color-border-light)",
        "border-medium": "var(--color-border-medium)",
        "text-muted": "var(--color-text-muted)",
        
        // Blue Shades
        "primary": "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-light": "var(--color-primary-light)",
        "accent": "var(--color-accent)",
        
        // Text Colors
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 8px -1px rgba(15, 23, 42, 0.02)',
        'premium-hover': '0 20px 25px -5px rgba(37, 99, 235, 0.05), 0 10px 10px -5px rgba(37, 99, 235, 0.02)',
        'navbar': '0 2px 15px -3px rgba(15, 23, 42, 0.03), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
      },
      borderRadius: {
        'premium': '14px',
      }
    },
  },
  plugins: [],
}
