<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store/home'
import type { IEvents } from '~/types/home.types'

const { t } = useI18n()
const store = useHomeStore()
const events = computed(() => store.events as IEvents[])
const hasNext = computed(() => store.hasNextEvents)
const allEvents = ref<IEvents[]>([])
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
    name: t('events'),
    path: '/life-at-tmc/events',
  },
]

function loadMore() {
  buttonLoading.value = true
  params.offset += params.limit
  store.fetchEvents(params)
}

onMounted(() => {
  store.fetchEvents(params).finally(() => {
    loading.value = false
  })
})

watch(
  events,
  () => {
    allEvents.value.push(...events.value)
  },
  { deep: true }
)
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <div class="container pb-10 md:pb-16">
      <h1 class="title-style mb-2 sm:mb-3 md:mb-6 mt-3">
        {{ $t('events') }}
      </h1>
      <div
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
      >
        <template v-if="loading">
          <CardEvent
            v-for="i in 12"
            :key="i"
            class="bg-white hover:!bg-white"
            :loading
          />
        </template>

        <template v-else-if="allEvents.length">
          <CardEvent
            v-for="(item, i) in allEvents"
            :key="i"
            class="bg-white hover:!bg-white"
            :card="{
              title: item?.title,
              content: item?.description,
              date: item?.event_date,
              link: item?.slug,
            }"
          />
        </template>

        <CommonNoData
          v-else
          class="w-full text-center col-span-12 mt-6 md:mt-10"
          :title="$t('events_not_found')"
        />
      </div>
      <div
        v-if="!loading && allEvents.length && hasNext"
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

<style scoped></style>
