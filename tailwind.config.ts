import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        harvest: {
          50: "#faf8f6",
          100: "#f5f0eb",
          200: "#e8dfd6",
          300: "#dcc9bc",
          400: "#c8a88a",
          500: "#b89870",
          600: "#a0815e",
          700: "#7d6349",
          800: "#644e3a",
          900: "#4a3829",
        },
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
