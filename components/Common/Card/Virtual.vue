<template>
  <div
    class="flex-center-between w-full mx-auto max-w-3xl min-h-80 border border-gray-300 rounded-3xl relative"
  >
    <div class="p-6 absolute left-0 z-2">
      <h5 class="text-base md:text-xl font-medium mb-2">{{ action_name }}</h5>
      <h6 class="text-xl md:text-3xl text-dark mb-4 font-medium">
        {{ title }}
      </h6>
      <article class="text-gray-500 mb-4 max-w-md" v-html="content" />
      <a :href="action_url" rel="noopener noreferrer" target="_blank">
        <BaseButton :text="$t('discover')" variant="error" />
      </a>
    </div>

    <div
      class="w-[60%] absolute h-80 right-0 border-y border-gray-300 rounded-r-3xl hidden md:block"
    >
      <img
        :src="main_image?.s1000x1000"
        alt=""
        class="size-full rounded-r-3xl"
      />

      <div
        class="absolute right-0 bg-gradient-to-r from-white to-transparent w-full h-full rounded-r-3xl top-0 p-px"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Image } from '~/types/common'

defineProps<{
  main_image: Image
  title: string
  action_name: string
  action_url: string
  content: string
}>()
</script>

<style scoped>
.shadow-custom {
  box-shadow: 0px 125px 80px rgba(0, 0, 0, 0.03),
    0px 52.222px 33.422px rgba(0, 0, 0, 0.02),
    0px 27.92px 17.869px rgba(0, 0, 0, 0.02),
    0px 15.652px 10.017px rgba(0, 0, 0, 0.01),
    0px 8.313px 5.32px rgba(0, 0, 0, 0.01),
    0px 3.459px 2.214px rgba(0, 0, 0, 0.01);
}
</style>
