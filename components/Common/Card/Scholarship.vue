<template>
  <div
    :style="{ backgroundImage: `url(${image?.original})` }"
    class="rounded-3xl w-full min-h-80 bg-cover bg-no-repeat bg-center"
  >
    <div
      class="bg-gradient-to-b from-[#17171933] to-[#171719] size-full rounded-3xl p-4 md:p-7 flex flex-col justify-end items-start gap-2"
    >
      <h1 class="text-xl md:text-2.5xl text-white">{{ title }}</h1>

      <article class="text-white text-sm">
        <p>{{ richTextPurify(card_description, 200) }}</p>
      </article>

      <NuxtLink :to="'scholarships-and-grants/' + slug">
        <BaseButton :text="$t('learn_more')" class="mt-4" variant="secondary" />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IScholarship } from '~/types/common'

defineProps<IScholarship>()
</script>
