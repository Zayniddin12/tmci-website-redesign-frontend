<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { admissionApplyCardData } from '~/data/admission.data'

const { t } = useI18n()

const breadcrumbs = computed(() => {
  return [
    {
      name: t('admission.name'),
      path: '/admission',
    },
    {
      name: t('apply'),
      path: '/apply',
    },
  ]
})
</script>

<template>
  <main>
    <base-breadcrumb :routes="breadcrumbs" class="mb-3 !bg-gray-100" />

    <admission-wrapper-main :title="$t('apply')" class="mb-[211px]">
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <admission-card-apply
            v-for="card in admissionApplyCardData()"
            :key="card.title"
            :card="card"
            class="col-span-1"
            disabled="disabled"
          />
        </div>
      </template>
    </admission-wrapper-main>

    <common-download-app />
  </main>
</template>

<style scoped></style>
