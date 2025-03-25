<script setup lang="ts">
import type { IAnnouncement } from '~/types/about/index.types'

defineProps<{
  announcement: IAnnouncement
}>()
</script>

<template>
  <div v-if="announcement.is_active" class="bg-red py-3 w-full">
    <div class="container flex gap-4 sm:flex-row justify-between items-center">
      <div class="flex items-center gap-2 md:gap-5">
        <img
          src="/assets/images/admission/voice.webp"
          alt="image"
          class="w-12 md:w-[60px] aspect-square"
        />

        <div>
          <h1
            class="text-white text-sm md:text-lg font-extrabold mb-1 line-clamp-2"
          >
            {{ announcement?.title }}
          </h1>
          <p class="text-white text-xs md:text-sm font-medium line-clamp-2">
            {{ announcement?.subtitle }}
          </p>
        </div>
      </div>

      <a :href="announcement?.link" target="_blank">
        <BaseButton
          variant="error"
          :text="announcement?.action_name"
          class="sm:w-[164px] h-[42px] !bg-white/[12%]"
        />
      </a>
    </div>
  </div>
</template>

<style scoped></style>
