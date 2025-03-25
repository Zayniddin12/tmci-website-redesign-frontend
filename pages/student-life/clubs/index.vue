<template>
  <section class="pt-4">
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />

    <div class="container">
      <h1 class="font-extrabold text-5xl mt-3">
        {{ t('student_life.student_clubs.title') }}
      </h1>
      <Transition mode="out-in" name="fade">
        <div
          v-if="loading"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5"
        >
          <CommonLoadingCardClub v-for="club in 6" :key="club.title" />
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5"
        >
          <CommonCardClub
            v-for="club in clubs"
            :key="club.title"
            v-bind="club"
          />
        </div>
      </Transition>
    </div>

    <div class="bg-white mt-16 pt-16 pb-52 flex justify-center">
      <div class="container">
        <div class="flex justify-center">
          <div class="w-full max-w-screen-md">
            <div class="mb-8 w-full">
              <h2 class="text-[40px] font-extrabold capitalize text-center">
                {{ t('faq.title') }}
              </h2>
              <p class="text-base font-normal text-center whitespace-pre-line">
                {{ t('faq.subtitle') }}
              </p>
            </div>
            <Transition mode="out-in" name="fade">
              <div v-if="faqs.loading" class="grid gap-3">
                <CommonLoadingCardFaq v-for="list in 4" :key="list" />
              </div>
              <Faq v-else :faqs="faqs.list" />
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <LazyCommonDownloadApp class="bg-white !pt-0" />
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { IFaqs, IResponse, TClub } from '~/types/common'

const { t } = useI18n()

const loading = ref(true)
const clubs = ref<TClub[]>([])
const faqs = ref({
  list: [] as IFaqs[],
  loading: true,
})

onMounted(() => {
  getClubs()
  getFaqs()

})

function getClubs() {
  useApi()
    .$get<IResponse<TClub>>('/student-life/student-clubs/')
    .then((res) => {
      clubs.value = res.results
    })
    .finally(() => {
      loading.value = false
    })
}

function getFaqs() {
  useApi()
    .$get('/student-life/student-clubs/faqs/')
    .then((res: any) => {
      faqs.value.list = res.results
    })
    .finally(() => {
      faqs.value.loading = false
    })
}

const routes = [
  {
    name: t('student_life.nav.student_life'),
    path: '',
  },
  {
    name: t('office_of_rector'),
    path: '/student-life/clubs',
  },
]
</script>
