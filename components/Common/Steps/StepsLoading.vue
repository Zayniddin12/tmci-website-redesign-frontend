<template>
  <div
    class="w-full grid grid-cols-5 md:grid-cols-[1fr_max-content_1fr] justify-center gap-4 md:gap-7 max-w-[874px] min-h-[210px] items-center"
  >
    <div
      class="border border-gray-200 p-5 flex flex-col gap-2 text-left items-start w-full max-md:col-span-4"
      :class="{ 'order-last': reverse }"
    >
      <BaseSkeleton width="100%" height="24px" loading />
      <BaseSkeleton width="80%" height="18px" loading />
      <BaseSkeleton width="90%" height="18px" loading />
      <BaseSkeleton width="60%" height="18px" loading />
      <BaseSkeleton width="100%" height="18px" loading />
    </div>
    <div class="flex-y-center flex-col gap-2 h-full">
      <hr v-if="isCenter" class="w-px border-none h-full bg-gray-200" />
      <hr class="w-px border-none h-full bg-gray-200" />
    </div>
    <div v-if="!isHalf" :class="{ 'order-first': reverse }" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  reverse?: boolean
  isCenter?: boolean
  isHalf?: boolean
}
defineProps<Props>()
</script>
