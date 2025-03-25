<script lang="ts" setup>
defineProps<{
  card: {
    title?: string
    image?: string
    subtitle?: string
  }
  loading?: boolean
}>()
</script>

<template>
  <div class="flex flex-col md:flex-row gap-3 md:gap-5">
    <BaseSkeleton
      :loading
      border-radius="24px"
      height="250px"
      preloader-class="md:w-[482px] shrink-0"
      width="350px"
    >
      <CommonImage
        v-if="card?.image"
        :src="card?.image"
        alt="card image"
        image-class="shrink-0 overflow-hidden md:w-[482px] object-cover rounded-2xl md:rounded-3xl aspect-[482/323]"
      />
    </BaseSkeleton>

    <div
      class="space-y-2 p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl w-full"
    >
      <BaseSkeleton :loading border-radius="12px" height="40px" width="100%">
        <h2 v-if="card?.title" class="text-xl font-bold sm:text-[28px]">
          {{ card.title }}
        </h2>
      </BaseSkeleton>

      <BaseSkeleton :loading border-radius="12px" height="120px" width="100%">
        <div
          v-if="card?.subtitle"
          class="text-sm md:text-base"
          v-html="card.subtitle"
        />
      </BaseSkeleton>
    </div>
  </div>
</template>

<style scoped></style>
