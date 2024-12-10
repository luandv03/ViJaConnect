/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "alice-blue": "#f0f2f5",
                "over-layer": "#00000080",
                "border-1": "1px",
            },
        },
    },
    plugins: [tailwindScrollbar],
};
