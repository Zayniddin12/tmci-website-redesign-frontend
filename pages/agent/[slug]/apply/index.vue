<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { admissionApplyCardData } from '~/data/admission.data'

const { t } = useI18n()

const route = useRoute()
const agentSlug = route.params.slug || undefined

const breadcrumbs = computed(() => {
  return [
    {
      name: t('admission.name'),
      path: '/admission',
    },
    {
      name: t('apply'),
      path: `/agent/${agentSlug}/apply`,
    },
  ]
})


// Modify the admissionApplyCardData to update the url conditionally
const modifiedAdmissionApplyCardData = computed(() => {
  return admissionApplyCardData().map(card => {
    let newUrl = null
    if (card.url === '/apply/program') {
      newUrl = `apply/program`
    } else if (card.url === '/apply/scholarship') {
      newUrl = `apply/scholarship`
    }
    return {
      ...card,
      url: newUrl,
    }
  })
})

</script>

<template>
  <main>
    <base-breadcrumb :routes="breadcrumbs" class="mb-3 !bg-gray-100" />

    <admission-wrapper-main :title="$t('apply')" class="mb-[211px]">
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <admission-card-apply
            v-for="card in modifiedAdmissionApplyCardData"
            :key="card.title"
            :card="card"
            class="col-span-1"
          />
        </div>
      </template>
    </admission-wrapper-main>

    <common-download-app />
  </main>
</template>

<style scoped></style>
