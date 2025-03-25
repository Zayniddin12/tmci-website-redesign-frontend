<script lang="ts" setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'
import type { IStaticPage } from '~/types/about/index.types'

const { t } = useI18n()
const store = useAboutStore()
const staticPage = ref<IStaticPage>()
const loading = ref(true)
const virtual = ref({
  title: '',
  content: '',
  main_image: null,
  action_name: null,
  action_url: null,
})

const routes = computed(() => [
  {
    name: t('about_us'),
    path: '/about-us',
  },
  {
    name: t('campus_and_facilities'),
    path: '/about-us',
  },
])

const imagesList = computed(() => {
  const mappedImages = staticPage.value?.gallery?.map((img) => ({
    media_type: 'image',
    image: img?.image,
  }))

  if (mappedImages?.length) {
    return [...mappedImages, ...mappedImages]
  } else {
    return mappedImages
  }
})

onMounted(() => {
  fetchVirtualTour()
  store.fetchStaticPage('static/campus/').then((res) => {
    staticPage.value = res
    loading.value = false
  })
})

function fetchVirtualTour() {
  useApi()
    .$get('student-life/virtual-tour/')
    .then((res) => (virtual.value = res))
}
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <div class="!bg-white">
      <div class="bg-gray-100">
        <div class="container">
          <div class="max-w-[782px] w-full mx-auto mt-3 pb-10 sm:pb-16">
            <BaseSkeleton
              :loading
              border-radius="12px"
              height="55px"
              preloader-class="mb-5"
              width="100%"
            >
              <h1 class="title-style text-center mt-3 mb-3 md:mb-6">
                {{ staticPage?.title }}
              </h1>
            </BaseSkeleton>

            <BaseSkeleton
              :loading
              border-radius="12px"
              height="400px"
              width="100%"
            >
              <div
                v-if="staticPage?.description"
                class="about-text"
                v-html="staticPage?.description"
              />
            </BaseSkeleton>
          </div>
        </div>
      </div>

      <div
        v-if="loading || staticPage?.gallery?.length"
        class="bg-white py-10 md:py-16"
      >
        <BaseSkeleton
          :loading
          border-radius="12px"
          height="55px"
          preloader-class="mb-4"
          width="40%"
        >
          <h2 class="base-title-style container mb-4 md:mb-6">
            {{ $t('gallery') }}
          </h2>
        </BaseSkeleton>

        <BaseSkeleton :loading border-radius="12px" height="270px" width="100%">
          <Gallery :list="imagesList" />
        </BaseSkeleton>
      </div>

      <div class="p-4">
        <BaseSkeleton :loading border-radius="20px" height="250px">
          <CommonCardVirtual v-bind="virtual" />
        </BaseSkeleton>
      </div>

      <div class="md:mt-10 lg:mt-[94px]">
        <CommonDownloadApp />
      </div>
    </div>
  </div>
</template>
