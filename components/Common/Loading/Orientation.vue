<template>
  <div>
    <div class="w-full max-w-lg h-6 rounded skeleton mb-2 mt-6" />
    <p
      v-for="line in 4"
      :key="line"
      :class="{ 'max-w-md': line === 4 }"
      class="w-full h-4 skeleton rounded my-0.5"
    />

    <div
      class="mt-6 relative h-[290px] md:h-[500px] overflow-hidden w-full rounded-2xl skeleton"
    />
  </div>
</template>
