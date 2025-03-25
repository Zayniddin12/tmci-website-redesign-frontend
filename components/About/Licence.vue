<script setup lang="ts">
import type { ILicense } from '~/types/about/index.types'

defineProps<{
  license: ILicense[]
}>()
</script>

<template>
  <div class="py-8 md:py-16">
    <h2 class="font-extrabold mb-4 md:mb-6 text-lg sm:text-2xl md:text-[32px]">
      {{ $t('licence') }}
    </h2>

    <div
      class="grid grid-cols-1 md:grid-cols-2  gap-8 md:gap-5 mt-5 md:mt-[77px]"
    >
      <CardLicense
        v-for="(item, i) in license"
        :key="i"
        :doc="{
          image: item?.image?.s500x500,
          title: item?.title,
          file: item?.pdf,
        }"
      />
    </div>
  </div>
</template>

<style scoped></style>
