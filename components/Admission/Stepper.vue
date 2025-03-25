<template>
  <common-card>
    <template #content>
      <ul>
        <li
          v-for="(item, idx) in currentStepList"
          :key="item.id"
          class="relative"
        >
          <div class="flex items-center">
            <span
              :class="getItemStyles(item.status).index"
              class="inline-flex items-center shrink-0 justify-center w-9 h-9 rounded-full text-base font-semibold leading-130"
              >{{ idx + 1 }}</span
            >
            <span
              :class="getItemStyles(item.status).title"
              class="inline-block ml-3 text-base font-semibold leading-130"
              >{{ item.title }}</span
            >
          </div>
          <span
            v-if="idx !== stepperList.length - 1"
            :class="getItemStyles(item.status).line"
            class="block ml-[18px] w-[1px] h-7 bg-[#E6EAED]"
          ></span>
        </li>
      </ul>
    </template>
  </common-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import type { IStepper, TStepperTypes } from '~/types/admission/index.types'

const props = defineProps<{
  stepperList: IStepper[]
  activeStep: number
}>()

const currentStepList = computed(() => {
  return props.stepperList.map((item) => {
    if (item?.id === 2 && props.activeStep === 3) {
      return { ...item, status: 'in-progress' }
    }

    if (item?.id === 3 && props.activeStep === 3) {
      return { ...item, status: 'not-started' }
    }

    if (item?.id === 3 && props.activeStep === 4) {
      return { ...item, status: 'in-progress' }
    }

    if (item?.id === 4 && props.activeStep === 4) {
      return { ...item, status: 'not-started' }
    }

    if (item?.id === 4 && props.activeStep === 5) {
      return { ...item, status: 'in-progress' }
    }

    if (item?.id === 5 && props.activeStep === 5) {
      return { ...item, status: 'not-started' }
    }

    if (item?.id === 5 && props.activeStep === 6) {
      return { ...item, status: 'in-progress' }
    }

    if (item?.id === 6 && props.activeStep === 6) {
      return { ...item, status: 'not-started' }
    }

    if (item?.id === 6 && props.activeStep === 7) {
      return { ...item, status: 'in-progress' }
    }

    if (item.id < props.activeStep) {
      return { ...item, status: 'completed' }
    }

    if (item?.id === props.activeStep) {
      return { ...item, status: 'in-progress' }
    }

    return item
  })
})

const getItemStyles = (
  status: TStepperTypes
): { title: string; index: string; line?: string } => {
  const styles = {
    title: 'text-primary',
    index: 'bg-[#F6F7F8] border border-[#F7F7F7] text-gray',
  }
  if (status === 'in-progress') {
    styles.title = 'text-gray'
    styles.index = 'bg-[#9718370F] border border-[#97183733] text-red'
  } else if (status === 'completed') {
    styles.title = 'text-dark'
    styles.index = 'bg-red text-white'
    styles.line = 'bg-red'
  }
  return styles
}
</script>

<style scoped></style>
