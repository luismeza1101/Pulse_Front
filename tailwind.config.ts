import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-button': '#007aff',
        'color-button-hover': '#0394fd',
      },
      screens: {
        'desktop': '830px'
      }
    },
  },
  plugins: [],
};
export default config;
