<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { ref } from 'vue'

interface Props {
  title: string
  titleClass?: string
  isActive?: boolean
}
const props = defineProps<Props>()

const activeFaq = ref(unref(props.isActive))

const showPanel = ref(false)

const togglePanel = (event: any) => {
  activeFaq.value = false
  showPanel.value = !showPanel.value
}
</script>

<template>
  <div
    class="panel container mx-auto transition-300 px-0 border-b-gray-7 border-b last:border-b-0"
  >
    <button
      class="py-4 md:py-5 w-full font-semibold flex flex-row items-center justify-between"
      @click.prevent="togglePanel"
    >
      <div class="flex-y-center justify-between w-full">
        <span :class="titleClass">{{ title }}</span>
        <i
          class="icon-chevron text-2xl transition"
          :class="
            showPanel || activeFaq
              ? '-rotate-90 text-red bg-red bg-opacity-[0.06]'
              : 'rotate-90 text-gray-2'
          "
        ></i>
      </div>
    </button>
    <CollapseTransition>
      <div
        v-if="showPanel || activeFaq"
        :aria-hidden="!showPanel"
        class="px-0 py-2"
      >
        <slot></slot>
      </div>
    </CollapseTransition>
  </div>
</template>
