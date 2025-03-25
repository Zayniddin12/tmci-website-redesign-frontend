<template>
  <div
    class="grid grid-cols-1 md:grid-cols-7 lg:grid-rows-1 gap-5 h-full md:bg-white rounded-3xl xl:bg-transparent place-items-center pl-4 md:pl-0"
  >
    <div
      :class="{
        'col-start-5 col-end-8 row-start-1 row-end-2 md:rounded-l-none md:rounded-r-3xl':
          !reversed,
      }"
      class="xl:w-[482px] xl:h-80 w-full h-full col-span-3 row-span-1 skeleton md:rounded-r-none xl:rounded-3xl rounded-2xl"
    />
    <div
      :class="{
        'col-start-1 col-end-5 row-start-1 row-end-2 md:rounded-r-none md:rounded-l-3xl':
          !reversed,
      }"
      class="xl:p-6 p-4 bg-white md:rounded-l-none xl:rounded-3xl rounded-2xl h-full col-span-4 w-full"
    >
      <div>
        <h2 class="h-5 w-full skeleton rounded" />
        <div class="w-full h-3.5 skeleton rounded" />
      </div>
      <div
        v-for="line in 4"
        :key="line"
        :class="{ 'max-w-xs': line === 4 }"
        class="w-full h-3 my-0.5 skeleton rounded"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  reversed: boolean
}

defineProps<Props>()
</script>
