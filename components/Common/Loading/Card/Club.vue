<template>
  <div class="flex flex-col w-full bg-white rounded-2xl overflow-hidden p-2">
    <div
      class="w-full sm:max-w-[281px] h-[188px] object-cover skeleton rounded-lg"
    />

    <div class="py-4 flex flex-col space-y-2">
      <div class="h-4 skeleton rounded" />
      <div
        v-for="line in 2"
        :key="line"
        :class="{ 'max-w-': line === 2 }"
        class="h-4 skeleton rounded"
      />
    </div>
  </div>
</template>
