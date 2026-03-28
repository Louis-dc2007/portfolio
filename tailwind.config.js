export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif'],
                serif: ['Montserrat', 'sans-serif'],
            },
            colors: {
                brand: {
                    teal: '#114B5F',
                    blue: '#456990',
                    mint: '#E4FDE1',
                    coral: '#F45B69',
                    bordeaux: '#6B2737'
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