<template>
  <main>
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
    <section class="py-16 bg-white">
      <div class="container">
        <h2 class="font-extrabold text-4.5xl mb-6">
          {{ $t('student_life.camps.instruction') }}
        </h2>
        <IntershipInternshipSectionSteps
          v-bind="{ steps: info?.instructions, loading }"
        />
      </div>
    </section>
    <section class="flex flex-col container py-16">
      <h2 class="text-2xl font-bold mb-2">
        {{ $t('student_life.camps.title') }}
      </h2>
      <Transition mode="out-in" name="fade">
        <div v-if="loading">
          <div
            v-for="line in 3"
            :key="line"
            class="w-full skeleton rounded h-4"
          />
        </div>
        <p
          v-else
          class="mt-2 text-lg leading-7 !font-normal [&>p]:font-normal"
          v-html="info?.content"
        />
      </Transition>
      <Transition mode="out-in" name="fade">
        <div
          v-if="loading"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5 min-h-72"
        >
          <div v-for="card in 4" :key="card" class="skeleton rounded" />
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5"
        >
          <div v-for="image in info?.images" :key="image" >
            <img :src="image.original" alt="image" class="object-cover h-full w-full">
          </div>
        </div>
      </Transition>
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
          <Faq v-else :home="false" :faqs="info?.faqs"/>
        </Transition>
      </div>
    </section>

    <LazyCommonDownloadApp class="bg-white !pt-0" />
  </main>
</template>

<script lang="ts" setup>
import Faq from '~/components/Faq.vue'
import type { ICamp } from '~/types/common'

const { t } = useI18n()
const loading = ref(true)
const info = ref<ICamp>({} as ICamp)

function getInfo() {
  useApi()
    .$get<ICamp>(`/student-life/camp/`)
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

const routes = computed(() => [
  {
    name: t('student_life.nav.student_life'),
    path: '',
  },
  {
    name: t('student_life.nav.camps'),
    path: '/student-life/work-and-travel',
  },
])
</script>
