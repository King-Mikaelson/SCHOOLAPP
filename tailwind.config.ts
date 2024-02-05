import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_SharedComponents/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      animation: {
        oscillate: "oscillate 1s ease-in-out infinite !important",
        "x-transfade": "x-transfade 600ms ease-in-out",
        "reverse-x-transfade": "reverse-x-transfade 600ms ease-in-out",
        "open-up": "open-up 700ms ease-out",
        "fade-in": "fade-in 500ms ease-in"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        test: "red",
      },
      colors: {
        "primary-red": "#FF4512",
        "primary-blue": "#0469D4"
      },
      keyframes: {
        oscillate: {
          "0%": {
            transform: "translateX(-10px) rotateY(360deg)"
          },
          "50%": {
            transform: "translateX(30px) rotateX(180deg)",
            "border-radius": "50%"
          },
          "100%": {
            transform: "translateX(-10px)"
          }
        },
        "x-transfade": {
          from: {
            opacity: "0",
            transform: "translateX(-100%)"
          },
          to: {
            opacity: "100",
            transform: "translateX(0)"
          }
        },
        "reverse-x-transfade": {
          from: {
            opacity: "0",
            transform: "translateX(100%)"
          },
          to: {
            opacity: "100",
            transform: "translateX(0)"
          }
        },
        "open-up": {
          from: {
            "max-height": "0",
            // overflow: "hidden"
          },
          to: {
            "max-height": "100%",
            overflow: "hidden"
          }
        },
        "fade-in": {
          from: {
            opacity: "0"
          },
          to: {
            opacity: "100"
          }
        }
      }
    },
  },
  plugins: [],
}
export default config
