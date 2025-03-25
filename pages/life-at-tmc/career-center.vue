<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'
import type { IStaticPage } from '~/types/about/index.types'

const { t } = useI18n()
const store = useAboutStore()
const routes = [
  {
    name: t('menu.life_at_tmc'),
    path: '/',
  },
  {
    name: t('career_center'),
    path: '/about-us',
  },
]

const { data } = useAsyncData('career', () =>
  store.fetchStaticPage('static/career-center/')
)

const single = computed(() => data.value as IStaticPage)
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <div class="!bg-white">
      <div class="bg-gray-100">
        <div class="container">
          <div class="max-w-[782px] w-full mx-auto mt-3 sm:pb-8 md:pb-10 pb-16">
            <h1
              v-if="single?.title"
              class="title-style text-center mt-3 mb-3 md:mb-6"
            >
              {{ single.title }}
            </h1>

            <div
              v-if="single?.description"
              class="about-text"
              v-html="single?.description"
            />
          </div>
        </div>
      </div>

      <div class="bg-white">
        <div
          v-if="single?.contacts?.length"
          class="container py-8 sm:py-10 md:py-16"
        >
          <h3 class="base-title-style">{{ $t('menu.contacts') }}</h3>
          <div class="w-full grid md:grid-cols-2 gap-3 md:gap-5">
            <CardContact
              v-for="(item, i) in single?.contacts"
              :key="i"
              :contact="{
                title: item?.title,
                subtitle: item?.responsible_person,
                phone: item?.phone_number,
                time: item?.application_time,
                email: item?.email,
              }"
              divider
            />
          </div>
        </div>
      </div>

      <div class="mt-10 lg:mt-[190px]">
        <CommonDownloadApp />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
