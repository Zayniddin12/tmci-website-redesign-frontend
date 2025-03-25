<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'
import type { TManagement } from '~/types/about/index.types'

const { t } = useI18n()
const { handleError } = useHandleError()
const loading = ref(true)
const buttonLoading = ref(false)
const aboutStore = useAboutStore()
const allManagement = ref<TManagement[]>([])

const getManagement = async (limit: number, offset: number) => {
  try {
    const data = await aboutStore.fetchManagement(limit, offset)
    allManagement.value.push(...data)
    loading.value = false
    buttonLoading.value = false
  } catch (error) {
    handleError(error)
    loading.value = false
  }
}

const hasNext = computed(() => aboutStore?.managementNext)

function loadMore() {
  buttonLoading.value = true
  getManagement(9, allManagement.value.length)
}

onMounted(() => {
  getManagement(9, 0)
})
</script>

<template>
  <div>
    <BaseBreadcrumb
      body-class="!bg-transparent"
      v-bind="{
        routes: [{ name: t('management_and_staff'), path: '/about-us' }],
      }"
    />

    <div class="container pb-8 sm:pb-10 md:pb-16">
      <h1 class="title-style mt-3 mb-3 md:mb-6">
        {{ $t('management_and_staff') }}
      </h1>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
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

        <template v-else-if="allManagement?.length">
          <CardStuff
            v-for="(item, i) in allManagement"
            :key="i"
            :stuff="{
              image: item?.photo?.s500x500,
              name: item?.full_name,
              job: item?.position,
              time: item?.application_time,
              phone: item?.phone_number,
              email: item?.email,
              slug: item?.slug,
            }"
          >
          </CardStuff>
        </template>

        <CommonNoData
          v-else
          class="w-full text-center col-span-12 mt-6 md:mt-10"
          :title="$t('managements_not_found')"
        />
      </div>

      <div
        v-if="hasNext && !loading && allManagement?.length"
        class="w-full text-center mt-6 sm:mt-8"
      >
        <BaseButton
          type="button"
          :text="$t('see_more')"
          class="min-w-[164px] max-w-max"
          :loading="buttonLoading"
          :disabled="buttonLoading"
          @click="loadMore"
        />
      </div>
    </div>

    <div class="lg:mt-[160px]">
      <CommonDownloadApp />
    </div>
  </div>
</template>

<style scoped></style>
