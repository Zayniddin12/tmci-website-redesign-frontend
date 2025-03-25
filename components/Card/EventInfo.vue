<script setup lang="ts">
defineProps<{
  event: {
    date?: string
    time?: string
    location?: string
    socials: {
      facebook?: string
      telegram?: string
      linkedin?: string
      instagram?: string
      youtube?: string
    }
  }
}>()
</script>

<template>
  <div
    class="p-3 bg-white rounded-2xl flex flex-col gap-4 md:gap-3 md:flex-row md:items-center justify-between"
  >
    <div
      class="grid grid-cols-1 md:flex md:items-center justify-center sm:justify-auto flex-wrap sm:flex-nowrap gap-3 sm:gap-7"
    >
      <div v-if="event.date" class="flex items-center gap-3">
        <span class="text-red text-2xl icon-calendar-event" />
        <div class="space-y-0.5">
          <p class="text-gray text-xs">{{ $t('event_date') }}</p>
          <p class="text-sm font-semibold">{{ event?.date }}</p>
        </div>
      </div>

      <div v-if="event.time" class="flex items-center gap-3">
        <span class="text-red text-2xl icon-clock" />
        <div class="space-y-0.5">
          <p class="text-gray text-xs">{{ $t('event_time') }}</p>
          <p class="text-sm font-semibold">{{ event?.time }}</p>
        </div>
      </div>

      <div v-if="event.location" class="flex items-center gap-3">
        <span class="text-red text-2xl icon-map-pin" />
        <div class="space-y-0.5">
          <p class="text-gray text-xs">{{ $t('location') }}</p>
          <p class="text-sm font-semibold">{{ event?.location }}</p>
        </div>
      </div>
    </div>

    <CommonSocials class="print:hidden" :socials="event.socials" />
  </div>
</template>

<style scoped></style>
