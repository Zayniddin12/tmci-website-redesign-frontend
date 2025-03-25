<script lang="ts" setup>
import dayjs from 'dayjs'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useHomeStore } from '~/store/home'

const store = useHomeStore()
const route = useRoute()
const { t, locale } = useI18n()
const single = computed(() => store.singleProgram)
const loading = ref(true)
const routes = computed(() => {
  return [
    {
      name: t('menu.programs'),
      path: '/programs'
    },
    {
      name: single.value?.title,
      path: '/programs/12'
    }
  ]
})

const studyFormats = computed(() => {
  const studyFormats = single.value?.study_formats
  const formatLists = [] as {
    title: string
    subtitle: string
    subClass?: string
  }[]

  watch(locale, (newLocale) => {
    dayjs.locale(newLocale)
    console.log(dayjs.locale(newLocale))
  })

  studyFormats?.forEach((format) => {
    formatLists.push({
      title: t('edu_type'),
      subtitle: format?.study_format,
      subClass: 'capitalize'
    })
    formatLists.push({
      title: t('period_education'),
      subtitle: `${format?.education_period} ${format?.education_period == 1 ? t('year') : t('years')}`
    })
    formatLists.push({
      title: t('lang'),
      subtitle: format?.education_languages
    })
    formatLists.push({
      title: t('classes_start'),
      subtitle: dayjs(format?.next_admission).locale(locale.value).format('MMMM, YYYY')
    })
    formatLists.push({
      title: t('contract_price'),
      subtitle: `${formatNumberSpace(+format?.price)} UZS`,
      subClass: '!text-red'
    })
  })

  return formatLists.map((_, idx) => {
    return formatLists.slice(idx * 5, (idx + 1) * 5)
  })
})

onMounted(() => {
  store.fetchProgramsSingle(String(route.params.slug)).finally(() => {
    loading.value = false
  })
})
</script>

<template>
  <div>
    <BaseBreadcrumb class="!bg-transparent" v-bind="{ routes }" />
    <div class="bg-gray-100 pt-3 pb-5 md:pb-[115px]">
      <div class="container">
        <div class="relative">
          <BaseSkeleton
            :loading
            border-radius="16px"
            height="32px"
            preloader-class="mb-6"
            width="380px"
          >
            <h2 class="title-style mb-6">
              {{ single?.title }}
            </h2>
          </BaseSkeleton>

          <BaseSkeleton
            :loading
            border-radius="12px"
            height="220px"
            preloader-class="!w-full md:absolute -bottom-[56%] mt-5 md:mt-0"
            width="100%"
          >
            <CardAboutFaculty
              :card="{
                image: single?.icon,
                title: single?.card_title,
                subtitle: single?.card_description,
              }"
              :loading
              class="!w-full md:-mb-[20%] mt-5 md:mt-0"
            />
          </BaseSkeleton>
        </div>
      </div>
    </div>

    <div class="bg-white md:pt-[156px] pt-[24px] md:pb-[78px] pb-7 ">
      <div class="container space-y-4">
        <BaseSkeleton
          v-for="(data, idx) in studyFormats"
          :key="idx"
          :loading
          border-radius="12px"
          class="flex flex-col gap-6 mb-6"
          height="80px"
          width="100%"
        >
          <section v-if="data?.length" class="flex justify-between gap-6">
            <CardProgramSingle class="bg-gray-100 !w-full" v-bind="{ list: data }" />
          </section>
        </BaseSkeleton>

        <div class="grid gap-5 md:grid-cols-2 mt-5 md:mt-16 pb-5 md:pb-8">
          <div class="space-y-5">
            <CardInfo
              :info="{
                icon: 'icon-book text-red text-2xl sm:text-3xl',
                title: $t('requirements'),
                content: single?.requirements,
              }"
            />
            <CardInfo
              :info="{
                icon: 'icon-user-circle text-red text-2xl sm:text-3xl',
                title: $t('who_can_apply'),
                content: single?.who_can_apply,
              }"
            />
          </div>
          <CardInfo
            :info="{
              icon: 'icon-briefcase text-red text-2xl sm:text-3xl',
              title: $t('career_opportunities'),
              content: single?.career_opportunities,
            }"
          />
        </div>

        <CommonBannerApply />
      </div>
      <div class="container mt-6">
        <h2 class="title-style mx-auto text-center">
          {{ $t('course_content') }}
        </h2>
        <BaseSkeleton :loading border-radius="24px" height="250">
          <LazyFaq :faqs=" single?.contents" class="mx-auto" />
        </BaseSkeleton>
      </div>
    </div>
    <div class="w-full md:h-20 bg-white" />
    <CommonDownloadApp class="bg-white" />
  </div>
</template>

<style></style>
