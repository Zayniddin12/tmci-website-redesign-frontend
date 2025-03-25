<script lang="ts" setup>
import { useAboutStore } from '~/store/about'
import type { IProgram, ISelectList } from '~/types/about/index.types'

const store = useAboutStore()
const loading = ref(true)
const programs = ref<IProgram[]>([])
const activeTab = ref()
const activeTabSlug = ref('')
const tabs = ref<ISelectList[]>([])

defineProps<{
  hasBanner?: boolean
}>()

store
  .fetchStaticPage('program/faculties-programs/')
  .then((res) => {
    tabs.value = res?.results as ISelectList[]
  })
  .finally(() => (loading.value = false))

watch(
  () => tabs.value,
  (value) => {
    if (value?.length) {
      activeTab.value = value[0]
      activeTabSlug.value = value[0].slug
      programs.value = value[0].programs
    }
  },
  { immediate: true, deep: true }
)

watch(
  () => activeTabSlug.value,
  (val) => {
    if (val) {
      activeTab.value = tabs.value.find((tab) => tab.slug === val)
      programs.value = activeTab.value.programs
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="py-4 sm:py-16 px-4">
    <div class="bg-gray-100 py-8 sm:py-12 md:py-16">
      <div class="container flex flex-col items-center">
        <div class="space-y-1">
          <h2 class="title-style text-center">
            {{ $t('undergraduate_programs') }}
          </h2>
          <p class="content-style text-center">
            {{ $t('international_programs') }}
          </p>
        </div>

        <BaseTab
          v-if="tabs?.length"
          v-model="activeTabSlug"
          :default-tab="activeTabSlug"
          :list="tabs"
          active-class="!h-1 !rounded-none"
          button-class="!text-sm sm:!text-xl !mb-2 text-gray"
          class="mt-6 max-sm:w-full overflow-x-auto"
          clickable
          item-class="hover:text-red duration-200"
          parent-class="!border-b-4"
        />

        <Transition mode="out-in" name="fade">
          <div :key="activeTabSlug" class="w-full">
            <div
              :class="{ '!mb-10': Number(programs?.length) < 3 }"
              class="w-full my-5 md:my-8 grid sm:grid-cols-2 md:grid-cols-3 gap-5"
            >
              <template v-if="loading">
                <BaseSkeleton
                  v-for="i in 6"
                  :key="i"
                  border-radius="24px"
                  height="284px"
                  v-bind="{ loading }"
                  width="100%"
                />
              </template>
              <template v-else-if="programs?.length">
                <CardProgram
                  v-for="(item, i) in programs"
                  :key="i"
                  :card="{
                    title: item?.title,
                    description: item?.education_level,
                    image: item?.icon,
                    link: item?.slug,
                  }"
                  class="w-full hidden md:block"
                />
              </template>

              <template v-if="!loading && programs?.length">
                <CardProgramMain
                  v-for="(item, i) in programs"
                  :key="i"
                  :card="{
                    title: item?.title,
                    subtitle: item?.education_level,
                    content: item?.description,
                    link: item?.slug,
                  }"
                  class="w-full md:hidden"
                />
              </template>

              <CommonNoData
                v-if="!loading && !programs?.length"
                :title="$t('programs_not_found')"
                class="w-full text-center col-span-12 mt-6 md:mt-10"
              />
            </div>
          </div>
        </Transition>
        <nuxt-link
          v-if="!loading && Number(programs?.length) > 3"
          :class="{ 'mb-9': hasBanner }"
          :to="`/programs?faculty=${activeTab.slug}`"
          class="w-full text-center"
        >

          <BaseButton
            type="button"
            :text="$t('see_all')"
            class="w-full max-w-full md:w-auto min-w-[164px] sm:max-w-max"
          />
        </nuxt-link>
      </div>
    </div>

    <div v-if="hasBanner" class="-mt-10 sm:-mt-[66px]">
      <CommonBannerApply />
    </div>
  </div>
</template>

<style></style>
