import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default <Partial<Config>> {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#141414"
      },
      borderColor: {
        "primary": "#7E7E81",
        "secondary": "#595959"
      }
    },
  },
  plugins: [],
}

