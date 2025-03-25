<template>
  <div></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useHomeStore } from '~/store/home'
import type { IMobileApp } from '~/types/home.types'
import { getMobileOperatingSystem } from '~/utils'

definePageMeta({
  layout: 'loading',
})

const store = useHomeStore()
async function getAppLinks() {
  await store.fetchMobileApp()
  const apps = computed(() => store.mobileApp as IMobileApp)

  switch (getMobileOperatingSystem()) {
    case 'iOS':
      document.location.href = apps.value.app_store
      break
    case 'Android':
      document.location.href = apps.value.google_play
      break
  }
}

getAppLinks()
</script>
