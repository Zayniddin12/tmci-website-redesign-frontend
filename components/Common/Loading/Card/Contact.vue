<template>
  <div
    class="rounded-xl w-full md:rounded-2xl p-4 md:p-5 border border-gray-100 grid gap-y-4 bg-white"
  >
    <div>
      <div class="w-full h-5 skeleton rounded-md" />
      <div class="w-full max-w-72 h-3 skeleton rounded-md" />
    </div>

    <div class="space-y-1.5 md:space-y-3">
      <div
        v-for="key in 3"
        :key
        class="flex items-center gap-1.5 sm:gap-2 max-w-72"
      >
        <div class="size-5 skeleton rounded" />
        <div class="w-full h-4 skeleton rounded" />
      </div>
    </div>
  </div>
</template>
