<template>
  <div
    class="grid grid-cols-10 gap-4 grid-rows-2 min-h-60 md:grid-rows-1 items-center *:w-full"
  >
    <div class="col-span-10 md:col-span-7 skeleton rounded-3xl" />

    <div
      class="col-span-10 md:col-span-3 rounded-3xl p-2 md:p-4 h-full border border-gray-100 flex flex-col justify-between gap-3"
    >
      <article class="grid gap-3">
        <h3 class="h-4 skeleton rounded-md" />
        <p v-for="key in 4" :key class="h-3 skeleton rounded-md" />
      </article>
      <div class="max-w-36 h-5 rounded-lg skeleton" />
    </div>
  </div>
</template>
