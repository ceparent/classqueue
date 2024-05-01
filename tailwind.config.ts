import type { Config } from "tailwindcss";

const {nextui} = require("@nextui-org/react");


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       screens: {
          '3xl': '1920px',
          '4xl': '2560px',
          '5xl': '3840px'
       }
    }
 },
  darkMode: "class",
  plugins: [
    require('tailwindcss-animated'),
    nextui()
  ],
  
};
export default config;
