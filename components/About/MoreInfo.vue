<template>
  <BaseSkeleton v-if="image || description"  :loading="loading" height="300px">
    <div
      class="flex flex-col lg:flex-row container justify-center lg:justify-between items-center gap-5"
    >
      <div class="relative w-full lg:max-w-xl h-fit lg:h-80 shrink-0">
        <video :src="video" class="rounded-3xl size-full" />
        <button
          class="icon-player-play text-3.5xl absolute-center size-20 border border-white/20 rounded-full bg-white/10 backdrop-blur-md text-white"
          @click="$emit('openVideo')"
        />
      </div>

      <div class="w-full md:w-auto mt-5 md:mt-0">
        <h3 class="mb-5 text-xl md:text-3.5xl font-medium">{{ title }}</h3>

        <p class="md:text-lg leading-tight">
          {{ richTextPurify(description, 1000) }}
        </p>
      </div>
    </div>
  </BaseSkeleton>
  <BaseSkeleton v-else :loading="loading" height="300px">
    <div
      class="container !w-full h-full"
    >
      <h3 class="mb-5 text-xl md:text-3.5xl font-medium text-center">{{ title }}</h3>
      <div class="relative w-full h-fit shrink-0">
        <video :src="video" class="rounded-3xl size-full" />
        <button
          class="icon-player-play text-3.5xl absolute-center size-20 border border-white/20 rounded-full bg-white/10 backdrop-blur-md text-white"
          @click="$emit('openVideo')"
        />
      </div>

      <div class="w-full md:w-auto mt-5 md:mt-0">

        <p class="md:text-lg leading-tight">
          {{ richTextPurify(description, 1000) }}
        </p>
      </div>
    </div>
  </BaseSkeleton>
</template>

<script lang="ts" setup>
import type { IMoreInfo } from '~/types/about/index.types'

interface Props extends IMoreInfo {
  loading: boolean
}
const showContent = ref(null)
interface Emits {
  (e: 'openVideo'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
