<script setup lang="ts">
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const props = defineProps<{
  card?: {
    title: string
    content: string
    date: string
    link: string
  }
  isSmall?: boolean
  loading?: boolean
}>()

const router = useRouter()

function getSlug() {
  if (props.card?.link) {
    router.push(`/life-at-tmc/events/${props.card.link}`)
  }
}
</script>

<template>
  <div
    class="bg-white md:p-5 p-3 rounded-2xl border border-transparent cursor-pointer duration-200 hover:!border-red hover:!bg-transparent hover:shadow-main"
    :class="{
      '!p-0 flex items-center gap-3 !cursor-auto !border-none !shadow-none ! !bg-transparent !rounded-none':
        isSmall,
    }"
    @click="getSlug"
  >
    <div class="flex flex-row md:flex-col gap-3 md:gap-5">
      <!--  Todo: BaseSkeleton ni chopish kerak va alohida card ishlatish kerak    -->
      <BaseSkeleton
        width="53px"
        height="53px"
        border-radius="8px"
        :loading
        preloader-class="mb-5"
      >
        <CardDate :date="card?.date" />
      </BaseSkeleton>
      <BaseSkeleton
        width="100%"
        height="56px"
        border-radius="8px"
        :loading
        preloader-class="mb-2"
      >
        <nuxt-link
          v-if="card?.title && !isSmall"
          :to="`/life-at-tmc/events/${card?.link}`"
          class="font-bold sm:text-lg line-clamp-2 cursor-pointer duration-200 hover:text-red"
        >
          {{ card.title }}
        </nuxt-link>
      </BaseSkeleton>
    </div>

    <div class="mt-2 sm:mt-4 md:mt-0" :class="{ '!mt-0': isSmall }">
      <nuxt-link
        v-if="isSmall && card?.title"
        :to="`/life-at-tmc/events/${card?.link}`"
        class="leading-130 !text-sm !line-clamp-1 font-bold sm:text-lg cursor-pointer duration-200 hover:text-red mb-1.5"
      >
        {{ card.title }}
      </nuxt-link>
      <BaseSkeleton width="100%" height="40px" border-radius="8px" :loading>
        <p v-if="!isSmall && card?.content" class="text-sm line-clamp-2">
          {{ card.content }}
        </p>
      </BaseSkeleton>
      <div
        v-if="isSmall && card?.date"
        class="flex items-center gap-1 text-gray"
      >
        <span class="icon-calendar-event text-xl" />
        <span class="font-medium text-sm">{{
          dayjs(card.date).format('DD.MM.YYYY')
        }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
