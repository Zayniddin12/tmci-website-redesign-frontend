<template>
  <div class="grid gap-4">
    <div class="w-full">
      <div class="mb-2 w-full h-5 skeleton rounded max-w-xl" />
      <div
        v-for="line in 4"
        :key="line"
        class="w-full h-3.5 skeleton rounded"
      />
    </div>

    <div class="w-full">
      <div class="mb-2 w-full h-5 skeleton rounded max-w-xl" />
      <div
        v-for="line in 4"
        :key="line"
        class="w-full h-3.5 skeleton rounded"
      />
    </div>
  </div>
</template>
