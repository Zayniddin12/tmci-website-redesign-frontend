<template>
  <section class="py-11">
    <div class="container">
      <h2
        v-if="title?.length"
        :class="`text-2.5xl font-bold leading-130 text-dark mb-6 ${titleClass}`"
      >
        {{ title }}
      </h2>
      <slot />
      <BaseButton
        v-if="showLoadMore"
        class="mt-8 block mx-auto"
        :text="loadMoreText"
        variant="gray"
        size="large"
        @click="$emit('load-more')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TClassName } from '~/types'

interface Props {
  title?: string
  titleClass?: TClassName
  loadMoreText?: string
  showLoadMore?: boolean
}
defineProps<Props>()

defineEmits<{
  (event: 'load-more'): void
}>()
</script>

<style scoped></style>
