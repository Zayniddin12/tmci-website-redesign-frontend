<template>
  <div class="flex-y-center gap-4">
    <img
      :alt="title"
      :src="icon"
      class="size-10 md:size-14 object-contain object-center"
    />

    <div>
      <count-up
        :autoinit="isVisible"
        :decimal-places="0"
        :duration="3"
        :end-val="value"
        :start-val="0"
        class="sm:text-4.5xl md:text-2.5xl text-xl font-bold text-white"
        delay="500"
      />

      <p class="text-white/80 leading-140 text-sm md:text-base">{{ title }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CountUp from 'vue-countup-v3'

interface Props {
  icon: string
  title: string
  value: string
  isVisible: boolean
}

defineProps<Props>()
</script>
