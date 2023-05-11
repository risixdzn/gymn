import { type Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-24': 'linear-gradient(24deg, var(--tw-gradient-stops))'
      },
    },    
  },
  plugins: [],
} satisfies Config;
