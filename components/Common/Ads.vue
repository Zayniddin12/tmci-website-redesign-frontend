<template>
  <div>
    <nuxt-img
      :src="image ?? '/images/ad.png'"
      alt="AD"
      class="w-full hidden md:block"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  image: string
}

defineProps<Props>()
</script>

<style scoped></style>
]
