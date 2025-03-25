<script setup lang="ts">
import type { IVacancyDetail } from '~/types/home.types'
import { formatPhoneNumber } from '~/utils'

const props = defineProps<{
  career: IVacancyDetail
  loading?: boolean
}>()

const emit = defineEmits(['submit'])

const info = computed(
  () =>
    props.career?.contacts?.address ||
    props.career?.contacts?.phone_1 ||
    props.career?.contacts?.phone_2 ||
    props.career?.contacts?.email
)
</script>

<template>
  <div class="p-4 sm:p-5">
    <BaseSkeleton
      width="350px"
      height="100px"
      :loading
      border-radius="12px"
      preloader-class="mb-3"
    >
      <div
        v-if="career?.responsibilities"
        class="content text-gray font-medium text-sm sm:text-base"
        v-html="career?.responsibilities"
      />
    </BaseSkeleton>

    <div
      v-if="info"
      class="p-4 sm:p-5 rounded-[20px] border border-gray-200 space-y-2.5 sm:space-y-4 mt-4 sm:mt-5 mb-6"
    >
      <BaseSkeleton
        width="200px"
        height="24px"
        :loading
        border-radius="12px"
        preloader-class="mb-3"
      >
        <p
          v-if="career?.contacts?.title"
          class="font-extrabold text-lg sm:text-xl"
        >
          {{ career?.contacts?.title }}
        </p>
      </BaseSkeleton>
      <BaseSkeleton
        width="300px"
        height="24px"
        :loading
        border-radius="12px"
        preloader-class="mb-3"
      >
        <div
          v-if="career?.contacts?.address"
          class="flex items-center gap-1.5 sm:gap-3"
        >
          <span class="icon-map-pin text-lg sm:text-2xl text-red" />
          <p class="font-medium sm:text-base text-sm">
            {{ career?.contacts?.address }}
          </p>
        </div>
      </BaseSkeleton>

      <BaseSkeleton
        width="300px"
        height="24px"
        :loading
        border-radius="12px"
        preloader-class="mb-3"
      >
        <a
          v-if="career?.contacts?.phone_1"
          :href="`tel:${career?.contacts?.phone_1}`"
          class="flex items-center gap-1.5 sm:gap-3 group"
        >
          <span class="icon-phone text-lg sm:text-2xl text-red" />
          <p
            class="font-medium sm:text-base text-sm duration-200 group-hover:text-red"
          >
            {{ formatPhoneNumber(career?.contacts?.phone_1) }}
          </p>
        </a>
      </BaseSkeleton>

      <BaseSkeleton
        width="300px"
        height="24px"
        :loading
        border-radius="12px"
        preloader-class="mb-3"
      >
        <a
          v-if="career?.contacts?.phone_2"
          :href="`tel:${career?.contacts?.phone_2}`"
          class="flex items-center gap-1.5 sm:gap-3 group"
        >
          <span class="icon-phone text-lg sm:text-2xl text-red" />
          <p
            class="font-medium sm:text-base text-sm duration-200 group-hover:text-red"
          >
            {{ formatPhoneNumber(career?.contacts?.phone_2) }}
          </p>
        </a>
      </BaseSkeleton>

      <BaseSkeleton
        width="300px"
        height="24px"
        :loading
        border-radius="12px"
        preloader-class="mb-3"
      >
        <a
          v-if="career?.contacts?.email"
          :href="`mailto:${career?.contacts?.email}`"
          class="flex items-center gap-1.5 sm:gap-3 group"
        >
          <span class="icon-mail text-lg sm:text-2xl text-red" />
          <p
            class="font-medium sm:text-base text-sm duration-200 group-hover:text-red"
          >
            {{ career?.contacts?.email }}
          </p>
        </a>
      </BaseSkeleton>
    </div>

    <div class="flex justify-end">
      <BaseButton
        :text="$t('submit')"
        variant="error"
        icon="icon-send-converted text-white text-lg"
        icon-position="right"
        class="min-w-[126px] max-w-max"
        @click="emit('submit')"
      />
    </div>
  </div>
</template>

<style>
.content {
  * {
    @apply font-medium text-gray sm:text-base text-sm;
  }

  ul, ol{
    @apply list-disc pl-4
  }
  ul li{
    @apply mb-1 last:mb-0
  }
}
</style>
