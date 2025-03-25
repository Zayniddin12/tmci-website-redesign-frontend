<template>
  <main>
    <section
      :style="{
        backgroundImage: `url(${info.main_image?.original})`,
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
    <section class="container my-16">
      <Transition mode="out-in" name="fade">
        <CommonLoadingContent v-if="loading" />
        <article v-else class="article custom" v-html="info.content" />
      </Transition>
    </section>
    <section class="container my-16">
      <div class="">
        <h2 class="font-extrabold text-4.5xl mb-6">
          {{ $t('student_life.internship.student_success_stories') }}
        </h2>
        <Transition mode="out-in" name="fade">
          <div v-if="loading" class="flex flex-col gap-5">
            <CommonLoadingCardSuccessStory
              v-for="idx in 2"
              :key="idx"
              :reversed="idx % 2 > 0"
            />
          </div>
          <div v-else class="flex flex-col gap-5 items-center">
            <CommonCardSuccessStory
              v-for="(story, idx) in info.success_stories"
              :key="idx"
              :reversed="idx % 2 > 0"
              v-bind="story"
            />
          </div>
        </Transition>
      </div>
    </section>

    <section class="bg-white pt-16 pb-48">
      <div class="container flex flex-col items-center">
        <div class="mb-8 max-w-[782px]">
          <h2 class="text-[40px] font-extrabold capitalize text-center">
            {{ t('faq.title') }}
          </h2>
          <p class="text-base font-normal text-center whitespace-pre-line">
            {{ t('faq.subtitle') }}
          </p>
        </div>
        <Transition mode="out-in" name="fade">
          <div v-if="loading" class="grid gap-3 w-full max-w-screen-md">
            <CommonLoadingCardFaq v-for="list in 4" :key="list" />
          </div>
          <Faq v-else :home="false" :faqs="info?.faqs" />
        </Transition>
      </div>
    </section>

    <LazyCommonDownloadApp class="bg-white !pt-0" />
  </main>
</template>

<script lang="ts" setup>
import Faq from '~/components/Faq.vue'
import type { IWorkAndTravel } from '~/types/common'

const { t } = useI18n()
const loading = ref(true)
const info = ref<IWorkAndTravel>({} as IWorkAndTravel)

function getInfo() {
  useApi()
    .$get<IWorkAndTravel>(`/student-life/work-and-travel/`)
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
    name: t('student_life.nav.work_and_travel'),
    path: '/student-life/work-and-travel',
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
article.custom strong {
  display: block;
  margin-bottom: 16px !important;
}
.custom p, .custom span {
  font-size: 18px;
}
</style>
