<script setup lang="ts">
import type { IEducationFAQList } from '~/types/services/education.types'

defineProps<{
  faq: IEducationFAQList[]
}>()
</script>

<template>
  <section class="bg-white">
    <div class="container py-7 md:py-11">
      <h1
        class="text-dark text-xl md:text-2.5xl leading-9 font-bold mb-0 md:mb-6"
      >
        F.A.Q.
      </h1>
      <BaseCollapse
        v-for="item in faq"
        :key="item.order"
        :title="item.faq.question"
        title-class="text-dark text-left text-base md:text-[22px] font-semibold line-clamp-2 leading-130"
      >
        <div class="text-sm font-normal leading-140" v-html="item.faq.answer" />
      </BaseCollapse>
    </div>
  </section>
</template>

<style scoped></style>
