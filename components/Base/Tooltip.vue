<template>
  <div
    :class="[
      props.show
        ? 'visible opacity-100 !-translate-y-1/4 z-1'
        : 'invisible opacity-0',
      classStyle,
    ]"
    class="absolute w-max flex items-center z-20 bottom-full translate-y-0 left-1/2 -translate-x-1/2 group-hover:-translate-y-1/3 px-4 py-2.5 bg-dark text-white text-sm leading-130 rounded-lg border border-dark-secondary text-center transition-all duration-300 group-hover:visible group-hover:md:opacity-100"
  >
    <span class="shrink-0">
      <slot></slot>
    </span>
  </div>
</template>
<script setup lang="ts">
export interface Props {
  show?: boolean
  classStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  classStyle: '',
})
</script>
