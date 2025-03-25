<script lang="ts" setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'
import type { AntiCorruption } from '~/types/about/index.types'

const { t } = useI18n()
const aboutStore = useAboutStore()
const antiCorruption = ref<AntiCorruption>()
const loading = ref(true)
const routes = [
  {
    name: t('about_us'),
    path: '/about-us',
  },
  {
    name: t('anti_corruption'),
    path: '/about-us',
  },
]

onMounted(() => {
  aboutStore.fetchAntiCorruption().then((res) => {
    antiCorruption.value = res
    loading.value = false
  })
})
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <div>
      <div
        v-if="
          antiCorruption && antiCorruption?.title && antiCorruption?.content
        "
        class="container grid grid-cols-12 gap-4 md:gap-5 w-full md:mt-3 pb-6 sm:pb-10 md:pb-16"
      >
        <div class="col-span-12 md:col-span-9">
          <BaseSkeleton
            :loading
            border-radius="12px"
            height="55px"
            preloader-class="mb-5"
            width="330px"
          >
            <h1 class="title-style mt-3 mb-3 md:mb-6">
              {{ antiCorruption?.title }}
            </h1>
          </BaseSkeleton>

          <BaseSkeleton
            :loading
            border-radius="16px"
            height="400px"
            width="100%"
          >
            <div
              v-if="antiCorruption?.content"
              class="about-text"
              v-html="antiCorruption?.content"
            />
          </BaseSkeleton>
        </div>

        <div class="col-span-12 md:col-span-3 shrink-0">
          <BaseSkeleton
            :loading
            border-radius="12px"
            height="250px"
            width="330px"
          >
            <card-anti-corruption
              :card="{
                title: antiCorruption?.department?.title,
                subtitle: antiCorruption?.department?.info,
                time: antiCorruption?.department?.application_time,
                phone: antiCorruption?.department?.phone_number,
                email: antiCorruption?.department?.email,
              }"
            />
          </BaseSkeleton>
        </div>
      </div>

      <CommonNoData
        v-else
        class="w-full text-center col-span-12 mt-6 md:mt-10"
        :title="$t('no_anticorruption_data')"
      />
    </div>

    <div class="mt-10 lg:mt-[160px]">
      <CommonDownloadApp />
    </div>
  </div>
</template>

<style scoped></style>
