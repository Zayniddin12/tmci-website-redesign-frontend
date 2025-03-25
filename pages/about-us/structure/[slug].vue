<template>
  <div class="bg-white">
    <div class="bg-gray-100">
      <div class="container pb-16 flex flex-col gap-5 md:gap-5">
        <BaseBreadcrumb body-class="!bg-gray-100" v-bind="{ routes }" />
        <h1 class="title-style mt-3 mb-3 md:mb-6">
          {{ staff?.title }}
        </h1>
        <CardProgramHead
          v-for="(member, key) in staff?.staff_members"
          :key
          :card="{
            image: member?.avatar?.s500x500,
            name: member?.full_name,
            job: member?.position,
            time: member?.application_time,
            phone: member?.phone_number,
            email: member?.email,
            info: member?.additional_info,
            socials: {
              instagram: member?.instagram,
              telegram: member?.telegram,
              linkedin: member?.linkedin,
            },
          }"
          title-position="top"
          :loading
        />
      </div>
    </div>
    <div v-for="item in staff?.staff_members">
      <Faq class="mx-auto mt-16" :faqs="item.additional_info" />
    </div>
    <div class="lg:mt-[160px]">
      <CommonDownloadApp />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IStructureNode } from '~/types/common'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const slug = useRoute().params.slug
const staff = ref<IStructureNode>()
const loading = ref(true)
const { t } = useI18n()

onMounted(() => {
  getStaff()
})
const routes = [
  {
    name: t('about_us'),
    path: '/about-us',
  },
  {
    name: t('structures.title'),
    path: '/about-us/structure',
  },
  {
    name: slug,
    path: `/about-us/structure/${slug}`,
  },
]

function getStaff() {
  loading.value = true
  useApi()
    .$get<IStructureNode>(`/structures/detail/${slug}/`)
    .then((res) => {
      staff.value = res
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
