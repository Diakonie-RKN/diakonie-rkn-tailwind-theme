module.exports = {
  purge: {
    content: [
      '../../**/*.twig',
      '../../**/*.php',
      'dist/**/*.js',
    ],
  },
  theme: {
    fontFamily: {
      'sans': [
        '"Helvetica Neue"',
        'Helvetica',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ]
    },
    extend: {
      'colors': {
        'dw-black': '#444',
        'dw-cyan': '#009BDC',
        'dw-violet': '#5A2572',
        'dw-gray': {
          'dark': '#777',
          'light': '#d1d1d1',
        },
        'dw-area-1': {
          DEFAULT: '#5A2572',
          '500': '#642472',
          '400': '#69357C',
          '300': '#72357C',
          '200': '#784787',
          '100': '#814887',
        },
        'dw-area-2': {
          DEFAULT: '#2E2672',
          '500': '#3A2673',
          '400': '#41347C',
          '300': '#4B357C',
          '200': '#544587',
          '100': '#5D4587'
        },
        'dw-area-3': {
          DEFAULT: '#6E2272',
          '500': '#782172',
          '400': '#7C357C',
          '300': '#85357C',
          '200': '#894987',
          '100': '#914987'
        },
        'dw-area-4': {
          DEFAULT: '#462672',
          '500': '#502572',
          '400': '#55357C',
          '300': '#5F357C',
          '200': '#674687',
          '100': '#6F4787'
        },

      },
      height: {
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
      },
      rotate: {
        '270': '270deg',
        '-270': '-270deg',
      },
      spacing: {
        '128': '32rem',
        '136': '34rem',
        '144': '36rem',
      },
      screens: {
        'print': {'raw': 'print'},
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.dw-black'),
            a: {
              color: theme('colors.dw-area-4.500'),
              '&:hover': {
                color: theme('colors.dw-area-2'),
              },
            },
            'ul > li::before': {
              backgroundColor: theme('colors.dw-area-4.500'),
            },
            blockquote: {
              quotes: '"\\201E""\\201D""\\2018""\\2019"',
            }
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-debug-screens'),
    require("tailwindcss-padding-safe")(),
  ],
}
