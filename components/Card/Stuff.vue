<script setup lang="ts">
import { formatPhoneNumber } from '~/utils'

defineProps<{
  stuff: {
    image: string
    name: string
    job: string
    time: string
    phone: string
    email: string
    slug: string
  }
}>()
</script>

<template>
  <NuxtLink
    :to="`management/${stuff.slug}`"
    class="p-4 sm:p-5 space-y-3 sm:space-y-5 rounded-3xl bg-gray-200 border border-gray-200 cursor-pointer duration-200 hover:!bg-white hover:!border-red overflow-hidden"
  >
    <div class="flex items-center gap-3 sm:gap-5">
      <CommonImage
        v-if="stuff?.image"
        :src="stuff?.image"
        alt="image of stuff"
        class="overflow-hidden rounded-2xl w-full h-full max-w-[108px] max-h-[140px] shrink-0 !aspect-[108/140]"
      />
      <div class="space-y-1 sm:space-y-2">
        <p class="line-clamp-2 sm:text-xl font-bold">{{ stuff?.name }}</p>
        <p class="text-gray line-clamp-2 text-sm font-medium">
          {{ stuff?.job }}
        </p>
      </div>
    </div>

    <div class="space-y-1.5 sm:space-y-3">
      <div v-if="stuff?.time" class="flex items-center gap-1.5 sm:gap-2">
        <i class="text-red icon-clock text-xl h-5 flex-center" />
        <div class="font-semibold text-sm" v-html="stuff?.time" />
      </div>

      <a
        v-if="stuff?.phone"
        :href="`tel:${stuff?.phone}`"
        class="flex items-center gap-1.5 sm:gap-2"
      >
        <i class="text-red text-xl icon-phone h-5 flex-center" />
        <p class="font-semibold text-sm">
          {{ formatPhoneNumber(stuff?.phone) }}
        </p>
      </a>

      <a
        v-if="stuff?.email"
        :href="`mailto:${stuff?.email}`"
        class="flex items-center gap-1.5 sm:gap-2"
      >
        <i class="text-red text-xl icon-mail h-5 flex-center" />
        <p class="font-semibold text-sm">{{ stuff?.email }}</p>
      </a>
    </div>
  </NuxtLink>
</template>

<style scoped></style>
