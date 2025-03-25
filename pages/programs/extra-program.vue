<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    <div class="bg-gray-100 py-10 sm:py-12 md:py-16">
      <div class="container">
        <h2 class="title-style">
          {{ $t('undergraduate_programs') }}
        </h2>

        <div
          class="mt-4 sm:mt-6 mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 flex-wrap gap-3 sm:gap-5"
        >
          <CardProgramMain
            v-for="i in 6"
            :key="i"
            class="w-full"
            :card="{
              title: 'International business',
              subtitle: 'Undergraduate',
              content:
                'International business refers to the trade of goods, services, technology, capital and/or knowledge across national borders and at a global or transnational scale. It involves cross-border transactions of goods and services between two or more countries.',
              link: 'https://kun.uz',
            }"
          />
        </div>
        <div class="w-full text-center">
          <BaseButton type="button" :text="$t('apply')" class="min-w-[164px] max-w-max" />
        </div>
      </div>
    </div>

    <div class="pt-16">
      <CommonDownloadApp />
    </div>
  </div>
</template>

<style></style>
