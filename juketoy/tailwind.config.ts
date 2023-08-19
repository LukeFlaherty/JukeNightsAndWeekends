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
        mainBrandColor: "#3D3D80",
        lightMode: "#F5F5F9",
        darkMode: "#3B3B50",
        secondaryBrandColor: "#8080C6",
        pastelBrandColor: "#C2C2D6",
        hoverColor: "#9090B2",
      },
      backgroundColor: {
        lightModeBackground: "#F5F5F9",
        darkModeBackground: "#3B3B50",
        secondaryBrandColor: "#8080C6",
        pastelBrandColor: "#C2C2D6",
        hoverColor: "#9090B2",
        lightItemColor: "#D0D0E7",
      },
      placeholderColor: {
        mainBrandColor: "#3D3D80",
      },
    },
  },
  plugins: [],
  purge: {
    options: {
      safelist: ["placeholder-mainBrandColor"],
    },
  },
};
export default config;
