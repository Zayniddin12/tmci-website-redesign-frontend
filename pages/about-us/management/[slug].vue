<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'
import type { TManagementSingle } from '~/types/about/index.types'

const route = useRoute()

const { t } = useI18n()
const store = useAboutStore()
const single = ref<TManagementSingle>()
const loading = ref(true)
const routes = [
  {
    name: t('about_us'),
    path: '/about-us',
  },

  {
    name: t('office_of_rector'),
    path: '/about-us',
  },
]

onMounted(() => {
  store.slug = route.params.slug
  store.fetchManagementSingle().then((res) => {
    console.log(res)
    single.value = res
    loading.value = false
  })
})
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <div class="container">
      <h1 class="title-style mt-3 mb-3 md:mb-6">
        {{ single?.card_title }}
      </h1>
      <CardProgramHead
        img-style="md:!w-[214px] w-full !h-full"
        :menagment-single="true"
        title-position="top"
        :card="{
          title: single?.card_title,
          content: single?.card_description,
          image: single?.image_src?.original,
          phone: single?.phone_number,
          name: single?.full_name,
          job: single?.position,
          time: single?.application_time,
          email: single?.email,
          socials: {
            instagram: single?.instagram,
            telegram: single?.telegram,
            linkedin: single?.linkedin,
          },
        }"
        :loading
      />

      <div class="max-w-[782px] w-full mx-auto mt-4 md:mt-11 mb-8">
        <BaseSkeleton width="139px" height="38px" :loading border-radius="12px">
          <h3
            v-if="single?.biography"
            class="font-bold mb-1 md:mb-5 text-lg sm:text-2xl md:text-[28px]"
          >
            {{ $t('biography') }}
          </h3>
        </BaseSkeleton>
        <BaseSkeleton
          width="782px"
          height="570px"
          :loading
          border-radius="12px"
        >
          <div
            v-if="single?.biography"
            class="about-text"
            v-html="single?.biography"
          />
        </BaseSkeleton>
      </div>
    </div>

    <div class="lg:mt-[160px]">
      <CommonDownloadApp />
    </div>
  </div>
</template>

<style scoped></style>
