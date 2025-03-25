<template>
  <section>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />

    <div class="container md:mb-48">
      <h1 class="font-extrabold text-5xl mt-3">
        {{ t('student_life.student_facilities.title') }}
      </h1>

      <Transition mode="out-in" name="fade">
        <CommonLoadingFacilities v-if="loading" class="mt-6" />
        <div v-else class="mt-6 flex flex-col space-y-16">
          <div
            v-for="(facility, index) in facilities"
            :key="index"
            class="flex flex-col"
          >
            <h2 class="text-2xl font-bold mb-2">{{ facility?.title }}</h2>

            <p
              class="mt-2 text-lg leading-7 !font-normal [&>p]:font-normal"
              v-html="facility?.content"
            />

            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5"
            >
              <img
                v-for="(image, idx) in facility?.images"
                :key="idx"
                :src="image?.original"
                alt="student life at tmci"
                class="w-full object-cover h-[332px]"
              />
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <LazyCommonDownloadApp class="bg-white !pt-0" />
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useApi } from '~/composables/useApi'
import type { IAdmissionInfo } from '~/types/admission/index.types'
import type { StudentFacilite } from '~/types/common'

const { t } = useI18n()
const loading = ref(true)
const facilities = ref<StudentFacilite[]>()

const fetchFacilities = () => {
  loading.value = true
  useApi()
    .$get<IAdmissionInfo>(`/student-life/facilities/`)
    .then((data) => {
      facilities.value = data.results
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  fetchFacilities()
})

const routes = [
  {
    name: t('student_life.nav.student_life'),
    path: ''
  },
  {
    name: t('student_life.nav.student_facilities'),
    path: '/student-life/facilities'
  }
]
</script>
