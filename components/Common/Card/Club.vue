<template>
  <NuxtLinkLocale
    :to="`/student-life/clubs/${slug}`"
    class="flex flex-col w-full bg-white rounded-2xl overflow-hidden cursor-pointer border border-transparent hover:border-gray-300 hover:bg-gray-200/20 transition-300"
  >
    <img
      :alt="title + subtitle || 'Student club, TMCI'"
      :src="main_image.original"
      class="w-full sm:max-w-[281px] h-[188px] object-cover"
    />

    <div class="p-4 flex flex-col space-y-2">
      <h2 class="text-lg font-bold">{{ title }}</h2>
      <p class="text-sm !font-normal break-words line-clamp-2">
        {{ subtitle }}
      </p>
    </div>
  </NuxtLinkLocale>
</template>

<script lang="ts" setup>
import type { TClub } from '~/types/common'

defineProps<TClub>()
</script>
