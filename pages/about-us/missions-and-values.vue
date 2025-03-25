<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useMyFetch } from '~/composables/useFetch'
import type { IStaticPage } from '~/types/about/index.types'

const { t } = useI18n()
const routes = [
  {
    name: t('about_us'),
    path: '/about-us',
  },
  {
    name: t('mission_and_values'),
    path: '/about-us',
  },
]

const { data } = await useMyFetch('static/mission-and-values/', {
  server: true,
})

const staticPage = computed(() => data.value as IStaticPage)
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <div class="!bg-white">
      <div class="bg-gray-100">
        <div class="container">
          <div class="max-w-[782px] w-full mx-auto mt-3 pb-16 sm:pb-[189px]">
            <h1 class="title-style text-center mt-3 mb-3 md:mb-6">
              {{ staticPage?.title }}
            </h1>

            <div
              v-if="staticPage?.description"
              class="about-text space-y-4"
              v-html="staticPage?.description"
            ></div>
          </div>
        </div>
      </div>

      <div
        v-if="staticPage?.cards?.length"
        class="container -mt-8 sm:-mt-[125px]"
      >
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <CardAbout
            v-for="(item, i) in staticPage?.cards"
            :key="i"
            :card="{
              image: item?.icon,
              title: item?.title,
              content: item?.description,
            }"
          />
        </div>
      </div>

      <div class="mt-10 lg:mt-[190px]">
        <CommonDownloadApp />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
