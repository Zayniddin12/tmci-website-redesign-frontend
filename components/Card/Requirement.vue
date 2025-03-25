<script setup lang="ts">
defineProps<{
  card: {
    title?: string
    icon?: string
    subtitle?: string
  }
  loading?: boolean
}>()
</script>

<template>
  <div
    class="p-4 pb-5 space-y-4 rounded-lg bg-[#FBFBFB] border border-[#D7D7D7]"
  >
    <div class="flex items-center gap-2 md:gap-4">
      <BaseSkeleton width="44px" height="44px" border-radius="8px" :loading>
        <div
          v-if="card?.icon"
          class="w-8 md:w-11 h-8 md:h-11 shrink-0 bg-red/10 rounded-md flex-center"
        >
          <span
            class="text-xl md:text-[28px] h-7 flex-center text-red"
            :class="[card?.icon]"
          ></span>
        </div>
      </BaseSkeleton>

      <BaseSkeleton width="200px" height="32px" border-radius="8px" :loading>
        <h3 class="font-semibold leading-130 sm:text-xl md:text-2xl line-clamp-2 text-dark-100">
          {{ card?.title }}
        </h3>
      </BaseSkeleton>
    </div>

    <BaseSkeleton width="100%" height="150px" border-radius="12px" :loading>
      <p class="about-text">{{ card?.subtitle }}</p>
    </BaseSkeleton>
  </div>
</template>

<style scoped></style>
