<script setup lang="ts">
import { formatPhoneNumber } from '~/utils'

defineProps<{
  contact: {
    title: string
    subtitle?: string
    phone_1?: string
    phone_2?: string
    time: string
    email: string
  }
  divider?: boolean
}>()
</script>

<template>
  <div
    class="rounded-xl w-full md:rounded-2xl p-4 md:p-5 bg-gray-100 border border-transparent duration-200 hover:border-red hover:shadow-main hover:bg-white cursor-pointer"
    :class="{ '!p-4 md:!p-7': divider }"
  >
    <div :class="{ 'mb-2.5 md:mb-5': !divider }">
      <h4 v-if="contact?.title" class="font-bold md:text-xl mb-1 md:mb-2">
        {{ contact.title }}
      </h4>
      <p v-if="contact?.subtitle" class="text-gray font-medium text-sm">
        {{ contact.subtitle }}
      </p>
    </div>

    <div
      v-if="divider"
      class="my-3 md:my-0 md:mt-4 md:mb-6 bg-gray-300 w-[100px] h-[1px]"
    />

    <div v-if="contact?.time" class="space-y-1.5 md:space-y-3">
      <div class="flex items-center gap-1.5 sm:gap-2">
        <i class="text-red icon-clock text-xl h-5 flex-center" />
        <div class="font-semibold text-sm" v-html="contact?.time" />
      </div>
      <a
        v-if="contact?.phone_1"
        :href="`tel:${contact?.phone_1}`"
        class="flex items-center gap-1.5 sm:gap-2 group"
      >
        <i class="text-red icon-phone text-xl h-5 flex-center" />
        <p class="font-semibold text-sm duration-200 group-hover:text-red">
          {{ formatPhoneNumber(contact?.phone_1) }}
        </p>
      </a>
      <a
        v-if="contact?.phone_2"
        :href="`tel:${contact?.phone_2}`"
        class="flex items-center gap-1.5 sm:gap-2 group"
      >
        <i class="text-red icon-phone text-xl h-5 flex-center" />
        <p class="font-semibold text-sm duration-200 group-hover:text-red">
          {{ formatPhoneNumber(contact?.phone_2) }}
        </p>
      </a>
      <a
        v-if="contact?.email"
        :href="`mailto:${contact?.email}`"
        class="flex items-center gap-1.5 sm:gap-2 group"
      >
        <i class="text-red icon-mail text-xl h-5 flex-center" />
        <p class="font-semibold text-sm duration-200 group-hover:text-red">
          {{ contact?.email }}
        </p>
      </a>
    </div>
  </div>
</template>

<style scoped></style>
