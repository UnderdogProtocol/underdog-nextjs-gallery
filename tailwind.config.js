const colors = {
  rubin: {
    50: "#f9f2f5",
    100: "#f2e6eb",
    200: "#dfbfce",
    300: "#cc99b0",
    400: "#a54d75",
    500: "#7f003a",
    600: "#720034",
    700: "#5f002c",
    800: "#4c0023",
    900: "#3e001c",
  },
  neonOrange: {
    50: "#fff7f6",
    100: "#fff0ec",
    200: "#ffd9d0",
    300: "#ffc2b3",
    400: "#ff957a",
    500: "#ff6741",
    600: "#e65d3b",
    700: "#bf4d31",
    800: "#993e27",
    900: "#7d3220",
  },
  flatWhite: {
    50: "#F9F9F9",
    100: "#DADADA",
    200: "#BBBBBB",
    300: "#9C9C9C",
    400: "#7C7C7C",
    500: "#5D5D5D",
    600: "#3E3E3E",
    700: "#1F1F1F",
  },
  neonGreen: {
    50: "#f7fcf9",
    100: "#eff9f3",
    200: "#d6f1e0",
    300: "#bde8cd",
    400: "#8cd7a8",
    500: "#5BC682",
    600: "#52b275",
    700: "#449562",
    800: "#37774e",
    900: "#2d6140",
  },
  deepPurple: {
    50: "#f4f4f5",
    100: "#e8e8ea",
    200: "#c6c6cb",
    300: "#a3a3ab",
    400: "#5e5f6d",
    500: "#191A2E",
    600: "#171729",
    700: "#131423",
    800: "#0f101c",
    900: "#0c0d17",
  },
  lightPurple: {
    50: "#fcfbfe",
    100: "#f8f7fc",
    200: "#eeebf8",
    300: "#e3dff4",
    400: "#cfc8eb",
    500: "#bab0e3",
    600: "#a79ecc",
    700: "#8c84aa",
    800: "#706a88",
    900: "#5b566f",
  },
  lightPink: {
    50: "#fefcfd",
    100: "#fdf9fb",
    200: "#faf0f6",
    300: "#f7e7f0",
    400: "#f2d4e4",
    500: "#ecc2d9",
    600: "#d4afc3",
    700: "#b192a3",
    800: "#8e7482",
    900: "#745f6a",
  },
};

const primaryColor = colors.neonGreen;
const primary = {
  light: primaryColor[400],
  DEFAULT: primaryColor[500],
  dark: primaryColor[600],
  ...primaryColor,
};

const lightColor = colors.lightPurple;
const light = {
  light: colors.white,
  DEFAULT: lightColor[50],
  dark: lightColor[100],
  accent: lightColor[300],
  ...lightColor,
};

const darkColor = colors.deepPurple;
const dark = {
  accent: darkColor[400],
  light: darkColor[500],
  DEFAULT: darkColor[800],
  dark: darkColor[900],
  ...darkColor,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary,
        light,
        dark,
        ...colors,
      },
      fontFamily: {
        sans: ["Aeonik", "sans-serif"],
        accent: ['"GT Super"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
