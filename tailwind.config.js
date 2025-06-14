/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
      colors: {
        buttonprimary: {
          DEFAULT: "#2563EB",    
          light: "#3B82F6",     
          dark: "#1E40AF",    
        },
      buttonsecondary: {
      DEFAULT: "#22C55E", 
      hover: "#475569",   
    },
      },
    },
    },
    plugins: [],
};

