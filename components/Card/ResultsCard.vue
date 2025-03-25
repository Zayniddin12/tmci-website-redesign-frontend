<script setup lang="ts">
interface Props {
  title: string
  description: string
  img: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="overflow-hidden bg-gray-200 w-full h-[166px] rounded-3xl p-4 relative border hover:border-red transition">
    <h3 class="text-dark text-2xl font-semibold">{{ $t(`${title}`) }}</h3>
    <p class="text-red text-3.5xl font-extrabold">
      {{ $t(`${description}`) }}
    </p>
    <img :src="img" alt="" class="absolute right-0 -bottom-1"/>
  </div>
</template>

<style scoped></style>
