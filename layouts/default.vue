<template>
  <div class="flex flex-col min-h-screen hidden-on-print">
    <!--    <layout-admission-header />-->
    <layout-header />

    <div
      v-if="route.path !== '/'"
      id="default-layout"
      :class="{
        '!h-[68px] lg:!h-[var(--main-header-height)]': !announcement.is_active,
      }"
      class="w-full h-[140px] sm:h-[152px] lg:h-[168px]"
    />
    <div id="breadcrumbs" />
    <div class="relative -z-0 top-0 h-max md:pt-6">
      <slot class="relative z-0" />
    </div>
    <layout-footer />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

import { useHomeStore } from '~/store/home'

const store = useHomeStore()
const route = useRoute()

const announcement = computed(() => store.quickAnnouncement)
</script>
