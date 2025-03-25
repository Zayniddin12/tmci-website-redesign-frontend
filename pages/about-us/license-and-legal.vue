<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { licenses } from '~/data/data'
import { ref } from 'vue'
import { useAboutStore } from '~/store/about'
import type { ILicense, TManagement } from '~/types/about/index.types'

const { t } = useI18n()
const show = ref(false)
const loading = ref(true)
const activeItem = ref({} as ILicense)
const aboutStore = useAboutStore()
const license = computed(() => aboutStore.license as ILicense[])
const routes = [
  {
    name: t('about_us'),
    path: '/about-us',
  },
  {
    name: t('licence'),
    path: '/about-us',
  },
]

onMounted(() => {
  aboutStore.fetchLicense().then(() => {
    loading.value = false
  })
})

const getLicense = (doc: ILicense) => {
  activeItem.value = doc
  show.value = true
}
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />

    <div class="container pb-8 sm:pb-10 md:pb-16">
      <h1 class="title-style my-3">
        {{ $t('licence') }}
      </h1>
      <p class="text-gray text-sm sm:text-base">
        {{ $t('tmc_leaders_text') }}
      </p>

      <div class="my-6 flex flex-col">
        <div v-if="loading" class="flex flex-col gap-6">
          <BaseSkeleton
            v-for="i in 3"
            :key="i"
            width="100%"
            height="284px"
            border-radius="24px"
            v-bind="{ loading }"
          />
        </div>
        <template v-else-if="licenses?.length">
          <div v-for="(item, idx) in license" :key="idx">
            <CardCertificate
              :doc="{
                image: item?.image?.s500x500,
                title: item?.title,
                subtitle: item?.description,
                file: item?.pdf,
              }"
              @show="getLicense(item)"
            />
            <div
              v-if="idx < licenses?.length - 1"
              class="my-4 bg-gray-300 w-full md:w-[73%] ml-auto h-[1px]"
            ></div>
          </div>
        </template>
        <CommonNoData
          v-else
          class="w-full text-center col-span-12 mt-6 md:mt-10"
          :title="$t('license_not_found')"
        />
      </div>
    </div>

    <div class="lg:mt-16">
      <CommonDownloadApp />
    </div>

    <CommonModal
      v-bind="{ show }"
      no-header
      body-class="!bg-transparent !overflow-visible !max-w-[312px]"
      has-close-icon
      @close="show = false"
    >
      <div v-if="activeItem">
        <CommonImage
          :src="activeItem?.image?.s500x500"
          alt="license image"
          image-class="w-full h-full max-w-[312px] object-cover rounded-2xl overflow-hidden max-h-[440px] aspect-[312/440]"
        />
      </div>
    </CommonModal>
  </div>
</template>

<style scoped></style>
