<template>
  <div class="flex flex-col gap-2">
    <div class="w-full max-w-lg h-6 rounded skeleton" />
    <p
      v-for="line in 4"
      :key="line"
      :class="{ 'max-w-md': line === 4 }"
      class="w-full h-4 skeleton rounded my-0.5"
    />
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8"
    >
      <div v-for="image in 8" :key="image" class="skeleton rounded-md h-56" />
    </div>
  </div>
</template>
