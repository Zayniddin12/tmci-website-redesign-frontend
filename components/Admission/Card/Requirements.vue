<script lang="ts" setup>
defineProps<{
  card: {
    headerTitle?: string
    headerContent?: string
    footerTitle?: string
    footerContent?: string
    scholars?: {
      icon?: string
      title?: string
      subtitle?: string
    }[]
  }
  loading?: boolean
}>()
</script>

<template>
  <div
    class="w-full bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl space-y-4 md:space-y-6"
  >
    <div class="w-full">
      <BaseSkeleton
        :loading
        border-radius="12px"
        height="40px"
        preloader-class="mb-2"
        width="100%"
      >
        <h3
          v-if="card?.headerTitle"
          class="mb-4 text-xl font-bold sm:text-[28px]"
        >
          {{ card?.headerTitle }}
        </h3>
      </BaseSkeleton>
      <BaseSkeleton :loading border-radius="12px" height="240px" width="100%">
        <div
          v-if="card?.headerContent"
          class="about-text"
          v-html="card.headerContent"
        />
      </BaseSkeleton>
    </div>
  </div>
</template>

<style scoped></style>
