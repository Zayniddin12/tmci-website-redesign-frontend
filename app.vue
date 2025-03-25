<template>
  <NuxtLayout>
    <div class="main relative z-0 top-8">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import 'dayjs/locale/uz-latn.js'
import 'dayjs/locale/ru.js'
import 'dayjs/locale/en.js'

import dayjs from 'dayjs'
import { useRoute } from 'vue-router'

import { useHomeStore } from '~/store/home'

const store = useHomeStore()
const route = useRoute()
const locale = useCookie('locale').value ?? 'uz'
dayjs?.locale(locale === 'uz' ? 'uz-latn' : locale)

watch(
  () => route.path,
  () => {
    store.isExistImage = route.path === '/'
  }
)

useSeoMeta({
  title: 'TMC Institute of Tashkent',
  description:
    'TMC Institute of Tashkent is a leading institute of higher education in Uzbekistan',
  ogTitle: 'TMC Institute of Tashkent',
  ogDescription:
    'TMC Institute of Tashkent is a leading institute of higher education in Uzbekistan',
  twitterTitle: 'TMC Institute of Tashkent',
  twitterDescription:
    'TMC Institute of Tashkent is a leading institute of higher education in Uzbekistan',
  ogImage: '/og.png',
  twitterImage: '/og.png',
})
</script>
