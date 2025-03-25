<script lang="ts" setup>
import { onMounted } from 'vue'

import { useHomeStore } from '~/store/home'
import type { ISelectList, ISocial } from '~/types/about/index.types'

const store = useHomeStore()
const socials = computed(() => store.socials as ISocial)
const staticPages = computed(() => store.staticPages as ISelectList[])

onMounted(() => {
  store.fetchSocial()
  store.fetchStaticPages()
})
</script>

<template>
  <section
    class="py-6 lg:border-t lg:border-t-[#E6EAED] border-t-1 sm:flex justify-between items-center"
  >
    <div
      class="flex lg:items-center flex-col space-y-3 md:space-y-0 gap-0 md:flex-row lg:gap-5"
    >
      <CommonSocials :socials />

      <template v-if="staticPages?.length">
        <nuxt-link
          v-for="(page, index) in staticPages"
          :key="index"
          :to="`/page/${page?.slug}`"
          class="inline-block md:ml-2.5 text-base text-gray font-medium leading-140 transition-300 hover:text-red"
          >{{ page?.title }}
        </nuxt-link>
      </template>
    </div>

    <CommonLinks :socials />
  </section>
</template>

<style scoped></style>
