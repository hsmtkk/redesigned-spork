/**@type{import('tailwindcss').Config}*/
export default {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      main: { 50: "#f1f6f1", 100: "#daf1e2", 200: "#a9e9bb", 300: "#6ad086", 400: "#26b253", 500: "#19992e", 600: "#168420", 700: "#16661c", 800: "#104518", 900: "#0c2a14" },
      sub: { 50: "#eff6f5", 100: "#d1f0f3", 200: "#9ce5e5", 300: "#63cbc6", 400: "#29aca0", 500: "#1d907a", 600: "#1a7961", 700: "#185c4c", 800: "#133f39", 900: "#0d272a" },
      accent: { 50: "#f4f8fa", 100: "#ddf0fb", 200: "#b7def7", 300: "#87beea", 400: "#5699d9", 500: "#4277ca", 600: "#375cb5", 700: "#2d4593", 800: "#202f6a", 900: "#131d44" },
      danger: { 50: "#fcfbfb", 100: "#faeff1", 200: "#f6cce4", 300: "#eba0c7", 400: "#e971a6", 500: "#dc4d8a", 600: "#c6336a", 700: "#9f274d", 800: "#731b32", 900: "#47121b" },
      cream: "#f7f7f7",
      coffee: "#5c534f",
      extend: {},
    },
    plugins: [],
  }
}