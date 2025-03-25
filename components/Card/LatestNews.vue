<script lang="ts" setup>
import dayjs from 'dayjs'

defineProps<{
  card?: {
    title: string
    description: string
    image: string
    date: string
    link: string
  }
  loading?: boolean
}>()
</script>

<template>
  <nuxt-link
    :to="`/life-at-tmc/news/${card?.link}`"
    class="flex flex-col sm:max-h-max bg-gray-100 rounded-2xl w-full overflow-hidden cursor-pointer duration-200 border border-transparent group md:hover:!border-red hover:!bg-transparent hover:!shadow-main min-h-[320px]"
  >
    <CommonImage
      v-if="card?.image"
      :src="card.image"
      alt="news image"
      class="min-w-[124px] w-full md:max-w-auto min-h-auto md:min-w-[281px] md:min-h-[188px] aspect-[281/188] object-cover"
    />
    <div class="flex flex-col h-full p-3 sm:p-5 justify-between card-content">
      <BaseSkeleton
        :loading
        border-radius="8px"
        height="56px"
        preloader-class="mb-2"
        width="100%"
      >
        <p
          v-if="card?.title"
          class="font-bold text-xs sm:text-lg line-clamp-2 mb-1 sm:mb-2"
        >
          {{ card?.title }}
        </p>
      </BaseSkeleton>
      <BaseSkeleton
        :loading
        border-radius="8px"
        height="40px"
        preloader-class="mb-5"
        width="100%"
      >
        <p
          v-if="card?.description"
          class="basis-auto text-xs sm:text-sm line-clamp-1 sm:line-clamp-2"
        >
          {{ card?.description }}
        </p>
      </BaseSkeleton>
      <BaseSkeleton :loading border-radius="8px" height="20px" width="100px">
        <div
          v-if="card?.date"
          class="flex items-center gap-1 text-gray mt-1.5 sm:mt-5"
        >
          <span class="icon-calendar-event h-4 sm:h-5 flex-center sm:text-xl" />
          <span class="font-medium text-xs sm:text-sm">
            {{ dayjs(card?.date).format('DD.MM.YYYY') }}
          </span>
        </div>
      </BaseSkeleton>
    </div>
  </nuxt-link>
</template>

<style scoped>
.min-h-auto {
  aspect-ratio: 281 / 188;
}
.card-content {
   min-height: 200px;
 }
</style>
