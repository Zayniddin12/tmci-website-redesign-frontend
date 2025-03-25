<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'
import type { IProgram } from '~/types/about/index.types'

const { t } = useI18n()
const route = useRoute()
const store = useAboutStore()
const loading = ref(true)
const programs = ref<IProgram>()

const routes = computed(() => {
  return [
    {
      name: t('programs'),
      path: '/programs',
    },
    {
      name: programs.value?.title,
      path: '/programs/12',
    },
  ]
})

onMounted(() => {
  store.fetchProgramList(String(route?.params?.slug)).then((res) => {
    programs.value = res
    loading.value = false
  })
})
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />

    <div>
      <div class="container">
        <BaseSkeleton
          width="380px"
          height="32px"
          :loading
          border-radius="16px"
          preloader-class="mb-6"
        >
          <h2 v-if="programs?.title" class="title-style mt-4 md:mt-0">
            {{ programs?.title }}
          </h2>
        </BaseSkeleton>

        <div
          class="mt-4 sm:mt-6 mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 flex-wrap gap-3 sm:gap-5"
        >
          <template v-if="loading">
            <BaseSkeleton
              v-for="i in 6"
              :key="i"
              width="100%"
              height="284px"
              border-radius="24px"
              v-bind="{ loading }"
            />
          </template>

          <template v-else-if="programs?.programs?.length">
            <CardProgramMain
              v-for="(item, i) in programs?.programs"
              :key="i"
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
        <!--        <div class="w-full text-center">-->
        <!--          <BaseButton :text="$t('apply')" class="min-w-[164px] max-w-max" />-->
        <!--        </div>-->
      </div>
    </div>

    <div class="pt-[160px]">
      <CommonDownloadApp />
    </div>
  </div>
</template>

<style></style>
