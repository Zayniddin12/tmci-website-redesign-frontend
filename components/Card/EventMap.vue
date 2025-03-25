<script setup lang="ts">
import { formatPhoneNumber } from '~/utils'

defineProps<{
  event: {
    phone?: string
    email?: string
    website?: string
  }
}>()
</script>

<template>
  <div class="px-4 w-full py-3 bg-white rounded-2xl border border-red">
    <div class="flex items-center flex-wrap sm:flex-nowrap gap-5 md:gap-8">
      <a
        v-if="event.phone"
        :href="`tel:${event.phone}`"
        class="flex items-center gap-3"
      >
        <span class="text-red text-2xl h-6 flex-center icon-phone" />
        <div class="space-y-0.5">
          <p class="text-gray text-xs">{{ $t('form.phone_number') }}</p>
          <p class="text-sm font-semibold">
            {{ formatPhoneNumber(event?.phone) }}
          </p>
        </div>
      </a>

      <a
        v-if="event.email"
        :href="`mailto:${event?.email}`"
        class="flex items-center gap-3"
      >
        <span class="text-red text-2xl h-6 flex-center icon-mail" />
        <div class="space-y-0.5">
          <p class="text-gray text-xs">{{ $t('form.mail') }}</p>
          <p class="text-sm font-semibold">{{ event?.email }}</p>
        </div>
      </a>

      <div v-if="event?.website" class="flex items-center gap-3">
        <span class="text-red text-2xl h-6 flex-center icon-world" />
        <div class="space-y-0.5">
          <p class="text-gray text-xs">{{ $t('website') }}</p>
          <p class="text-sm font-semibold">{{ event?.website }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
