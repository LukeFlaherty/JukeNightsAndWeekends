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
        lightModeBackground: "F4F4F4",
        darkModeBackground: "#333333",
        secondaryBrandColor: "#5E5E9E",
        pastelBrandColor: "#C2C2D6",
      },
    },
  },
  plugins: [],
};
export default config;
