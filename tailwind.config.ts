import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false,
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Newspaper theme colors - classic black/white/gray palette
        newspaper: {
          black: "#1a1a1a",
          darkGray: "#4a4a4a",
          gray: "#6b6b6b",
          lightGray: "#9b9b9b",
          offWhite: "#f5f0e8", // Classic newspaper cream/sepia
          white: "#ffffff",
          cream: "#f5f0e8", // Classic newspaper cream
          sepia: "#d4c5b0", // Light brown sepia
          tan: "#e8ddd4", // Light tan
          brown: "#8b6f47", // Medium brown
          darkBrown: "#5c4a37", // Dark brown
          red: "#b22222", // Deep red for breaking news
        },
        primary: {
          DEFAULT: "#1a1a1a", // Newspaper black
          dark: "#000000",
          light: "#4a4a4a",
        },
        secondary: {
          DEFAULT: "#b22222", // Newspaper red for accents
          dark: "#8b0000",
          light: "#dc143c",
        },
        philippine: {
          red: "#CE1126",
          blue: "#0038A8",
          yellow: "#FCD116",
          white: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#b22222", // Newspaper red for breaking news
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: [
          "Times New Roman",
          "Times",
          "serif"
        ],
        display: [
          "Playfair Display",
          "Times New Roman",
          "serif"
        ],
        body: [
          "Georgia",
          "Times New Roman",
          "serif"
        ],
        headline: [
          "Old Standard TT",
          "Times New Roman",
          "serif"
        ],
      },
    },
  },
  plugins: [],
};
export default config;

