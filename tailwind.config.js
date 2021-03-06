module.exports = {
  purge: {
    content: [
      '../../**/*.twig',
      '../../**/*.php',
      'dist/**/*.js',
    ],
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    aspectRatio: {
      none: 0,
      square: [1, 1],
      "16/9": [16, 9],
      "4/3": [4, 3],
    },
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
    customForms: theme => ({
      default: {
        'input, textarea, multiselect, select': {
          borderRadius: theme('borderRadius.none'),
          backgroundColor: theme('colors.dw-gray.light'),
          '&:focus': {
            backgroundColor: theme('colors.white'),
            borderColor: theme('colors.dw-gray.dark')
          }
        },
        checkbox: {
          width: theme('spacing.6'),
          height: theme('spacing.6'),
          iconColor: theme('colors.dw-cyan'),
        },
      },
      dark: {
        'input, textarea, multiselect, select': {
          borderRadius: theme('borderRadius.none'),
          borderColor: theme('colors.dw-area-2.500'),
          backgroundColor: theme('colors.dw-area-2.400'),
          color: theme('colors.white'),
          '&:focus': {
            backgroundColor: theme('colors.white'),
            borderColor: theme('colors.dw-area-2.100'),
            color: theme('colors.dw-black')
          },
        },
      },
    }),
    typography: (theme) => ({
      default: {
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
          'default': '#5A2572',
          '500': '#642472',
          '400': '#69357C',
          '300': '#72357C',
          '200': '#784787',
          '100': '#814887',
        },
        'dw-area-2': {
          'default': '#2E2672',
          '500': '#3A2673',
          '400': '#41347C',
          '300': '#4B357C',
          '200': '#544587',
          '100': '#5D4587'
        },
        'dw-area-3': {
          'default': '#6E2272',
          '500': '#782172',
          '400': '#7C357C',
          '300': '#85357C',
          '200': '#894987',
          '100': '#914987'
        },
        'dw-area-4': {
          'default': '#462672',
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
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      screens: {
        'print': {'raw': 'print'},
      },
    },
  },
  variants: {
    aspectRatio: ['responsive'],
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-debug-screens'),
    require('tailwindcss-responsive-embed'),
    require('tailwindcss-aspect-ratio'),
    require("tailwindcss-padding-safe")(),
  ],
}
