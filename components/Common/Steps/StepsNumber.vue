<script setup lang="ts">
interface Props {
  step: number
  activeStep?: number
}
defineProps<Props>()
</script>

<template>
  <div
    class="w-9 h-9 md:w-[60px] md:h-[60px] border rounded-full text-xl md:text-2.5xl font-bold leading-130 flex-center shrink-0"
    :class="
      step <= activeStep
        ? 'bg-red text-white border-red/10'
        : 'bg-red/10 text-red border-red/10'
    "
  >
    {{ step }}
  </div>
</template>

<style scoped></style>
