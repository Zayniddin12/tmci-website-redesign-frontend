/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  mode: 'jit',
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './directives/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './pages/**/**/*.vue',
    './pages/**/**/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        maxWidth: '1184px',
      },
      fontFamily: {
        georgia: ['Georgia', 'sans-serif'],
        raleway: ['Raleway', 'serif'],
        averta: ['Averta-Regular', 'sans-serif'],
      },
      colors: {
        red: {
          DEFAULT: '#971837',
          100: '#B01C40',
          200: '#AF1B40',
          300: '#FF3300',
        },
        dark: {
          DEFAULT: '#313132',
          100: '#131313',
        },
        gray: {
          DEFAULT: '#757D83',
          100: '#F6F7F8',
          200: '#E6EAED',
          300: '#CFD4D8',
          400: '#757D83',
        },
        yellow: {
          DEFAULT: '#ff8c46',
        },
      },
      lineHeight: {
        120: '120%',
        130: '130%',
        140: '140%',
        normal: 'normal',
      },
      fontSize: {
        xxs: '13px',
        '2.5xl': '28px',
        '3.5xl': '32px',
        '4.5xl': '40px',
      },
      boxShadow: {
        header: ' 0 4px 64px 0 rgba(0, 0, 0, 0.08)',
        main: '0 3.459px 2.214px 0 rgba(0, 0, 0, 0.01), 0 8.313px 5.32px 0 rgba(0, 0, 0, 0.01), 0 15.652px 10.017px 0 rgba(0, 0, 0, 0.01), 0 27.92px 17.869px 0 rgba(0, 0, 0, 0.02), 0 52.222px 33.422px 0 rgba(0, 0, 0, 0.02), 0 125px 80px 0 rgba(0, 0, 0, 0.03)',
        milestoneCard:
          '0 3.459px 2.214px 0 rgba(0, 0, 0, 0.01),\n' +
          '    0 8.313px 5.32px 0 rgba(0, 0, 0, 0.01),\n' +
          '    0 15.652px 10.017px 0 rgba(0, 0, 0, 0.01),\n' +
          '    0 27.92px 17.869px 0 rgba(0, 0, 0, 0.02),\n' +
          '    0 52.222px 33.422px 0 rgba(0, 0, 0, 0.02),\n' +
          '    0 125px 80px 0 rgba(0, 0, 0, 0.03',
        sliderButton: '0px 4px 48px 0px rgba(0, 0, 0, 0.16)',
        testimonial:
          '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 30.147px 24.118px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.01), 0px 4.529px 3.623px 0px rgba(0, 0, 0, 0.01)',
        partner: '0px 20px 40px 0px rgba(19, 22, 18, 0.10)',
      },
      borderColor: {
        1: '#E3E4E8',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
        25: '25',
        26: '26',
        27: '27',
        28: '28',
        29: '29',
        40: '40',
      },
    },
  },
  plugins: [],
}
