<template>
  <div
    class="grid grid-cols-[1fr_max-content_1fr] justify-center gap-7 max-w-[874px] min-h-[210px] items-center"
  >
    <StepsInfo v-bind="{ reverse, step: data }" />
    <div class="flex-y-center flex-col gap-2 h-full">
      <hr
        v-if="isCenter"
        class="w-px border-none h-full"
        :class="step <= activeStep ? 'bg-red' : 'bg-gray-200'"
      />
      <StepsNumber v-bind="{ activeStep, step }" />
      <hr
        class="w-px border-none h-full"
        :class="step < activeStep ? 'bg-red' : 'bg-gray-200'"
      />
    </div>
    <div :class="{ 'order-first': reverse }" />
  </div>
</template>

<script setup lang="ts">
import StepsInfo from '~/components/Common/Steps/StepsInfo.vue'
import StepsNumber from '~/components/Common/Steps/StepsNumber.vue'
import type { TInternshipSteps } from '~/types/common'

interface Props {
  step: number
  activeStep?: number
  reverse?: boolean
  isCenter?: boolean
  data?: TInternshipSteps[]
}
withDefaults(defineProps<Props>(), {
  activeStep: 1,
})
</script>
