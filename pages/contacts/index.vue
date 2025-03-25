<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <div>
      <div class="bg-gray-100">
        <div class="container w-full mx-auto mt-3">
          <h1 class="title-style mt-3 mb-3 md:mb-6">
            {{ $t('menu.contacts') }}
          </h1>
        </div>

        <BaseSkeleton
          :loading
          height="440px"
          preloader-class="mb-5"
          width="100%"
        >
          <section class="relative">
            <MyYandexMap :center="coords" :markers="locations" />
            <div class="container relative">
              <div class="absolute left-4 bottom-8">
                <div
                  class="flex flex-col lg:flex-row items-center gap-3 lg:gap-10"
                >
                  <CardContact
                    v-for="(location, idx) in contactInfo?.locations"
                    :key="idx"
                    :contact="{
                      title: location?.address,
                      phone_1: location?.phone_number,
                      time: location?.operation_hours,
                      email: location?.email,
                    }"
                    class="max-w-[345px] sm:max-w-[381px] !bg-white shadow-main border border-200 z-50"
                  />
                </div>
              </div>
            </div>
          </section>
        </BaseSkeleton>
      </div>

      <section class="bg-gray-100 pt-11 pb-16">
        <CommonHaveQuestions
          body-class="!bg-white container"
          class="my-8 md:my-20 mb-6 md:mb-[97px]"
        />
      </section>

      <div class="bg-white pb-8">
        <div
          v-if="contacts.length || loading"
          class="container py-8 sm:py-10 md:py-16"
        >
          <h3 class="base-title-style">{{ $t('department_contacts') }}</h3>
          <Transition mode="out-in" name="fade">
            <div
              v-if="!loading"
              class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"
            >
              <CardContact
                v-for="(item, i) in contacts"
                :key="i"
                :contact="{
                  title: item?.head?.full_name,
                  subtitle: item?.head?.position,
                  phone_1: item?.phone_number,
                  time: item?.application_time,
                  email: item?.email,
                }"
              />
            </div>
            <div
              v-else
              class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"
            >
              <CommonLoadingCardContact v-for="key in 4" :key />
            </div>
          </Transition>
        </div>
      </div>

      <div class="mt-10 lg:mt-[190px] bg-gray-100">
        <CommonDownloadApp />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store/home'
import type { IContactInfo, IDepartmentContact } from '~/types/home.types'

const { t } = useI18n()
const store = useHomeStore()
const contacts = computed(
  () => store.departmentContacts as IDepartmentContact[]
)
const contactInfo = computed(() => store.contactInfo as IContactInfo)
const locations = ref([])
const loading = ref(true)

const routes = [
  {
    name: t('about_us'),
    path: '/about-us',
  },
  {
    name: t('menu.contacts'),
    path: '/contacts',
  },
]

const coords = ref<number[]>()

onMounted(() => {
  store.fetchDepartmentContact()
  store.fetchContactInfo()
})

watch(
  () => contactInfo.value,
  () => {
    if (contactInfo.value?.locations?.length) {
      for (const key of contactInfo.value?.locations) {
        locations.value.push([key?.location?.lot, key?.location?.lat])

        coords.value = [key?.location?.lot, key?.location?.lat]
      }

      loading.value = false
    }
  }
)
</script>

<style>
.ymaps-2-1-79-controls__toolbar,
.ymaps-2-1-79-copyright,
.ymaps-2-1-79-zoom,
.ymaps3x0--control__background,
.ymaps3x0--map-copyrights {
  display: none !important;
}
</style>
