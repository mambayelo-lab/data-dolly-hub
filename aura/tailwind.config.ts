import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* AURA design system */
        aura: {
          bg: "#030712",
          surface: "#0f172a",
          "surface-2": "#1e293b",
          border: "#334155",
          "border-light": "#475569",
          "text-primary": "#f8fafc",
          "text-secondary": "#94a3b8",
          "text-muted": "#64748b",
          purple: "#8b5cf6",
          "purple-dim": "#6d28d9",
          blue: "#3b82f6",
          cyan: "#06b6d4",
          orange: "#f97316",
          green: "#10b981",
          amber: "#f59e0b",
          red: "#ef4444",
          pink: "#ec4899",
        },
        /* BizCap domain colors */
        domain: {
          strategy: "#8b5cf6",
          customer: "#f97316",
          commerce: "#10b981",
          operations: "#3b82f6",
          finance: "#a855f7",
          people: "#ec4899",
          data: "#06b6d4",
          support: "#64748b",
        },
        /* Lifecycle status */
        lifecycle: {
          active: "#10b981",
          planned: "#3b82f6",
          legacy: "#f59e0b",
          decommission: "#ef4444",
          candidate: "#8b5cf6",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-aura":
          "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "aura-hero":
          "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)",
      },
      backgroundSize: {
        "grid-20": "20px 20px",
      },
      boxShadow: {
        "glow-purple": "0 0 20px rgba(139,92,246,0.3)",
        "glow-blue": "0 0 20px rgba(59,130,246,0.3)",
        "glow-cyan": "0 0 20px rgba(6,182,212,0.3)",
        "node-hover": "0 0 0 2px rgba(139,92,246,0.5), 0 4px 20px rgba(0,0,0,0.4)",
        card: "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [animate],
};

export default config;
