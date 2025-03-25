<script lang="ts" setup>
const props = defineProps<{
  referral: {
    title?: string
    description?: string
    image?: string
  }
  loading?: boolean
}>()

const getReferral = computed(() => {
  if (
    props.referral &&
    props.referral.description &&
    props.referral.image &&
    props.referral.title
  ) {
    return props.referral
  }
})
</script>

<template>
  <div>
    <div>
      <BaseSkeleton
        width="60%"
        height="55px"
        border-radius="12px"
        :loading
        preloader-class="mb-4"
      >
        <h1
          v-if="getReferral?.title"
          class="title-style my-4 md:my-7 text-center"
        >
          {{ referral.title }}
        </h1>
      </BaseSkeleton>

      <BaseSkeleton
        width="100%"
        height="400px"
        border-radius="12px"
        :loading
        preloader-class="mb-6"
      >
        <CommonImage
          v-if="referral?.image"
          :src="referral.image"
          alt="referral image"
          image-class="object-cover rounded-2xl md:rounded-3xl overflow-hidden w-full max-h-[430px] aspect-[782/430] mb-3 sm:mb-5 md:mb-8"
        />
      </BaseSkeleton>

      <BaseSkeleton width="100%" height="300px" border-radius="12px" :loading>
        <div
          v-if="referral?.description"
          class="about-text"
          v-html="referral.description"
        />
      </BaseSkeleton>
    </div>

    <slot></slot>
  </div>
</template>

<style scoped></style>
