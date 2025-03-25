<template>
  <div
    class="bg-gray-4 flex-center-between gap-4 relative group cursor-pointer"
    @click="print"
  >
    <p class="truncate text-sm font-semibold leading-130 text-dark pl-4">
      {{ $t('print_out') }}
    </p>
    <button
      class="w-[42px] h-[42px] bg-[#E9EBEE] flex-center group-hover:bg-gray-3 relative shrink-0 icon-print text-gray-1 text-xl leading-5 transition-300"
    />
  </div>
</template>

<script setup lang="ts">
const print = () => {
  window.print()
}
</script>
