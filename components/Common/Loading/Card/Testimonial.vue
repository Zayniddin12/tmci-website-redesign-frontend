<template>
  <div class="p-1 bg-white rounded-3xl">
    <div
      class="flex flex-col items-center justify-center lg:flex-row gap-x-4 rounded-3xl"
    >
      <div
        class="md:w-[300px] min-h-64 size-full md:rounded-l-3xl rounded-3xl skeleton shrink-0 self-center"
      />

      <div class="grid gap-5 md:gap-8 p-5 md:py-8 md:pr-6 w-full *:w-full">
        <div class="grid gap-2">
          <h2 class="rounded skeleton h-6" />
          <p class="rounded skeleton h-3" />
        </div>
        <div>
          <p
            v-for="key in 5"
            :key
            :class="{ 'max-w-xs': key === 5 }"
            class="h-3 skeleton rounded"
          />
        </div>
      </div>
    </div>
  </div>
</template>
