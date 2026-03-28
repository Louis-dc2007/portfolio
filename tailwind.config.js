export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif'],
                heading: ['Montserrat', 'Inter', 'sans-serif'],
            },
            colors: {
                brand: {
                    purple: '#731DD8',
                    teal: '#48A9A6',
                    warm: '#E4DFDA',
                    gold: '#D4B483',
                    rose: '#C1666B',
                }
            },
            animation: {
                'marquee': 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            }
        },
    },
    plugins: [],
}