/** @type {import('tailwindcss').Config} */
import { outlineColor, primaryColor, textColor, dangerColor, successColor, errorColor } from './src/utils/styles/color';
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'outlineColor': outlineColor,
        'primaryColor': primaryColor,
        'textColor': textColor,
        'dangerColor': dangerColor,
        'successColor': successColor,
        'errorColor': errorColor
      }
    },
  },
  plugins: [],
}