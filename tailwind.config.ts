import type { Config } from 'tailwindcss';

export default {
    content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                    'Noto Color Emoji',
                ],
            },
            colors : {
                text: '#F3F1EF',
                background: '#090604',
                primary: '#E2B999',
                secondary: '#924B13',
                accent: '#FD892E',
                grey: '#808080',
                sigRed: '#EB5757'
            },
            backgroundImage : {
                backgroundGradient: 'radial-gradient(70.71% 70.71% at 50% 50%, #090604 50%, #211C19 100%)'
            }
        },
    },
    plugins: [require('tailwindcss-motion')],
} satisfies Config;
