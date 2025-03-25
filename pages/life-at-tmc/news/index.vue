<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store/home'
import type { IEvents } from '~/types/home.types'

const { t } = useI18n()
const store = useHomeStore()
const news = computed(() => store.news as IEvents[])
const hasNext = computed(() => store.hasNextNews)
const allNews = ref<IEvents[]>([])
const loading = ref(true)
const buttonLoading = ref(false)
const params = {
  limit: 12,
  offset: 0,
}
const routes = [
  {
    name: t('menu.life_at_tmc'),
    path: '/',
  },
  {
    name: t('news'),
    path: '/life-at-tmc/news',
  },
]

function loadMore() {
  buttonLoading.value = true
  params.offset += params.limit
  store.fetchNews(params)
  console.log(store.fetchNews(params), 'hello')
}

onMounted(() => {
  store.fetchNews(params).finally(() => {
    loading.value = false
  })
})

watch(
  news,
  () => {
    allNews.value.push(...news.value)
  },
  { deep: true }
)
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <div class="container pb-10 md:pb-16">
      <h1 class="title-style mb-2 sm:mb-3 md:mb-6 mt-3">
        {{ $t('news') }}
      </h1>
      <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        <template v-if="loading">
          <!-- Todo: loading holati uchun alohida card yasash kerak -->
          <CardLatestNews
            v-for="i in 12"
            :key="i"
            class="bg-white hover:!bg-white"
            :loading
          />
        </template>
        <template v-else-if="allNews.length">
          <CardLatestNews
            v-for="(item, i) in allNews"
            :key="i"
            class="bg-white hover:!bg-white"
            :card="{
              title: item?.title,
              description: item?.description,
              image: item?.image?.s500x500,
              date: item?.published_at,
              link: item?.slug,
            }"
          />
        </template>

        <CommonNoData
          v-else
          class="w-full text-center col-span-12 mt-6 md:mt-10"
          :title="$t('news_not_found')"
        />
      </div>
      <div
        v-if="!loading && allNews.length && hasNext"
        class="w-full text-center mt-6 sm:mt-8"
      >
        <BaseButton
            type="button"
          :text="$t('see_more')"
          class="min-w-[164px] max-w-max"
          :loading="buttonLoading"
          :disabled="buttonLoading"
          @click="loadMore"
        />
      </div>
    </div>

    <div class="lg:mt-[160px]">
      <CommonDownloadApp />
    </div>
  </div>
</template>

<!-- Todo: remove from everywhere -->
<style scoped></style>
