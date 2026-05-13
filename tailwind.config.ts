import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        purple: {
          DEFAULT: "#a855f7",
          bright: "#c084fc",
          soft: "#7c3aed",
          dim: "rgba(168,85,247,0.10)",
        },
        pink: {
          DEFAULT: "#f472b6",
          bright: "#f9a8d4",
        },
        dark: {
          DEFAULT: "#0a0612",
          2: "#110a1f",
          3: "#181028",
        },
      },
      borderColor: {
        "purple-border": "rgba(168,85,247,0.22)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse2: "pulse2 2.4s ease-in-out infinite",
        fadeUp: "fadeUp 0.35s cubic-bezier(0.16,1,0.3,1)",
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
        pulse2: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(0.85)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
