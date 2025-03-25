<template>
  <div
    v-lazy="src"
    :error-state="errorState"
    class="image-loading overflow-hidden"
  >
    <img alt="Image" :class="imageClass" class="object-cover w-full h-full" />
  </div>
</template>

<script lang="ts" setup>
import type { TClassName } from '~/types'

interface Props {
  src: string | undefined
  alt?: string
  errorState?: string
  imageClass?: TClassName
}

withDefaults(defineProps<Props>(), {
  imageClass: '',
  errorState: '/assets/images/default.webp',
  alt: 'image',
})
</script>
