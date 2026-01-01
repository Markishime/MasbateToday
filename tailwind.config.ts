import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e40af", // Blue for Masbate local news
          dark: "#1e3a8a",
          light: "#3b82f6",
        },
        secondary: {
          DEFAULT: "#059669", // Green for national news
          dark: "#047857",
          light: "#10b981",
        },
        accent: {
          DEFAULT: "#dc2626", // Red for breaking news
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

