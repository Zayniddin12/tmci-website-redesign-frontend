<template>
  <div class="flex max-md:flex-col gap-4 items-stretch">
    <div class="w-full">
      <img
        :alt="title"
        :src="image?.original"
        class="object-cover object-center max-h-96 rounded-3xl w-full min-w-[300px] h-full"
      />
    </div>
    <!--article right-->
    <div
      class="rounded-3xl p-2 md:p-4 min-h-full bg-gray-100 flex flex-col justify-between"
    >
      <article class="grid gap-3 mb-3">
        <h3 class="text-dark text-xl md:text-2.5xl font-medium">{{ title }}</h3>
        <p class="text-dark leading-140">
          {{ richTextPurify(content, 10000) }}
        </p>
      </article>
      <a :href="file" rel="noopener noreferrer" target="_blank">
        <BaseButton :text="$t('learn_more')" class="!w-fit" variant="primary" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IGreenCampusInfo } from '~/types/common'

defineProps<IGreenCampusInfo>()
</script>
