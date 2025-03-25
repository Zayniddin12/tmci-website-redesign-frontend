<template>
  <div class="rounded-2xl border border-gray-300 bg-gray-100 p-3 md:p-5 h-full">
    <h3 class="flex-y-center gap-1.5 mb-4">
      <div class="size-10 rounded-lg text-white bg-red grid place-items-center">
        <img :src="`${icon}`" />
      </div>
      <span class="text-xl md:text-2xl font-medium">{{ title }}</span>
    </h3>

    <article class="article font-georgia" v-html="content" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string
  content: string
  icon: string
}

defineProps<Props>()
</script>
