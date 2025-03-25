<script lang="ts" setup>
defineProps<{
  card: {
    title: string
    description: string
    image: string
    link?: string
  }
}>()
</script>

<template>
  <nuxt-link
    v-if="card.link"
    :to="`/programs/${card.link}`"
    class="px-4 md:px-6 py-5 md:py-7 md:rounded-3xl rounded-2xl bg-gray-200 duration-200 border border-gray-200 hover:border-red hover:bg-transparent hover:shadow-main relative overflow-hidden"
  >
    <div class="mb-4">
      <p
        v-if="card.title"
        class="text-xl text-center sm:text-2xl font-vela font-extrabold"
      >
        {{ card.title }}
      </p>
      <p class="text-sm capitalize text-center sm:text-base font-vela">
        {{ card?.description }}
      </p>
    </div>
    <CommonImage
      v-if="card.image"
      :src="card.image"
      alt="image"
      class="mb-[-55px] max-h-[260px] min-h-[260px]"
      image-class="!object-contain text-center mx-auto h-full"
    />
  </nuxt-link>
</template>
