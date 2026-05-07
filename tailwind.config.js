/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        gov: {
          navy:  "#0a2342",
          blue:  "#1a4a8a",
          mid:   "#2563a8",
          light: "#e8f0f8",
          border:"#c5d5e8",
        },
      },
    },
  },
  plugins: [],
};
