export default defineNuxtConfig({
  ssr: true,
  debug: true,
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'TMCI',
      script: [{ src: '//code.jivosite.com/widget/Wez23KVyfO', async: true }],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.svg',
        },
        {
          rel: 'canonical',
          href: 'https://tmci.uz',
        },
      ],
      meta: [
        {
          name: 'og:site_name',
          content: 'TMC',
        },
        {
          name: 'keywords',
          content: 'TMC, Institute',
        },
      ],
    },
  },

  css: ['~/assets/tailwind.css'],

  routeRules: {
    'admission/apply/program/': {
      ssr: false,
    },
    'admission/apply/scholarship/': {
      ssr: false,
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    'nuxt-simple-robots',
    'nuxt-marquee',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
      },
    ],
    'nuxt3-meta-pixel',
    '@nuxt/image',
    'vue-yandex-maps/nuxt',
    'nuxt-gtag',
    '@nuxtjs/i18n',
  ],

  facebook: {
    /* module options */
    track: 'CompleteRegistration',
    pixelId: '616198450419570',
    autoPageView: true,
    disabled: false,
  },

  i18n: {
    langDir: 'locales',
    baseUrl: 'https://tmci.uz',
    locales: [
      { code: 'ru', iso: 'ru-RU', file: 'ru' },
      { code: 'uz', iso: 'uz', file: 'uz' },
      { code: 'en', iso: 'en', file: 'en' },
    ],
    lazy: true,
    useCookie: true,
    cookieKey: 'locale',
    defaultLocale: 'en',
    fallbackLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
  },

  nitro: {
    serveStatic: true, // Ensure this is correct for your project
  },

  build: {
    transpile: ['vue-toastification', 'vue-yandex-maps/nuxt', 'vue-countup-v3'],
  },

  devServerHandlers: [],

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000', // Update baseURL for production
    },
  },

  yandexMaps: {
    apikey: process.env.YANDEX_API_KEY,
  },

  gtag: {
    id: 'G-N7ZM9DH0Y7',
  },

  compatibilityDate: '2024-08-28',
})
