<template>
  <div class="flex max-md:flex-col items-stretch md:gap-4">
    <div class="flex flex-col justify-between gap-3 h-full w-full">
      <h2 class="text-2xl md:text-3xl font-medium">{{ title }}</h2>
      <article class="article w-full" v-html="content" />
    </div>

    <div class="">
      <img
        :alt="title"
        class="rounded-xl max-h-96 object-cover"
        :src="image?.original"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IGreenCampusInfo } from '~/types/common'

defineProps<IGreenCampusInfo>()
</script>
