<template>
  <div class="h-full">
    <CommonMain />
    <CommonPrograms />
    <LazyCommonMainStatistics />
    <LazyCommonMainTestimonials />
    <LazyCommonMainSectionPartners />
    <LazyCommonMainSectionFaq />
    <div class="w-full md:h-20 bg-white" />
    <LazyCommonDownloadApp class="bg-white" />
  </div>
</template>

<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { useRoute } from 'vue-router'

import { useHomeStore } from '~/store/home'
import type { IEvents } from '~/types/home.types'

const store = useHomeStore()
const route = useRoute()

const { y } = useWindowScroll()


watch(
  () => y.value,
  () => {
    store.isExistImage = route.path === '/' && y.value < 100

    if (y.value > 100) {
      store.isExistImage = false
    }
  },
  {
    immediate: true,
  }
)

const events = computed(() => store.events as IEvents[])
const news = computed(() => store.news as IEvents[])

onMounted(() => {
  store.fetchEvents({ limit: 5 })
  store.fetchNews({ limit: 3 })
})
</script>
