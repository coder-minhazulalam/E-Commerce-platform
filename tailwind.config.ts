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
        studio: "#ececec",
        paper: "#ffffff",
        ink: "#000000",
        muted: "#6f6f6f",
        brass: "#ad8955",
      },
      fontFamily: {
        sans: ["Inter Tight", "Helvetica Neue", "Arial", "sans-serif"],
        editorial: ["Instrument Serif", "Georgia", "serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
