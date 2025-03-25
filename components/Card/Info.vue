<script setup lang="ts">
defineProps<{
  info: {
    icon: string
    title: string
    content: string
  }
}>()
</script>

<template>
  <div class="sm:p-5 p-4 sm:rounded-3xl rounded-xl bg-gray-100 space-y-2">
    <div class="flex gap-2 sm:gap-3 items-center">
      <span v-if="info?.icon" :class="info?.icon" />
      <h3
        v-if="info?.title"
        class="sm:text-2xl text-xl font-extrabold line-clamp-1"
      >
        {{ info?.title }}
      </h3>
    </div>

    <div
      v-if="info?.content"
      class="text-sm sm:text-base"
      v-html="info?.content"
    />
  </div>
</template>

<style scoped></style>
