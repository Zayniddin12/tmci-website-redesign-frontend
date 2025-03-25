<script lang="ts" setup>
defineProps<{
  title?: string
}>()
</script>

<template>
  <section class="container">
    <h1
      v-if="title"
      class="title-style mt-1.5 md:mt-3 !leading-normal mb-2 md:!mb-6"
    >
      {{ title }}
    </h1>

    <slot name="content" />
  </section>
</template>

<style scoped></style>
