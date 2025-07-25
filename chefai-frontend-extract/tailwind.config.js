/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // warm gray
        input: "var(--color-input)", // subtle warm gray
        ring: "var(--color-ring)", // sage green
        background: "var(--color-background)", // warm off-white
        foreground: "var(--color-foreground)", // deep charcoal
        primary: {
          DEFAULT: "var(--color-primary)", // sage green
          foreground: "var(--color-primary-foreground)", // warm off-white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // warm golden
          foreground: "var(--color-secondary-foreground)", // deep charcoal
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // clear red
          foreground: "var(--color-destructive-foreground)", // warm off-white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // subtle warm gray
          foreground: "var(--color-muted-foreground)", // medium gray
        },
        accent: {
          DEFAULT: "var(--color-accent)", // rich amber
          foreground: "var(--color-accent-foreground)", // deep charcoal
        },
        popover: {
          DEFAULT: "var(--color-popover)", // warm off-white
          foreground: "var(--color-popover-foreground)", // deep charcoal
        },
        card: {
          DEFAULT: "var(--color-card)", // subtle warm gray
          foreground: "var(--color-card-foreground)", // deep charcoal
        },
        success: {
          DEFAULT: "var(--color-success)", // muted teal
          foreground: "var(--color-success-foreground)", // warm off-white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // warm coral
          foreground: "var(--color-warning-foreground)", // warm off-white
        },
        error: {
          DEFAULT: "var(--color-error)", // clear red
          foreground: "var(--color-error-foreground)", // warm off-white
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Nunito Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hierarchy-primary': 'clamp(1rem, 2.5vw, 1.125rem)',
        'hierarchy-secondary': 'clamp(0.875rem, 2vw, 1rem)',
      },
      boxShadow: {
        'warm': '0 2px 8px rgba(45, 52, 54, 0.08)',
        'warm-md': '0 4px 12px rgba(45, 52, 54, 0.12)',
        'warm-lg': '0 8px 24px rgba(45, 52, 54, 0.16)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'expand-gentle': 'expand-gentle 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'expand-gentle': {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '500px', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'quick': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'smooth': '300ms',
        'quick': '150ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '110': '110',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}