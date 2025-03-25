<script lang="ts" setup>
defineProps<{
  content?: string
  loading?: boolean
}>()
</script>

<template>
  <BaseSkeleton :loading border-radius="24px" height="250px" width="100%">
    <div v-if="content" class="static" v-html="content"></div>
  </BaseSkeleton>
</template>

<style scoped>
h2,
h3,
h4,
h5 {
  @apply text-lg sm:text-xl md:text-2xl font-bold;
}

p,
span {
  @apply md:text-lg font-georgia;
}

img {
  height: auto !important;
}
</style>
