<script lang="ts" setup>
import type { IFaqs } from '~/types/common'

interface Props {
  reverse?: boolean
  step?: IFaqs
  isMobileSteps?: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    :class="[
      reverse ? 'text-left items-start order-last' : '',
      { '!items-start !text-left': isMobileSteps },
    ]"
    class="border rounded-3xl bg-gray-4 border-gray-300 p-3 md:p-5 flex flex-row items-center gap-5 h-max"
  >
    <img
      v-if="step?.icon"
      :src="step?.icon"
      alt="icon of step"
      class="w-12 h-12 md:max-w-12 md:max-h-12 object-cover"
    />
    <div>
      <h3 class="text-base font-bold text-dark leading-130 mb-2">
        {{ step?.title }}
      </h3>
      <p
        class="text-sm font-normal text-gray leading-140"
        v-html="step?.content"
      />
    </div>
  </div>
</template>

<style scoped></style>
