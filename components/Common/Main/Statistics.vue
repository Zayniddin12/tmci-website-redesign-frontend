<template>
  <section
    class="py-10 grid place-items-center bg-gradient-to-r from-red to-[#310812]"
  >
    <div class="container">
      <h2 class="title-style text-center text-white max-w-screen-md mx-auto">
        {{ $t('stats.title') }}
      </h2>
      <p class="text-center text-white/80 max-w-screen-md mx-auto">
        {{ $t('stats.info') }}
      </p>

      <div
        ref="target"
        class="grid grid-cols-2 lg:grid-cols-4 mt-6 md:mt-8 gap-4"
      >
        <CommonCardStatistic
          v-for="(item, key) in stats"
          :key
          :is-visible
          v-bind="item"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'

import type { IDefaultResponse } from '~/types'

const stats = ref([])
const loading = ref(true)
const isVisible = ref(false)
const target = ref()

onMounted(() => {
  fetchStats()
})

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  isVisible.value = true
})

function fetchStats() {
  loading.value = true
  useApi()
    .$get<IDefaultResponse<any>>('/main/stats/')
    .then((res) => (stats.value = res.results))
    .finally(() => (loading.value = false))
}
</script>
