import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          background: "#FFFFFF",
          foreground: "#11181C",
          primary: {
            50: "#E6F1FE",
            100: "#CCE3FD",
            200: "#99C7FB",
            300: "#66AAF9",
            400: "#338EF7",
            500: "#006FEE",
            600: "#005BC4",
            700: "#004493",
            800: "#002E62",
            900: "#001731",
            DEFAULT: "#006FEE",
            foreground: "#FFFFFF",
          },
          success: {
            DEFAULT: "#17C964",
            foreground: "#FFFFFF",
          },
          danger: {
            DEFAULT: "#F31260",
            foreground: "#FFFFFF",
          },
        },
      },
      dark: {
        colors: {
          background: "#0A0A0A",
          foreground: "#ECEDEE",
          primary: {
            50: "#001731",
            100: "#002E62",
            200: "#004493",
            300: "#005BC4",
            400: "#006FEE",
            500: "#338EF7",
            600: "#66AAF9",
            700: "#99C7FB",
            800: "#CCE3FD",
            900: "#E6F1FE",
            DEFAULT: "#006FEE",
            foreground: "#FFFFFF",
          },
          success: {
            DEFAULT: "#17C964",
            foreground: "#FFFFFF",
          },
          danger: {
            DEFAULT: "#F31260",
            foreground: "#FFFFFF",
          },
        },
      },
    },
  })],
};

export default config;
