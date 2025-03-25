<template>
  <main>
    <section
      class="min-h-[600px] h-full relative bg-bottom bg-no-repeat bg-contain w-full bg-[url(~/assets/images/main/main-bg.svg)]"
    >
      <BaseBreadcrumb
        body-class="!bg-transparent relative z-20"
        v-bind="{ routes }"
      />
      <div class="container relative z-10 flex-col flex justify-center">
        <Transition mode="out-in" name="fade">
          <CommonLoadingHero v-if="loading" />
          <div
            v-else
            class="flex flex-col lg:max-w-screen-md mt-16 items-center lg:items-start text-dark justify-center h-full"
          >
            <h1 class="text-2.5xl font-bold lg:text-left text-center">
              {{ info?.title }}
            </h1>
            <p
              class="text-base mt-4 font-normal text-dark lg:text-left text-center"
            >
              {{ purifyDOMContent(info?.content, 100_000) }}
            </p>

            <BaseButton
              :text="$t('learn_more')"
              class="mt-4 md:mt-8"
              variant="error"
              @click="scrollToSection"
            />
          </div>
        </Transition>
      </div>
    </section>
    <section id="green-campus-section" class="py-8 md:py-16 bg-white">
      <div class="container flex flex-col gap-8">
        <!--        <Transition mode="out-in" name="fade">-->
        <!--          <div v-if="!loading">-->
        <!--            <div v-for="(content, key) in info?.contents" :key>-->
        <!--         -->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <CommonLoadingCardGreenCampus v-else />-->
        <!--        </Transition>-->

        <!--Article-->
        <Transition mode="out-in" name="fade">
          <div v-if="!loading" class="grid gap-8">
            <div v-for="(content, key) in info?.contents" :key>
              <LazyCommonCardGreenInfo
                v-if="content?.is_card"
                v-bind="content"
              />
              <CommonCardGreenCampus
                v-if="!content?.is_card"
                v-bind="content"
              />
            </div>
          </div>

          <div v-else class="grid gap-8">
            <CommonLoadingCardGreenCampus />
            <LazyCommonLoadingCardGreenInfo />
          </div>
        </Transition>
      </div>
    </section>
    <!-- Initiatives-->
    <section class="py-8 md:py-16 container">
      <h2 class="text-xl md:text-3xl font-medium mb-6">
        {{ $t('initiative') }}
      </h2>
      <Transition mode="out-in" name="fade">
        <div
          v-if="!loading"
          class="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <LazyCommonCardGreenInitiative
            v-for="(item, key) in info?.iniatives"
            :key
            v-bind="item"
          />
        </div>
        <div
          v-else
          class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <LazyCommonLoadingCardGreenInitiative v-for="key in 4" :key />
        </div>
      </Transition>
    </section>

    <section class="bg-white py-8 md:py-16">
      <h2 class="text-xl md:text-3xl font-medium mb-6 container">
        {{ buildings?.title }}
      </h2>

      <article class="article container mb-4" v-html="buildings?.content" />
      <BaseSkeleton :loading border-radius="12px" height="270px" width="100%">
        <Gallery :list="imagesList" />
      </BaseSkeleton>
    </section>

    <!--NEWS -->
    <section class="bg-white py-8 md:py-16">
      <h2 class="text-xl md:text-3xl font-medium mb-6 container">
        {{ $t('sus_news') }}
      </h2>

      <div class="relative">
        <Swiper
          :center-insufficient-slides="true"
          :centered-slides-bounds="true"
          :loop="true"
          :modules="[Navigation]"
          :navigation="{
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          }"
          :slides-per-view="'auto'"
          :space-between="10"
          class="mb-3 md:mb-8"
        >
          <SwiperSlide
            v-for="(item, key) in news"
            :key
            class="pt-4 pb-8 !w-[280px] !h-full cursor-pointer group"
          >
            <CardLatestNews
              :card="{
                ...item,
                date: item?.published_at,
                image: item?.image?.s500x500,
                link: item?.slug,
              }"
              class="w-full"
            />
          </SwiperSlide>
        </Swiper>
        <div
          class="w-full max-w-80 min-h-60 h-full bg-gradient-to-r from-white/70 to-transparent absolute left-0 top-0 hidden md:block z-10"
        />
        <div
          class="w-full max-w-80 min-h-60 h-full bg-gradient-to-r from-transparent to-white/70 absolute right-0 top-0 hidden md:block z-10"
        />
        <div class="container bg-transparent absolute-center z-50 h-10">
          <div
            class="slider-button slider-button-prev absolute left-4 md:left-2 rotate-180"
          >
            <i
              class="icon-chevron-right text-3xl hover:text-white size-10 rounded-full bg-white border border-gray-200 hover:bg-red transition-300 cursor-pointer hover:border-red grid place-items-center"
            />
          </div>
          <div
            class="slider-button slider-button-next absolute right-4 md:right-2"
          >
            <i
              class="icon-chevron-right text-3xl size-10 hover:text-white rounded-full bg-white border border-gray-200 hover:bg-red transition-300 cursor-pointer hover:border-red grid place-items-center"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/navigation'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import type { IDefaultResponse } from '~/types'
import type { IGreenCampus } from '~/types/common'
import type { IEvents } from '~/types/home.types'

const { t } = useI18n()

const loading = ref(true)
const buildingsLoading = ref(true)
const newsLoading = ref(true)
const news = ref<IEvents[]>([])
const info = ref<IGreenCampus>()
const buildings = ref()
const imagesList = computed(() => {
  const mappedImages = buildings.value?.slider_items?.map((img) => ({
    image: img?.media,
  }))

  if (mappedImages?.length) {
    return [...mappedImages, ...mappedImages]
  } else {
    return mappedImages
  }
})
const scrollToSection = () => {
  const section = document.getElementById('green-campus-section')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}
onMounted(() => {
  useApi()
    .$get<IGreenCampus>('/student-life/green-campus/')
    .then((response) => {
      info.value = response
    })
    .finally(() => (loading.value = false))

  useApi()
    .$get('/student-life/green-buildings/')
    .then((response) => {
      buildings.value = response
    })
    .finally(() => (buildingsLoading.value = false))

  useApi()
    .$get<IDefaultResponse<IEvents>>('/post/sustainabilty-news/')
    .then((response) => {
      news.value = response.results
    })
    .finally(() => (newsLoading.value = false))
})

const routes = [
  {
    name: t('about_us'),
    path: '/about-us',
  },
  {
    name: t('green_campus'),
    path: '/about-us/green-campus',
  },
]
</script>
