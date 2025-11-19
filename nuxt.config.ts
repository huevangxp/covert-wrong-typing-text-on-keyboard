// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: 'ແປປະໂຫຍກ ຫຼື ຂໍ້ຄວາມທີ່ພິມຜິດ',
      title: 'ແປປະໂຫຍກ ຫຼື ຂໍ້ຄວາມທີ່ພິມຜິດ',
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/logo.png',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@100..900&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap',
        },
      ],
    },
  },
  compatibilityDate: '2025-11-19',
  devtools: { enabled: true },
  
  build: {
    transpile: ['vuetify'],
  },
  
  modules: [
    (_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      // @ts-expect-error
      config.plugins.push(vuetify({ autoImport: true }))
    })
  }, 'nuxt-toast'],
  
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
 

  devServer: {
    port: 4040,
    host: '0.0.0.0',
  },
})