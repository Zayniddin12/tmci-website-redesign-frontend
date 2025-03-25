<template>
  <main class="pt-6">
    <BaseBreadcrumb
      body-class="!bg-transparent relative z-20"
      v-bind="{ routes }"
    />

    <h1 class="text-2xl md:text-4.5xl font-medium mb-4 mt-3 md:mb-6 container">
      {{ $t('scholarships_and_grants') }}
    </h1>

    <section class="container">
      <Transition mode="out-in" name="fade">
        <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CommonCardScholarship
            v-for="item in cards"
            :key="item?.id"
            v-bind="item"
          />
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CommonLoadingCardScholarship v-for="key in 2" :key />
        </div>
      </Transition>
    </section>

    <section class="mt-10 lg:mt-[160px]">
      <CommonDownloadApp />
    </section>
  </main>
</template>

<script lang="ts" setup>
import type { IDefaultResponse } from '~/types'
import type { IScholarship } from '~/types/common'

const { t } = useI18n()

const loading = ref(true)
const cards = ref<IScholarship>()

onMounted(() => {
  fetchScholarships()
})

function fetchScholarships() {
  useApi()
    .$get<IDefaultResponse<IScholarship>>('/admission/financial-aid/list/')
    .then((response) => {
      cards.value = response.results
    })
    .finally(() => (loading.value = false))
}

const routes = [
  {
    name: t('menu.admissions'),
    path: '/admission',
  },
  {
    name: t('scholarships_and_grants'),
    path: '/admission',
  },
]
</script>
