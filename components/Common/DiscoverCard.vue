<template>
  <section class="relative">
    <div class="container">
      <div class="max-w-[50%]">
        <nuxtLink to="/">
          <CommonImage
            :src="image"
            image-class="w-full h-full object-cover"
            :alt="alt"
          />
        </nuxtLink>
        <div class="p-6 bg-gray-100">
          <h3 class="text-xl text-dark font-bold mb-2">{{ title }} branch</h3>
          <span class="text-gray-1 font-light text-sm block mb-6">
            {{ $t('discover_card_description') }}
          </span>
          <BaseButton
            class="w-full text-blue bg-blue-200"
            variant="secondary"
            :text="$t('discover_more_here')"
            size="large"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  image: string
  alt: string
}

defineProps<Props>()
</script>

<style scoped></style>
