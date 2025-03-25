<script setup lang="ts">
import type { IEvents } from '~/types/home.types'

defineProps<{
  events: IEvents[]
  news: IEvents[]
}>()
</script>

<template>
  <div class="py-8 pt-6 sm:pt-auto bg-white sm:py-12 md:py-16">
    <div class="container w-full grid grid-cols-12 gap-y-8 md:gap-x-5">
      <div v-if="news?.length" class="col-span-12 md:col-span-9">
        <h2 class="title-style mb-3 md:mb-6">{{ $t('latest_news') }}</h2>
        <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
          <CardLatestNews
            v-for="(item, i) in news"
            :key="i"
            class="w-full"
            :card="{
              title: item?.title,
              description: item?.description,
              image: item?.image?.s500x500,
              date: item?.published_at,
              link: item?.slug,
            }"
          />
        </div>

        <nuxt-link
          to="/life-at-tmc/news"
          class="w-full text-center md:text-left"
        >
          <BaseButton
            :text="$t('see_all')"
            class="min-w-[164px] w-full max-w-full lg:w-auto sm:max-w-max mt-6 md:mt-8"
          />
        </nuxt-link>
      </div>

      <div v-if="events?.length" class="col-span-12 md:col-span-3">
        <h2 class="title-style mb-4 md:mb-6">
          {{ $t('submenu.life_at_tmc.events') }}
        </h2>
        <div class="bg-transparent sm:bg-gray-100 rounded-3xl sm:p-5">
          <template v-for="(item, i) in events" :key="i">
            <CardEvent
              is-small
              :card="{
                title: item?.title,
                content: item?.description,
                date: item?.event_date,
                link: item?.slug,
              }"
            />
            <div
              v-if="i < events?.length - 1"
              class="my-2 bg-gray-200 w-[82%] sm:w-[78%] ml-auto h-[1px]"
            />
          </template>
        </div>

        <nuxt-link
          to="/life-at-tmc/events"
          class="w-full text-center md:text-left"
        >
          <BaseButton
            :text="$t('see_all')"
            class="min-w-[164px] w-full max-w-full md:w-auto sm:max-w-max mt-6 md:mt-8"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
