/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Premium Luxury Color Palette
        luxury: {
          // Deep sophisticated blacks
          black: '#000000',
          obsidian: '#0A0A0A',
          midnight: '#0F0F0F',
          onyx: '#141414',
          charcoal: '#1A1A1A',

          // Premium metallics
          gold: '#D4AF37',
          'gold-light': '#E5C158',
          'gold-dark': '#B8941F',
          platinum: '#E5E4E2',
          'platinum-dark': '#C9C9C7',
          silver: '#C0C0C0',
          'silver-light': '#D8D8D8',
          bronze: '#CD7F32',
          'rose-gold': '#B76E79',

          // Elegant accent colors
          champagne: '#F7E7CE',
          pearl: '#FAF0E6',
          cream: '#FFFDD0',
          ivory: '#FFFFF0',
        },

        // Primary brand colors
        primary: {
          black: '#0A0A0A',
          dark: '#1A1A1A',
          gray: '#2A2A2A',
          'gray-light': '#3A3A3A',
        },

        // Sophisticated accent palette
        accent: {
          gold: '#D4AF37',
          'gold-gradient-start': '#F4E4B7',
          'gold-gradient-end': '#B8941F',
          platinum: '#E5E4E2',
          'rose-gold': '#B76E79',
          champagne: '#F7E7CE',

          // Refined blues and oranges
          blue: '#4A90E2',
          'blue-light': '#6BA3E8',
          'blue-dark': '#2E6BB8',
          orange: '#FF6B35',
          'orange-light': '#FF8555',
          'orange-dark': '#E55520',
        },

        // Neutral sophisticated tones
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
      },

      fontFamily: {
        // Bold heading font - Montserrat
        serif: ['Montserrat', 'sans-serif'],
        // Clean modern sans-serif for body - Open Sans
        sans: ['Open Sans', 'system-ui', '-apple-system', 'sans-serif'],
        // Display font - Montserrat for headings
        display: ['Montserrat', 'sans-serif'],
        // Refined body text - Open Sans
        body: ['Open Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },

      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },

      backgroundImage: {
        // Luxury gradients
        'gradient-gold': 'linear-gradient(135deg, #F4E4B7 0%, #D4AF37 50%, #B8941F 100%)',
        'gradient-platinum': 'linear-gradient(135deg, #FFFFFF 0%, #E5E4E2 50%, #C9C9C7 100%)',
        'gradient-rose-gold': 'linear-gradient(135deg, #D4A5A5 0%, #B76E79 50%, #9A5563 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #2A2A2A 100%)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',

        // Shimmer effect
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
      },

      boxShadow: {
        // Luxury elevation shadows
        'luxury-sm': '0 2px 8px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.08)',
        'luxury': '0 4px 16px rgba(0, 0, 0, 0.16), 0 2px 8px rgba(0, 0, 0, 0.12)',
        'luxury-lg': '0 8px 32px rgba(0, 0, 0, 0.24), 0 4px 16px rgba(0, 0, 0, 0.16)',
        'luxury-xl': '0 16px 48px rgba(0, 0, 0, 0.32), 0 8px 24px rgba(0, 0, 0, 0.24)',

        // Gold glow effects
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)',
        'gold-glow-lg': '0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)',

        // Inner shadows for depth
        'inner-luxury': 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
      },

      animation: {
        // Elegant fade animations
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-down': 'fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1)',

        // Slide animations
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left': 'slideLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right': 'slideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1)',

        // Luxury effects
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',

        // Sophisticated hover effects
        'lift': 'lift 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        lift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-8px)' },
        },
      },

      backdropBlur: {
        xs: '2px',
      },

      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}
