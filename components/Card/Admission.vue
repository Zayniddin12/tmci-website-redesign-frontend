<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="flex items-center">
    <h3 class="text-xl font-extrabold text-white sm:text-[28px] mr-0.5">
      {{ title?.split(' ')[0] ?? $t('submenu.admissions.name') }}
    </h3>
    <div class="border-2 border-[#fea26a] px-1 py-0.5 bg-yellow rounded-lg">
      <p class="text-xl font-extrabold text-white sm:text-[28px]">
        {{ title?.split(' ')[1] ?? new Date().getFullYear() }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
