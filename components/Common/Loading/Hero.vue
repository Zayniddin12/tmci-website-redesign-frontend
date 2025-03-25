<template>
  <div
    class="flex flex-col lg:w-1/2 mt-16 items-center lg:items-start text-white justify-center h-full gap-5"
  >
    <div class="w-full">
      <div
        v-for="line in 2"
        :key="line"
        :class="{ 'max-w-xs': line === 2 }"
        class="max-w-md h-6 skeleton rounded-md w-full"
      />
    </div>
    <div class="w-full">
      <div
        v-for="line in 3"
        :key="line"
        :class="{ '!max-w-sm': line === 3, '!max-w-md': line === 2 }"
        class="w-full h-3 skeleton rounded max-w-xs"
      />

      <div class="my-2" />
      <div
        v-for="line in 4"
        :key="line"
        :class="{ '!max-w-sm': line === 3, '!max-w-md': line === 2 }"
        class="w-full h-3 skeleton rounded max-w-xs"
      />
    </div>
  </div>
</template>
