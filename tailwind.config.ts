import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "default-green": "#1d4339",
      "neutral-dark-grey": "#5a5a5a",
      "neutral-grey": "#9a9a9a",
      "accent-mid-green": "#3f937c",
      "default-white": "#ffffff",
      gold: "#d7a13b",
    },
  },
  plugins: [],
};
export default config;
