import localFont from 'next/font/local'

export const instrumentSerif = localFont({
  src: [
    {
      path: '../public/fonts/InstrumentSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-instrument-serif'
})
