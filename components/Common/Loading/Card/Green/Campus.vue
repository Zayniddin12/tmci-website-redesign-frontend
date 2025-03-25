<template>
  <div class="flex flex-col md:flex-row items-center *:w-full w-full gap-4">
    <div class="flex flex-col gap-3 h-full">
      <h2 class="max-w-3xl skeleton h-6 rounded-lg" />
      <article v-for="key in 5" :key class="h-4 skeleton rounded-md" />
    </div>

    <div class="max-w-xs skeleton h-60 rounded-lg" />
  </div>
</template>
