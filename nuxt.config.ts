// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    head: {
      title: 'My App',
      link: [
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
  vite: {
    plugins: [
      // @ts-expect-error
      vuetify({ autoImport: true }),
    ],
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
