/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                sidebar: "var(--color-sidebar)",
                primary: "var(--color-primary)",
            },
        },
    },
    plugins: [],
};
