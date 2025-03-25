<template>
  <div
    class="flex md:flex-col max-h-[104px] sm:max-h-max rounded-2xl w-full overflow-hidden bg-white"
  >
    <div
      class="min-w-[124px] max-w-[281px] md:max-w-auto min-h-auto md:min-w-full md:min-h-[188px] object-center rounded-t-2xl"
    />
    <div class="flex flex-col h-full p-3 sm:p-5 gap-2">
      <p class="h-5 skeleton rounded-md" />

      <p v-for="key in 5" :key class="skeleton h-3 rounded-md" />
    </div>
  </div>
</template>
