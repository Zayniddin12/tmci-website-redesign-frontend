<script setup lang="ts">
defineProps<{
  student?: {
    grade: string
    name: string
    image: string
  }
  loading?: boolean
}>()
</script>

<template>
  <div class="flex items-center gap-3">
    <BaseSkeleton
      width="48px"
      height="48px"
      border-radius="50px"
      :loading
      preloader-class="shrink-0"
    >
      <CommonImage
        v-if="student?.image"
        class="shrink-0"
        :src="student?.image"
        alt="image of student"
        image-class="!w-12 !h-12 rounded-full overflow-hidden object-cover"
      />
    </BaseSkeleton>

    <div class="space-y-1">
      <BaseSkeleton
        width="325px"
        height="19px"
        border-radius="50px"
        :loading
        preloader-class="mb-1"
      >
        <p class="text-sm font-medium text-gray">{{ student?.grade }}</p>
      </BaseSkeleton>

      <BaseSkeleton width="325px" height="22px" border-radius="50px" :loading>
        <p class="font-bold">{{ student?.name }}</p>
      </BaseSkeleton>
    </div>
  </div>
</template>

<style scoped></style>
