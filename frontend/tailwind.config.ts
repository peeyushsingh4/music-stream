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
        spotify: {
          green: "#1DB954",
          "green-dark": "#1AA34A",
          black: "#121212",
          "dark-gray": "#181818",
          gray: "#282828",
          "light-gray": "#B3B3B3",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};

export default config;
