<script lang="ts" setup>
interface props {
  job: string
  subtitle: string
  content: string
  duration: string
  slug?: string
}
defineProps<{
  career: props
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'more'): void
  (e: 'submit', value: props): void
}>()
</script>

<template>
  <div
    class="p-4 sm:p-5 md:p-6 bg-gray-200 flex flex-col justify-between rounded-3xl space-y-4 sm:space-y-6"
  >
    <div class="space-y-1.5 sm:space-y-3">
      <div>
        <BaseSkeleton
          width="100%"
          height="40px"
          border-radius="24px"
          :loading
          preloader-class="mb-2"
        >
          <h3
            v-if="career?.job"
            class="mb-0.5 sm:mb-2 font-bold text-lg sm:text-2xl"
          >
            {{ career?.job }}
          </h3>
        </BaseSkeleton>
        <BaseSkeleton width="80%" height="24px" border-radius="24px" :loading>
          <p class="text-gray text-sm font-medium">{{ career?.subtitle }}</p>
        </BaseSkeleton>
      </div>

      <BaseSkeleton
        width="40%"
        height="32px"
        border-radius="24px"
        :loading
        preloader-class="mb-2"
      >
        <div v-if="career?.duration" class="flex items-center gap-2">
          <span class="icon-briefcase text-red text-xl" />
          <p class="text-sm font-semibold">{{ career?.duration }}</p>
        </div>
      </BaseSkeleton>

      <BaseSkeleton width="75%" height="100px" border-radius="24px" :loading>
        <div
          v-if="career?.content"
          class="content-modal"
          v-html="career?.content"
        />
      </BaseSkeleton>
    </div>

    <!--    buttons-->
    <div class="flex sm:items-center max-sm:flex-col gap-2 sm:gap-4">
      <BaseSkeleton width="130px" height="40px" border-radius="24px" :loading>
        <BaseButton
            type="button"
          :text="$t('more')"
          class="min-w-[126px] sm:max-w-max max-sm:w-full"
          @click="emit('more')"
        />
      </BaseSkeleton>

      <BaseSkeleton width="130px" height="40px" border-radius="24px" :loading>
        <BaseButton
            type="button"
          :text="$t('submit')"
          variant="warning"
          icon="icon-send-converted text-red"
          icon-position="right"
          class="min-w-[126px] sm:max-w-max max-sm:w-full"
          @click="emit('submit', career)"
        />
      </BaseSkeleton>
    </div>
  </div>
</template>

<style>
.content-modal {
  * {
    @apply font-medium text-dark sm:text-base text-sm;
  }

  ul,
  ol {
    @apply list-disc pl-4;
  }
  ul li {
    @apply mb-1 last:mb-0;
  }
}
</style>
