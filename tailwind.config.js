/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#FBBF24",
        accent: "#F472B6",
        neutral: "#374151",
        "base-100": "#FFFFFF",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
      },
      fontFamily: {
        'poppins-thin': ["Poppins-Thin", "sans-serif"],
        'poppins-light': ["Poppins-Light", "sans-serif"],
        'poppins-regular': ["Poppins-Regular", "sans-serif"],
        'poppins-bold': ["Poppins-Bold", "sans-serif"],
        'poppins-black': ["Poppins-Black", "sans-serif"],
        'poppins-extrabold': ["Poppins-ExtraBold", "sans-serif"],
        'poppins-medium': ["Poppins-Medium", "sans-serif"],
        'poppins-semibold': ["Poppins-SemiBold", "sans-serif"],
      },
      fontSize: {
        size18: ["18px"],
      },
    },
  },
  presets: [require("nativewind/preset")],
  plugins: [],
};
