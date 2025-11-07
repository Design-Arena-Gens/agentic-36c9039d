import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f7ff",
          100: "#e6efff",
          200: "#c3d7ff",
          300: "#9fbfff",
          400: "#5a91ff",
          500: "#2f6cff",
          600: "#1c53e6",
          700: "#153fc0",
          800: "#112f91",
          900: "#0d236d"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(47,108,255,0.45)",
        neon: "0 0 10px rgba(47,108,255,0.9), 0 0 30px rgba(47,108,255,0.6)"
      },
      backgroundImage: {
        'grid': "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        'hero-gradient': "radial-gradient(1200px 600px at 20% -20%, rgba(47,108,255,0.35), transparent 60%), radial-gradient(1000px 500px at 120% 20%, rgba(139,92,246,0.35), transparent 60%), radial-gradient(800px 400px at 50% 120%, rgba(16,185,129,0.25), transparent 60%)"
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite'
      }
    }
  },
  plugins: [],
};

export default config;
