<script lang="ts" setup>
import { formatPhoneNumber } from '~/utils'

defineProps<{
  card: {
    title?: string
    subtitle?: string
    time?: string
    phone?: string
    email?: string
  }
  loading?: boolean
}>()
</script>

<template>
  <!-- <div class="bg-white h-max rounded-[20px] p-5">
    <BaseSkeleton :loading border-radius="12px" height="55px" width="100%">
      <h4 v-if="card?.title" class="font-medium md:text-xl mb-1 md:mb-2">
        {{ card?.title }}
      </h4>
    </BaseSkeleton>
    <div
      v-if="card?.subtitle"
      class="text-gray font-medium text-sm"
      v-html="card?.subtitle"
    />

    <div class="my-3 md:my-0 md:mt-4 md:mb-5 bg-gray-300 w-[100px] h-[1px]" />
    <div class="space-y-1.5 md:space-y-3">
      <div v-if="card?.time" class="flex items-center gap-1.5 sm:gap-2">
        <i class="text-red icon-clock text-xl h-5 flex-center" />
        <div class="font-medium text-sm" v-html="card?.time" />
      </div>
      <a
        v-if="card?.phone"
        :href="`tel:${card?.phone}`"
        class="flex items-center gap-1.5 sm:gap-2 group"
      >
        <i class="text-red icon-phone text-xl h-5 flex-center" />
        <p class="font-medium text-sm duration-200 group-hover:text-red">
          {{ formatPhoneNumber(card?.phone) }}
        </p>
      </a>
      <a
        v-if="card?.email"
        :href="`mailto:${card?.email}`"
        class="flex items-center gap-1.5 sm:gap-2 group"
      >
        <i class="text-red icon-mail text-xl h-5 flex-center" />
        <p class="font-medium text-sm duration-200 group-hover:text-red">
          {{ card?.email }}
        </p>
      </a>
    </div>
  </div> -->
</template>

<style scoped></style>
