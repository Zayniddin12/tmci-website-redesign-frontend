<script lang="ts" setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAsyncData } from '#app'
import { useAdmissionStore } from '~/store/admission'
import type { IAdmissionInfo } from '~/types/admission/index.types'

const { t } = useI18n()
const store = useAdmissionStore()
const loading = ref(true)
const single = ref<IAdmissionInfo>()
const routes = computed(() => {
  return [
    {
      name: t('menu.admissions'),
      path: '/admission',
    },

    {
      name: t('submenu.admissions.admission_this_year', {
        year: new Date().getFullYear(),
      }),
      path: '/admission',
    },
  ]
})

onMounted(() => {
  store.fetchAdmission().then((res) => {
    single.value = res
    loading.value = false
  })
})
</script>

<template>
  <div>
    <base-breadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <main class="grid grid-cols-12 gap-3 md:gap-5 container">
      <section class="col-span-12 lg:col-span-9">
        <admission-wrapper-main :title="single?.title" :loading>
          <template #content>
            <BaseSkeleton
              width="330px"
              height="55px"
              border-radius="12px"
              :loading
            >
              <base-single-page :content="single?.description" />
            </BaseSkeleton>
          </template>
        </admission-wrapper-main>
      </section>

      <aside class="col-span-12 lg:col-span-3 w-full space-y-3 md:space-y-5">
        <BaseSkeleton width="100%" height="420px" border-radius="16px" :loading>
          <common-banner-apply
            class="w-full"
            mini
            v-bind="{
              title: single?.card_title,
              description: single?.card_description,
            }"
          />
        </BaseSkeleton>
        <card-anti-corruption
            v-if="single?.anti_corruption_department && Object.keys(single?.anti_corruption_department).length"
            :card="{
              title: single?.anti_corruption_department?.title,
              subtitle: single?.anti_corruption_department?.description,
              time: single?.anti_corruption_department?.application_time,
              phone: single?.anti_corruption_department?.phone,
              email: single?.anti_corruption_department?.email,
            }"
            :loading
        />
      </aside>
    </main>

    <footer class="mt-10 lg:mt-[160px]">
      <CommonDownloadApp />
    </footer>
  </div>
</template>

<style scoped></style>
