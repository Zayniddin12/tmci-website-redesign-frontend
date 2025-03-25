<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useLifeStore } from '~/store/life'
import type { IPostSingle } from '~/types/home.types'

const { t } = useI18n()
const route = useRoute()
const store = useLifeStore()
const routes = computed(() => {
  return [
    {
      name: t('menu.life_at_tmc'),
      path: '/',
    },

    {
      name: t('events'),
      path: '/life-at-tmc/events',
    },
    {
      name: data.value?.title,
      path: '/life-at-tmc/events',
    },
  ]
})

const settings = ref({
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1',
})
const coords = computed(() => {
  return [+data.value?.event_location_long, +data.value?.event_location_lat]
})

const { data } = useAsyncData('eventsSingle', () =>
  store.fetchPostSingle(String(route.params?.slug ?? ''))
)

const getMapInfo = computed(() => {
  return (
    data.value?.event_phone ||
    data.value?.event_email ||
    data.value?.event_web_site
  )
})

useSeoMeta({
  title: () => data.value?.category?.title,
  ogTitle: () => data?.value?.category?.title,
  description: () => richTextPurify(data.value?.description, 200),
  ogDescription: () => richTextPurify(data.value?.description, 200),
  ogImage: () => data.value?.image?.s100x100,
  twitterImage: () => data.value?.image?.s100x100,
  twitterTitle: () => data.value?.category?.title,
  twitterDescription: () => richTextPurify(data.value?.description, 200),
})
</script>

<template>
  <div>
    <BaseBreadcrumb
      body-class="!bg-transparent"
      class="print:hidden"
      v-bind="{ routes }"
    />
    <div class="container print:my-0">
      <div class="mx-auto w-full max-w-[782px]">
        <h2
          v-if="data?.title"
          class="print:block base-title-style mb-4 print:mt-0 sm:mt-3"
        >
          {{ data?.title }}
        </h2>

        <div
          v-if="data?.published_at"
          class="print:hidden flex items-center gap-1 text-gray"
        >
          <span class="icon-calendar-event text-xl" />
          <span class="font-medium text-sm">{{
            dayjs(data?.published_at).format('DD.MM.YYYY')
          }}</span>
        </div>
        <CardEventInfo
          class="print:block my-3 md:my-6"
          :event="{
            date: dayjs(data?.event_date).format('DD.MM.YYYY'),
            time: data?.event_time,
            location: data?.event_location,
            socials: {
              facebook: data?.links?.facebook_link,
              telegram: data?.links?.telegram_link,
              linkedin: data?.links?.linkedin_link,
              instagram: data?.links?.instagram_link,
              youtube: data?.links?.youtube_link,
            },
          }"
        />

        <div class="print:block print:break-after-auto print:mb-0 mb-3 md:mb-6">
          <div v-if="data?.description && data.content" class="mb-3 md:mb-6">
            <h3
              v-if="data?.description"
              class="text-lg sm:text-xl md:text-2xl font-bold mb-0.5 md:mb-2"
            >
              {{ data?.description }}
            </h3>
            <div
              v-if="data?.content"
              class="about-text"
              v-html="data?.content"
            />
          </div>

          <div
            v-if="coords"
            :key="data?.event_location_lat"
            class="mb-3 md:mb-6 print:mb-0"
          >
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold mb-0.5 md:mb-2">
              {{ $t('location') }}
            </h3>

            <div
              class="border-white border-2 md:border-4 rounded-xl md:rounded-3xl overflow-hidden"
            >
              <section class="relative">
                <MyYandexMap
                  class="!h-[400px] md:!h-max"
                  :center="coords"
                  :markers="[coords]"
                  zoom="10"
                />
                <div
                  v-if="getMapInfo"
                  class="p-5 w-full absolute bottom-0 left-0"
                >
                  <card-event-map
                    :event="{
                      phone: data?.event_phone,
                      email: data?.event_email,
                      website: data?.event_web_site,
                    }"
                  />
                </div>
              </section>
            </div>
          </div>
        </div>

        <CommonPageActions
          class="print:hidden"
          v-bind="{ title: data?.title, viewsCount: data?.views_count }"
        />
      </div>

      <div class="print:hidden my-8 md:my-16">
        <CommonBannerApply />
      </div>
    </div>

    <div class="print:hidden lg:mt-[160px]">
      <CommonDownloadApp />
    </div>
  </div>
</template>

<style>
.ymaps-2-1-79-controls__toolbar,
.ymaps-2-1-79-copyright,
.ymaps-2-1-79-zoom,
.ymaps-2-1-79-map-copyrights-promo {
  display: none !important;
}

@media print {
  @page {
    size: auto;
    margin: 20px;
  }

  #main-header,
  #main-footer,
  #default-layout {
    display: none;
  }

  #__nuxt > div {
    min-height: auto;
  }
}
</style>

<style scoped>
@media print {
  body {
    visibility: hidden;
  }

  .print\:block {
    visibility: visible;
  }
}
</style>
