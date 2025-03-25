<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import type { IPostSingle } from '~/types/home.types'

const { t } = useI18n()
const route = useRoute()
const routes = computed(() => {
  return [
    {
      name: t('menu.life_at_tmc'),
      path: '/',
    },

    {
      name: t('news'),
      path: '/life-at-tmc/news',
    },

    {
      name: data.value?.title,
      path: '/life-at-tmc/news',
    },
  ]
})

const { data } = await useAsyncData('newsSingle', () =>
  useApi().$get<IPostSingle>(`/post/${route.params.slug}`)
)

useSeoMeta({
  title: data.value?.category?.title,
  ogTitle: data?.value?.category?.title,
  description: richTextPurify(data.value?.description, 200),
  ogDescription: richTextPurify(data.value?.description, 200),
  ogImage: data.value?.image?.s100x100,
  twitterImage: data.value?.image?.s100x100,
  twitterTitle: data.value?.category?.title,
  twitterDescription: richTextPurify(data.value?.description, 200),
})
</script>

<template>
  <div>
    <BaseBreadcrumb
      body-class="!bg-transparent hidden-print"
      v-bind="{ routes }"
    />
    <div class="container">
      <CommonImage
        v-if="data?.image?.s1000x1000"
        :src="data?.image?.s1000x1000"
        alt="data news image"
        image-class="rounded-3xl mx-auto mt-1.5 md:mt-3 mb-3 md:mb-11 overflow-hidden object-cover w-full block max-w-[984px] aspect-[984/540]"
      />
      <div class="mx-auto w-full max-w-[782px]">
        <h2 v-if="data?.title" class="base-title-style mb-4">
          {{ data?.title }}
        </h2>
        <div
          v-if="data?.published_at"
          class="flex items-center gap-1 text-gray mb-2 md:mb-6"
        >
          <span class="icon-calendar-event text-xl" />
          <span class="font-medium text-sm">{{
            dayjs(data?.published_at).format('DD.MM.YYYY')
          }}</span>
        </div>
        <div class="mb-3 md:mb-6">
          <h3
            v-if="data?.description"
            class="text-lg sm:text-xl md:text-2xl font-bold mb-0.5 md:mb-2"
          >
            {{ data?.description }}
          </h3>
          <div
            v-if="data?.content"
            class="about-text text-dark text-lg font-normal leading-7"
            v-html="data?.content"
          />
        </div>

        <CommonPageActions
          v-bind="{
            title: data?.title,
            viewsCount: data?.views_count,
          }"
        />
      </div>

      <div class="my-8 md:my-16">
        <CommonBannerApply />
      </div>
    </div>

    <div class="lg:mt-[160px]">
      <CommonDownloadApp />
    </div>
  </div>
</template>

<style scoped></style>
