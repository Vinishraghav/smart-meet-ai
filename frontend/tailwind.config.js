/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark purple + light purple theme
        background: '#0f0618',
        surface: '#1a0f2e',
        panel: '#251a3a',
        primary: {
          DEFAULT: '#8b5cf6',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#a78bfa',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#c4b5fd',
          foreground: '#1a0f2e',
        },
        muted: {
          DEFAULT: '#2e1f47',
          foreground: '#d4b5fc',
        },
        border: '#3d2f5a',
        input: '#2e1f47',
        ring: '#8b5cf6',
      },
    },
  },
  plugins: [],
}
