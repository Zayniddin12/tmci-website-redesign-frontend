<template>
  <div
    class="flex md:flex-col max-h-[104px] sm:max-h-max rounded-2xl w-full overflow-hidden cursor-pointer duration-200 border border-transparent group md:hover:!border-red hover:!bg-transparent hover:!shadow-main bg-white"
  >
    <CommonImage
      :src="main_image?.s500x500"
      alt="news image"
      class="min-w-[124px] max-w-[281px] md:max-w-auto min-h-auto md:min-w-full md:min-h-[188px] aspect-[281/188] object-cover object-center rounded-t-2xl"
    />
    <div class="flex flex-col h-full p-3 sm:p-5 gap-2">
      <p class="font-bold text-sm sm:text-lg leading-tight">
        {{ title }}
      </p>

      <p class="text-xs sm:text-sm line-clamp-6 leading-snug">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IGreenInitiative } from '~/types/common'

defineProps<IGreenInitiative>()
</script>
