<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'
import type { IOfficeOfRector } from '~/types/about/index.types'

const { t } = useI18n()
const store = useAboutStore()
const rector = ref<IOfficeOfRector>()
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
  store.fetchRector().then((res) => {
    rector.value = res
    loading.value = false
  })
})
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <div class="container">
      <h1 class="title-style mt-3 mb-3 md:mb-6">
        {{ rector?.title || $t('office_of_rector') }}
      </h1>
      <CardProgramHead
        :card="{
          title: rector?.card_title,
          content: rector?.card_description,
          image: rector?.rector?.photo?.s500x500,
          phone: rector?.rector?.phone_number,
          name: rector?.rector?.full_name,
          job: rector?.rector?.position,
          time: rector?.rector?.application_time,
          email: rector?.rector?.email,
          socials: {
            instagram: rector?.instagram,
            telegram: rector?.telegram,
            linkedin: rector?.linkedin,
            facebook: rector?.facebook,
          },
        }"
        :loading
      />

      <div class="max-w-[782px] w-full mx-auto mt-4 md:mt-11 mb-8">
        <BaseSkeleton width="139px" height="38px" :loading border-radius="12px">
          <h3
            v-if="rector?.rector?.biography"
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
            v-if="rector?.rector?.biography"
            class="about-text"
            v-html="rector?.rector?.biography"
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
