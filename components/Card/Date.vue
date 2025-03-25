<script setup lang="ts">
import dayjs from 'dayjs'

defineProps<{
  date: string
}>()
</script>

<template>
  <div
    class="bg-gray-200 w-[53px] shrink-0 aspect-square flex flex-col items-center justify-center rounded-xl"
  >
    <p class="text-red font-extrabold sm:text-lg leading-130">
      {{ dayjs(date).format('DD') }}
    </p>
    <p class="text-xs font-medium leading-130 capitalize">
      {{ dayjs(date).format('MMM') }}
    </p>
  </div>
</template>

<style scoped></style>
