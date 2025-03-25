<template>
  <h2
    class="uppercase md:text-3.5xl text-2xl sm:text-[32px] leading-130 font-extrabold relative before:block before:absolute before:w-1/2 before:h-1 before:bg-red before:-bottom-1 before:left-0 before:transform before:transition-300 before:ease-in-out before:delay-300 before:duration-300 before:z-1 inline-block"
  >
    {{ title }}
  </h2>
</template>
<script setup lang="ts">
interface Props {
  title: string
}
defineProps<Props>()
</script>
