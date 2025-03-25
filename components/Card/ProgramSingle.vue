<script lang="ts" setup>
defineProps<{
  list: {
    title: string
    subtitle: string
    subClass?: string
  }[]
}>()
</script>

<template>
  <div
    class="py-4 px-5 rounded-2xl bg-gray-100 justify-between flex gap-3 flex-wrap"
  >
    <div
      v-for="(item, idx) in list"
      :key="idx"
      class="space-y-1 sm:space-y-2 max-w-[153px]"
    >
      <p class="text-gray text-sm leading-130">{{ item?.title }}</p>
      <p class="font-semibold leading-130">
        {{ item?.subtitle }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
