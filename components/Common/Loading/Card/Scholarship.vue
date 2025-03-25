<template>
  <div
    class="rounded-3xl w-full *:w-full h-60 md:min-h-80 bg-white p-5 flex flex-col justify-end items-start"
  >
    <div class="skeleton h-6 rounded-lg mb-4" />

    <div v-for="key in 3" :key class="h-4 skeleton rounded-md my-1" />

    <div class="max-w-44 h-10 skeleton rounded-lg mt-6" />
  </div>
</template>
