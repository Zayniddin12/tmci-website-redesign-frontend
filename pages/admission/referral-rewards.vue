<template>
  <div>
    <base-breadcrumb body-class="!bg-transparent" v-bind="{ routes }" />

    <main class="container">
      <section class="mx-auto w-full max-w-[782px] pb-10 md:pb-[128px]">
        <admission-card-referral-rewards
          :referral="{
            title: single?.title,
            description: single?.description,
            image: single?.image?.s500x500,
          }"
          :loading
        >
          <admission-form-referral />
        </admission-card-referral-rewards>
      </section>
    </main>

    <div class="lg:mt-[160px]">
      <CommonDownloadApp />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'
import type { IStaticPage } from '~/types/about/index.types'

const { t } = useI18n()
const store = useAboutStore()
const single = ref<IStaticPage>()
const loading = ref(true)

const routes = computed(() => {
  return [
    {
      name: t('menu.admissions'),
      path: '/admission',
    },

    {
      name: t('referral_rewards'),
      path: '/admission',
    },
  ]
})

onMounted(() => {
  store.fetchStaticPage('static/friend-referral/').then((data) => {
    single.value = data
    loading.value = false
  })
})
</script>

<style scoped></style>
