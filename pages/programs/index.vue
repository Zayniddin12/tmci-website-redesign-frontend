<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useAboutStore } from '~/store/about'
import type { IProgram, ISelectList } from '~/types/about/index.types'

const store = useAboutStore()
const loading = ref(false)
const programs = ref<IProgram[]>([])
const route = useRoute()
const activeTab = ref(route.query.faculty || '')
const activeTabSlug = ref(route?.query?.faculty ?? '')
const { data } = await useAsyncData(
  'ProgramList',
  () => useApi().$get('program/faculties-programs/')
  // store.fetchStaticPage('program/faculties-list/')
)

const tabs = computed(() => data.value?.results as ISelectList[])

watch(
  () => tabs.value,
  (value) => {
    if (value?.length && !activeTab.value) {
      activeTab.value = value[0]
      activeTabSlug.value = value[0].slug
      programs.value = value[0].programs
    }
  },
  {
    immediate: true,
    deep: true,
  }
)

watch(
  () => activeTabSlug.value,
  (newVal) => {
    if (newVal) {
      activeTab.value = tabs.value.find((tab) => tab.slug === newVal)
      programs.value = activeTab.value.programs
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <div class="bg-gray-100 py-10 sm:py-12 md:py-16">
      <div class="container flex flex-col items-center">
        <div class="space-y-1">
          <h2 class="title-style text-center">
            {{ $t('undergraduate_programs') }}
          </h2>
          <p class="content-style text-center pt-0.5">
            {{ $t('international_programs') }}
          </p>
        </div>

        <BaseTab
          v-model="activeTabSlug"
          class="mt-6"
          :list="tabs"
          clickable
          parent-class="!border-b-4"
          active-class="!h-1 !rounded-none"
          button-class="sm:text-xl !mb-2 text-gray"
          item-class="hover:text-red duration-200"
        />

        <Transition name="fade" mode="out-in">
          <div :key="activeTabSlug as string" class="w-full">
            <div
              class="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 flex-wrap gap-5 w-full"
            >
              <!--              <template v-if="loading">-->
              <!--                <BaseSkeleton-->
              <!--                  v-for="i in 3"-->
              <!--                  :key="i"-->
              <!--                  width="100%"-->
              <!--                  height="247px"-->
              <!--                  border-radius="24px"-->
              <!--                  :loading-->
              <!--                />-->
              <!--              </template>-->

              <template v-if="programs?.length">
                <CardProgramMain
                  v-for="(item, i) in programs"
                  :key="item.title"
                  class="w-full"
                  :card="{
                    title: item?.title,
                    subtitle: item?.education_level,
                    content: item?.description,
                    link: item?.slug,
                  }"
                />
              </template>

              <CommonNoData
                v-else
                class="w-full mt-10 col-span-12 md:mt-16"
                :title="$t('programs_not_found')"
              />
            </div>
          </div>
        </Transition>
        <!--        <BaseButton-->
        <!--          :text="$t('see_more')"-->
        <!--          :loading="loading"-->
        <!--          :disabled="loading"-->
        <!--          class="min-w-[164px] max-w-max"-->
        <!--          @click="loadMore"-->
        <!--        />-->
      </div>
    </div>

    <div class="pt-16">
      <CommonDownloadApp />
    </div>
  </div>
</template>
