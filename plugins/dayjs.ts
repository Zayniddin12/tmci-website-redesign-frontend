import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import uz from 'dayjs/locale/uz-latn'
import en from 'dayjs/locale/en'
import relativeTime from 'dayjs/plugin/relativeTime.js'

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(relativeTime)
  dayjs.locale(ru)
  dayjs.locale(uz)
  dayjs.locale(en)
  nuxtApp.provide('dayjs', dayjs)
})
