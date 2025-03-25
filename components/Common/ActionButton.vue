<script setup lang="ts">
defineProps<{
  text: string
  icon: string
}>()

const emit = defineEmits<{
  (e: 'action'): void
}>()

const isHover = ref(false)
</script>

<template>
  <div
    class="flex items-center rounded-lg w-max cursor-pointer overflow-hidden border border-gray-200 duration-200 bg-gray-100 gap-3 pl-4"
    :class="{ '!border-red': isHover }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    @click="emit('action')"
  >
    <p v-if="text" class="font-semibold text-sm truncate w-full">
      {{ text }}
    </p>
    <div
      class="p-2.5 bg-white cursor-pointer border-l border-white duration-200"
      :class="{ '!border-red': isHover }"
      @click="emit('action')"
    >
      <span class="text-lg h-5 flex-center text-gray" :class="[icon]" />
    </div>
  </div>
</template>

<style scoped></style>
