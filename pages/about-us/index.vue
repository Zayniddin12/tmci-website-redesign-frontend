<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'
import type { IDefaultResponse } from '~/types'
import type { ILicense, IMoreInfo, TAbout } from '~/types/about/index.types'

const aboutStore = useAboutStore()
const { t } = useI18n()
const about = ref<TAbout>()
const info = ref<IMoreInfo[]>([])
const awards = ref()
const awardsLoading = ref(true)

const loading = ref(true)
const isVideoModalOpen = ref(false)

const imagesList = computed(() => {
  const mappedImages = awards.value?.slider_items?.map((img) => ({
    media_type: img?.media_type,
    image: img?.url,
  }))

  if (mappedImages?.length) {
    return [...mappedImages, ...mappedImages]
  } else {
    return mappedImages
  }
})
const license = computed(() => aboutStore.license as ILicense[])
const routes = [
  {
    name: t('about_us'),
    path: '/about-us',
  },
]

onMounted(() => {
  aboutStore.fetchAbout().then((res) => {
    about.value = res
    loading.value = false
  })
  fetchMoreInfo()
  fetchAwards()
  aboutStore.fetchLicense()
})

function fetchMoreInfo() {
  useApi()
    .$get<IDefaultResponse<IMoreInfo>>('/main/about/more-info/')
    .then((res) => {
      info.value = res.results
    })
}

function fetchAwards() {
  useApi()
    .$get('/main/awards-and-achievements/')
    .then((response) => {
      awards.value = response
    })
    .finally(() => (awardsLoading.value = false))
}

useSeoMeta({
  title: about.value?.about_title,
  description: richTextPurify(about.value?.about_description ?? ''),
  ogImage: about.value?.site_logo,
  ogTitle: about.value?.about_title,
  ogDescription: richTextPurify(about.value?.about_description ?? ''),
  twitterTitle: about.value?.about_title,
  twitterDescription: richTextPurify(about.value?.about_description ?? ''),
})
</script>

<template>
  <div class="bg-white">
    <BaseBreadcrumb v-bind="{ routes }" />
    <div>
      <AboutMain :data="about" :loading />

      <AboutMilestones :about :loading />
      <LazyAboutMoreInfo
        v-for="item in info"
        :key="item?.title"
        :loading
        v-bind="item"
        @open-video="isVideoModalOpen = true"
      />

      <CommonPrograms has-banner />

      <section class="bg-white py-8 md:py-16">
        <h2 class="text-xl md:text-3xl font-medium mb-6 container">
          {{ awards?.title }}
        </h2>

        <article
          class="article container mb-4 md:mb-8"
          v-html="awards?.description"
        />

        <BaseSkeleton :loading border-radius="12px" height="350px" width="100%">
          <Gallery :list="imagesList" />
        </BaseSkeleton>
      </section>

      <div class="container">
        <AboutLicence v-if="license?.length" :license />

        <div class="pb-8 md:py-16">
          <CommonHaveQuestions />
        </div>
      </div>

      <div class="lg:mt-[160px]">
        <CommonDownloadApp />
      </div>
    </div>

    <CommonModalVideo
      :link="info?.[0]?.video"
      :show="isVideoModalOpen"
      @close="isVideoModalOpen = false"
    />
  </div>
</template>
