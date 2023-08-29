import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
      colors: {
        primary: '#3463e3',
      },
      animation: {
        loader: 'loader 0.6s infinite alternate',
        fadeIn: 'fadeIn 0.3s ease-in forwards',
      },
      keyframes: {
        loader: {
          to: {
            opacity: '0.5',
            transform: 'translate3d(0, -0.4rem, 0)',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
