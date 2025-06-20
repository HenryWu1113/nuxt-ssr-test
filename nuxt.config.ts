// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },

  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/eslint'
  ],
  // ssr: true
  
  typescript: {
    typeCheck: true
  },
  
  nitro: {
    esbuild: {
      options: {
        target: 'es2022'
      }
    }
  },
  
  components: {
    global: true,
    dirs: ['~/components']
  }
})