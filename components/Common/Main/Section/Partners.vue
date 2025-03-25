<template>
  <section class="md:py-16 p-8 px-4 bg-white">
    <h2 class="title-style text-center text-dark max-w-screen-md mx-auto">
      {{ $t('partners.title') }}
    </h2>
    <p class="text-center text-dark max-w-screen-md mx-auto mb-5 md:mb-8">
      {{ $t('partners.subtitle') }}
    </p>

    <Transition mode="out-in" name="fade">
      <div
        v-if="!loading"
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-6 md:mt-8 gap-3 md:gap-6 container"
      >
        <CommonCardPartner
          v-for="partner in partners"
          :key="partner?.title"
          v-bind="{
            src: partner?.logo,
            alt: partner?.title,
            url: partner?.site_url,
          }"
        />
      </div>
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-6 md:mt-8 gap-3 md:gap-6 container"
      >
        <div
          v-for="key in 8"
          :key
          class="w-full max-w-44 h-28 skeleton rounded-md"
        />
      </div>
    </Transition>
  </section>
</template>

<script lang="ts" setup>
import { useHomeStore } from '~/store/home'

const store = useHomeStore()

store.fetchPartners()
const partners = computed(() => store.partners)
const loading = computed(() => store.partnersLoading)
</script>
