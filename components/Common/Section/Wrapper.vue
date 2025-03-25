<script setup lang="ts">
import type { TClassName } from '~/types'

interface Props {
  title?: string
  description?: string
  titleClass?: TClassName
  descriptionClass?: TClassName
  wrapperClass?: TClassName
  moreButton?: string
  moreButtonClass?: TClassName
  showBackBtn?: boolean
}

defineProps<Props>()

defineEmits<{
  (e: 'more'): void
}>()
const router = useRouter()

const back = () => {
  router.back()
}
</script>

<template>
  <div class="pt-7 md:pt-14 pb-8 md:pb-16">
    <div class="container">
      <div class="flex items-center">
        <span
          v-if="showBackBtn"
          class="icon-chevron text-5xl cursor-pointer rotate-180"
          @click="back()"
        ></span>
        <CommonSectionTitle
          v-if="title"
          v-bind="{ title }"
          :class="titleClass"
        />
      </div>
      <p
        v-if="description"
        :class="descriptionClass"
        class="text-base font-normal leading-140 text-dark mt-6"
      >
        {{ description }}
      </p>
      <div :class="[wrapperClass, { 'mt-8': title || description }]">
        <slot />
      </div>
      <BaseButton
        v-if="moreButton"
        class="max-w-[238px] w-full mt-8 !bg-white hover:!bg-gray-3"
        :class="moreButtonClass"
        size="large"
        variant="gray"
        :text="moreButton"
        @click="$emit('more')"
      />
    </div>

    <slot name="after" />
  </div>
</template>

<style scoped></style>
