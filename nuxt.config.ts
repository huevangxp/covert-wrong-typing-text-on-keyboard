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
          href: 'https://cdn.jsdelivr.net/npm/vuetify@3.2.17/dist/vuetify.min.css',
        },
      ],
    },
  },
  compatibilityDate: '2025-07-15',
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
    },
  ],
  
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