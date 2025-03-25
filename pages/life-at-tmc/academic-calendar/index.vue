<template>
  <div>
    <section
      :style="{
        backgroundImage: `url(${info?.main_image?.original})`,
      }"
      class="min-h-[600px] h-full relative bg-top bg-no-repeat bg-cover"
    >
      <div
        class="w-full h-full absolute bg-gradient-to-r from-[#171719] top-0 left-0"
      />

      <BaseBreadcrumb
        body-class="!bg-transparent relative z-20 !text-white"
        link-class="text-white"
        v-bind="{ routes }"
      />
      <div class="container relative z-10 flex-col flex justify-center">
        <Transition mode="out-in" name="fade">
          <CommonLoadingHero v-if="loading" />
          <div
            v-else
            class="flex flex-col lg:w-1/2 mt-16 items-center lg:items-start text-white justify-center h-full"
          >
            <h1 class="text-5xl font-bold lg:text-left text-center">
              {{ info?.title }}
            </h1>
            <p
              class="text-base mt-4 font-normal text-gray-300 lg:text-left text-center"
            >
              {{ info?.description }}
            </p>

            <button
              class="md:min-w-[164px] bg-red rounded-lg py-3 px-5 mt-11 w-fit text-white hover:bg-white hover:text-red text-base font-semibold transition-300"
            >
              Learn more
            </button>
          </div>
        </Transition>
      </div>
    </section>
    <section class="lg:pb-28 pt-0 py-10 bg-white">
      <div class="w-full bg-red lg:pl-32 py-6 pl-16">
        <p class="text-white text-2xl text-extrabold">
          {{ $t('academic_year') }}
        </p>
      </div>
      <div class="mt-9 container grid gap-2 xl:gap-9 grid-cols-12">
        <div class="col-span-12 lg:col-span-9">
          <Calendar />
        </div>
        <aside class="col-span-12 lg:col-span-3">
          <CommonBannerApply class="w-full h-full" mini />
        </aside>
      </div>
    </section>
    <LazyCommonDownloadApp class="bg-white" />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const loading = ref(false)
const info = ref()
const api = useApi()
const routes = [
  {
    name: t('menu.life_at_tmc'),
    path: '',
  },
  {
    name: t('academic_calendar'),
    path: '',
  },
]

function getPage() {
  loading.value = true
  api
    .$get('calendar-page/')
    .then((res) => {
      info.value = res
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getPage()
})
</script>
