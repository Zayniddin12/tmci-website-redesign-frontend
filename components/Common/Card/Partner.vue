<template>
  <a
    :href="url"
    class="border md:border-transparent md:hover:border-[#F5F7F5] rounded-lg hover:shadow-partner transition-300 grid place-items-center"
    rel="noopener noreferrer"
    target="_blank"
  >
    <CommonImage
      image-class="size-full object-cover object-center rounded-lg max-w-44 h-20 md:h-24 md:grayscale-100 hover:grayscale-0 transition-300"
      v-bind="{ src, alt }"
    />
  </a>
</template>
<script lang="ts" setup>
interface Props {
  src: string
  alt: string
  url?: string
}

defineProps<Props>()
</script>
