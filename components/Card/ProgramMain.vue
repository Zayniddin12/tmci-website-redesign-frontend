<script lang="ts" setup>
defineProps<{
  card?: {
    title: string
    subtitle: string
    content: string
    link: string
  }
  loading?: boolean
}>()

const router = useRouter()

function handleReadMore(path: string) {
  router.push({ path })
}
</script>

<template>
  <NuxtLink
    :to="`/programs/${card?.link}`"
    class="flex flex-col justify-between p-5 px-4 sm:px-6 sm:p-6 rounded-3xl bg-gray-200 relative overflow-hidden"
  >
    <img
      alt="bg image"
      class="absolute max-w-[184px] right-0 -top-5 w-full object-cover"
      loading="lazy"
      src="/assets/images/program-bg.webp"
    />
    <div>
      <BaseSkeleton
        :loading
        border-radius="8px"
        height="28px"
        preloader-class="mb-1"
        width="100%"
      >
        <h4
          v-if="card?.title"
          class="font-extrabold text-xl sm:text-2xl leading-120 mb-0.5 md:mb-1"
        >
          {{ card?.title }}
        </h4>
      </BaseSkeleton>

      <BaseSkeleton
        :loading
        border-radius="8px"
        height="22px"
        preloader-class="mb-4"
        width="100%"
      >
        <p
          v-if="card?.subtitle"
          class="font-medium capitalize md:text-red text-sm sm:text-base"
        >
          {{ card?.subtitle }}
        </p>
      </BaseSkeleton>

      <BaseSkeleton
        :loading
        border-radius="8px"
        height="60px"
        preloader-class="mb-6"
        width="100%"
      >
        <p
          v-if="card?.content"
          class="hidden md:block line-clamp-3 text-gray md:text-dark text-xs sm:text-sm"
        >
          {{ card?.content }}
        </p>
      </BaseSkeleton>
    </div>

    <BaseSkeleton :loading border-radius="8px" height="40px" width="100px">
      <span
        v-if="card?.link"
        @click="handleReadMore(`/programs/${card?.link}`)"
      >
        <BaseButton
          :text="$t('more')"
          class="hidden md:block mt-5 md:mt-6 w-full md:w-auto"
        />
      </span>
    </BaseSkeleton>
  </NuxtLink>
</template>

<style scoped></style>
