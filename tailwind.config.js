/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                buttonprimary: {
                    DEFAULT: "#2563EB", // base
                    hover: "#1D4ED8",
                },
                buttonsecondary: {
                    DEFAULT: "#22C55E",
                    hover: "#475569",
                },
                primary: {
                    DEFAULT: "#2563EB", // base
                },
            },
        },
    },
    plugins: [],
};
