<script setup lang="ts">
defineProps<{
  story?: {
    title: string
    content: string
    image: string
    student: {
      grade: string
      name: string
      image: string
    }
  }
  loading?: boolean
}>()
</script>

<template>
  <div class="flex md:flex-row flex-col md:items-center gap-4 md:gap-8">
    <BaseSkeleton width="381px" height="292px" border-radius="24px" :loading>
      <CommonImage
        v-if="story?.image"
        :src="story?.image"
        alt="image of story"
        class="shrink-0 max-h-[292px] max-w-[381px] h-full w-full object-cover rounded-xl sm:rounded-3xl overflow-hidden aspect-[381/292] mx-auto"
      />
      <img
        v-else
        src="/assets/images/default.webp"
        alt="image of story"
        class="shrink-0 max-h-[292px] border max-w-[381px] h-full w-full object-cover rounded-xl sm:rounded-3xl overflow-hidden aspect-[381/292]"
      />
    </BaseSkeleton>

    <div class="space-y-4 md:space-y-8">
      <div class="space-y-1.5 md:space-y-3">
        <BaseSkeleton
          width="100%"
          height="38px"
          :loading
          preloader-class="mb-3"
        >
          <h3 class="text-xl font-bold line-clamp-2">{{ story?.title }}</h3>
        </BaseSkeleton>
        <BaseSkeleton width="100%" height="96px" :loading>
          <p class="md:text-base text-sm">{{ story?.content }}</p>
        </BaseSkeleton>
      </div>

      <CardProfile
        v-bind="{
          student: story?.student,
        }"
        :loading
      />
    </div>
  </div>
</template>

<style scoped></style>
