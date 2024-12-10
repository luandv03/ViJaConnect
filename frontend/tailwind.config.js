/** @type {import('tailwindcss').Config} */
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
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-hide': {
                    /* Firefox */
                    'scrollbar-width': 'none',
                    /* IE 10+ */
                    '-ms-overflow-style': 'none',
                    /* Chrome, Safari, Opera */
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
                '.scrollbar-default': {
                    /* Firefox */
                    'scrollbar-width': 'auto',
                    /* IE 10+ */
                    '-ms-overflow-style': 'auto',
                    /* Chrome, Safari, Opera */
                    '&::-webkit-scrollbar': {
                        display: 'block',
                    },
                },
            });
        },
    ],
};
