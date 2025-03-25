<template>
  <div class="md:pt-16 hidden-print">
    <CommonShareBanner
      :url="link"
      class="relative md:overflow-visible max-md:py-8"
    >
      <template #outer>
        <img
          alt="stone"
          class="w-full block sm:hidden absolute bottom-0 -z-1"
          loading="lazy"
          src="~/assets/images/main/stone-mobile.webp"
        />
      </template>
      <div>
        <h3
          class="md:max-w-[90%] text-white font-bold text-lg sm:text-2xl md:text-[32px] mb-1 md:mb-3"
        >
          {{ $t('download_mobile') }}
        </h3>
        <p
          class="mb-5 md:mb-10 text-white/[80%] leading-130 text-sm md:text-base max-w-xl"
        >
          {{ $t('download_mobile_text') }}
        </p>

        <div class="flex-y-center gap-6 mt-6 md:mt-0 mb-[150px] md:mb-0">
          <CommonButtonAppStore
            :link="mobileApp?.app_store"
            icon-class="max-sm:w-full"
          />
          <CommonButtonPlayStore
            :link="mobileApp?.google_play"
            icon-class="max-sm:w-full"
          />
        </div>

        <img
          alt="Phone image with hand"
          class="max-w-[510px] max-lg:hidden absolute bottom-0 right-1/4 md:right-[15%] xl:right-[17%] 2xl:right-[28%] z-2"
          loading="lazy"
          src="~/assets/images/mobile.webp"
        />
        <img
          alt="stone"
          class="max-w-[550px] max-lg:hidden absolute bottom-0 right-[17%] 2xl:right-[28%] z-1"
          loading="lazy"
          src="~/assets/images/stone.webp"
        />
      </div>
    </CommonShareBanner>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'

import { useHomeStore } from '~/store/home'
import type { IMobileApp } from '~/types/home.types'

const store = useHomeStore()
const mobileApp = computed(() => store.mobileApp as IMobileApp)

const link = ref('')

onMounted(() => {
  store.fetchMobileApp()
  if (process.client) {
    link.value = window.location.origin + '/getapp'
  }
})
</script>
<style></style>
