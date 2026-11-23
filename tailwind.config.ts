import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#fcf9f4",
        "surface-dim": "#dcdad5",
        "surface-bright": "#fcf9f4",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3ee",
        "surface-container": "#f0ede9",
        "surface-container-high": "#ebe8e3",
        "surface-container-highest": "#e5e2dd",
        "on-surface": "#1c1c19",
        "on-surface-variant": "#434844",
        "inverse-surface": "#31302d",
        "inverse-on-surface": "#f3f0eb",
        outline: "#737873",
        "outline-variant": "#c3c8c2",
        "surface-tint": "#526256",
        primary: "#243329",
        "on-primary": "#ffffff",
        "primary-container": "#3a4a3f",
        "on-primary-container": "#a7b9ab",
        "primary-fixed": "#d5e7d8",
        "primary-fixed-dim": "#b9cbbd",
        secondary: "#755a21",
        "on-secondary": "#ffffff",
        "secondary-container": "#fed892",
        "on-secondary-container": "#785d24",
        "secondary-fixed": "#ffdea4",
        "secondary-fixed-dim": "#e6c27e",
        tertiary: "#392e2a",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#50443f",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "2rem",
        "space-xl": "4rem",
        margin: "clamp(1.5rem, 5vw, 4rem)",
        gutter: "1.5rem",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
