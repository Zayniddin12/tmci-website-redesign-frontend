<template>
  <div
    class="grid grid-cols-5 md:grid-cols-4 justify-center gap-4 md:gap-7 max-w-[874px]"
  >
    <StepsInfo
      v-bind="{ reverse: false, step: data, isMobileSteps: true }"
      class="order-2 col-span-4 md:col-span-3 mb-3 last:mb-0"
    />
    <div class="flex-y-center flex-col gap-2 col-span-1">
      <hr
        v-if="isCenter"
        class="w-px border-none h-full"
        :class="step <= activeStep ? 'bg-green' : 'bg-gray-200'"
      />
      <StepsNumber v-bind="{ activeStep, step }" />
      <hr
        class="w-px border-none h-full"
        :class="step < activeStep ? 'bg-green' : 'bg-gray-200'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import StepsInfo from '~/components/Common/Steps/StepsInfo.vue'
import StepsNumber from '~/components/Common/Steps/StepsNumber.vue'

interface Props {
  step: number
  activeStep?: number
  reverse?: boolean
  isCenter?: boolean
  data?: any
}
withDefaults(defineProps<Props>(), {
  activeStep: 1,
})
</script>
