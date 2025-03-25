<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useHomeStore } from '~/store/home'
import type { IStaticPage } from '~/types/about/index.types'

const store = useHomeStore()
const route = useRoute()

const { data } = useAsyncData('static-pages', () =>
  store.fetchStaticPage(String(route.params?.slug ?? ''))
)

const staticPage = computed(() => data.value as IStaticPage)
</script>

<template>
  <div class="bg-gray-100">
    <div class="container">
      <div class="max-w-[782px] w-full mx-auto mt-3 pb-10 sm:pb-16">
        <h1 class="title-style text-center my-3 md:my-6">
          {{ staticPage?.title }}
        </h1>

        <div
          v-if="staticPage?.content"
          class="about-text"
          v-html="staticPage?.content"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
