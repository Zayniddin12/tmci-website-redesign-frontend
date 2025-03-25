<script lang="ts" setup>
interface Props {
  card: {
    image?: string
    title: string
    content: string
  }
}

defineProps<Props>()
</script>

<template>
  <div
    class="border border-300 sm:p-7 w-full pointer-events-none p-4 bg-white shadow-main rounded-2xl sm:rounded-3xl sm:space-y-4"
  >
    <div>
      <p v-if="card?.title" class="font-bold mb-1 sm:mb-2">
        {{ card?.title }}
      </p>
      <p class="line-clamp-10 font-averta text-gray sm:text-base text-sm">
        {{ card?.content }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
