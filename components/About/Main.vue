<script lang="ts" setup>
import type { TAbout } from '~/types/about/index.types'

defineProps<{
  data?: TAbout
  loading?: boolean
}>()
</script>

<template>
  <div class="py-3 md:py-16 bg-white">
    <div class="container flex items-center gap-10 md:gap-20">
      <div class="space-y-2 md:space-y-5">
        <BaseSkeleton
          :loading
          border-radius="12px"
          height="55px"
          preloader-class="mb-5"
          width="200px"
        >
          <h2 class="title-style mb-2 md:mb-5">{{ data?.about_title }}</h2>
        </BaseSkeleton>

        <BaseSkeleton
          :loading
          border-radius="12px"
          height="270px"
          preloader-class=" md:min-w-[680px] w-full"
          width="100%"
        >
          <div
            v-if="data?.about_description"
            class="lg:text-xl space-y-3 md:space-y-5"
            v-html="data?.about_description"
          ></div>
        </BaseSkeleton>
      </div>

      <BaseSkeleton :loading border-radius="12px" height="360px" width="330px">
        <img
          alt="main logo"
          class="hidden md:block"
          loading="lazy"
          src="~/assets/images/about-us/logo.svg"
        />
      </BaseSkeleton>
    </div>

    <img
      alt="image of people"
      class="w-full h-full object-cover"
      loading="lazy"
      src="~/assets/images/main/main-bg.svg"
    />

    <div
      v-if="data?.cards?.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 container gap-3 sm:gap-4 md:gap-5 -mt-[30px] sm:-mt-[50px] md:-mt-[124px]"
    >
      <CardAbout
        v-for="(item, i) in data?.cards"
        :key="i"
        :card="{
          image: item?.icon,
          title: item?.title,
          content: item?.description,
        }"
      />
    </div>
  </div>
</template>

<style scoped></style>
