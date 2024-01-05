// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    preset: "aws-lambda",
  },
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    referer: process.env.REFERER,
    isDev: process.env.NODE_ENV === "development",
  },
})
