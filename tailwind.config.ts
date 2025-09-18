import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f1f8",
          100: "#e7dff0",
          200: "#d1bfe1",
          300: "#b59bd0",
          400: "#9b7fc0",
          500: "#815faf",
          600: "#674188", // main as per memory
          700: "#4f316a",
          800: "#39244d",
          900: "#281937",
        },
      },
      fontFamily: {
        display: ["Poetsen One", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
