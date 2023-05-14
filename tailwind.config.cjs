/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const withMT = require('@material-tailwind/react/utils/withMT')
// eslint-disable-next-line no-undef
module.exports = withMT({
  content: ['src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      flex: {
        '1-auto': '1 0 auto'
      },
      colors: {
        'sky-red': {
          90: '#FF7885'
        },
        'sky-gray': {
          50: '#94969A',
          40: '#EAEBF7',
          30: '#C0C3D0'
        },
        'sky-blue': {
          90: '#553BF1',
          80: '#4A3AFF',
          70: '#5B86E5',
          50: '#5b86e582'
        }
      },
      boxShadow: {
        'sky-buttons': '0px 15px 50px rgba(222, 95, 143, 0.12)'
      }
    }
  },
  plugins: []
})
