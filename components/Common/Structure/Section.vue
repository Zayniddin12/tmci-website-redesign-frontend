<template>
  <div class="relative">
    <h3
      :class="{ 'lg:max-w-md mx-auto': head.length === 1 }"
      class="border p-3 font-bold rounded-2xl bg-gray-200 text-center relative z-3"
    >
      {{ title }}
    </h3>
    <div
      :class="{ '!h-8': idx === 1, '!h-6': head.length === 1 }"
      class="absolute-x z-1 h-4 w-px bg-gray-300 top-full max-lg:hidden"
    />

    <div
      v-if="head?.length > 1"
      :class="{
        'left-1/2': idx === 0,
        'right-1/2': idx === head?.length - 1,
      }"
      class="w-full h-px z-1 absolute -bottom-4 bg-gray-300 max-lg:hidden"
    />

    <!-- MOBILE LINES  -->
    <div class="w-4 absolute-y right-full bg-gray-300 h-px lg:hidden" />
    <div
      :style="{ height: structure?.clientHeight + 'px' }"
      class="w-px bg-gray-300 absolute top-6 -left-4 lg:hidden"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IStructureNode } from '~/types/common'

type Props = {
  head: IStructureNode[]
  title: string
  idx: number
  structure: HTMLElement
}

defineProps<Props>()
</script>
