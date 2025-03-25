<template>
  <main class="pt-4">
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
              {{ purifyDOMContent(info?.content) }}
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
    <section class="bg-white pt-16 pb-48 md:pb-0 md:pt-0">
      <div class="container flex flex-col items-center md:items-start">
        <img :src="info?.map_image?.original" alt="partners map" />
      </div>
    </section>
    <section class="bg-white pt-16 pb-48">
      <div class="container flex flex-col items-center">
        <div class="mb-8 max-w-[782px]">
          <h2 class="text-[40px] font-extrabold capitalize text-center">
            {{ t('partner_universities.title') }}
          </h2>
          <p class="text-base font-normal text-center whitespace-pre-line">
            {{ t('partner_universities.subtitle') }}
          </p>
        </div>
        <Transition mode="out-in" name="fade">
          <div v-if="loading" class="grid gap-3 w-full max-w-screen-md">
            <CommonLoadingCardFaq v-for="list in 4" :key="list" />
          </div>
          <LazyFaq
            v-else
            :home="false"
            :faqs="info?.faqs"
          />
        </Transition>
      </div>
    </section>

    <LazyCommonDownloadApp class="bg-white !pt-0" />
  </main>
</template>

<script lang="ts" setup>
import type { ICamp } from '~/types/common'

const { t } = useI18n()
const loading = ref(true)
const info = ref<ICamp>({} as ICamp)

function getInfo() {
  useApi()
    .$get<ICamp>(`/student-life/partner-universities/`)
    .then((response) => {
      info.value = response
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getInfo()
})

const routes = [
  {
    name: t('student_life.nav.student_life'),
    path: '',
  },
  {
    name: t('student_life.nav.internship'),
    path: '/student-life/internship',
  },
]
</script>

<style>
.article {
  & strong {
    @apply text-2xl font-medium;
  }

  & p:has(strong) {
    @apply my-2;
  }

  & p:has(strong) ~ p:not(:has(strong)),
  & ul {
    @apply font-georgia leading-[160%];
  }

  & ul li {
    @apply list-disc ml-6;
  }
}
</style>
