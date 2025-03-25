<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'

import CardSteps from '~/components/Common/Steps/CardSteps.vue'
import StepsLoading from '~/components/Common/Steps/StepsLoading.vue'
import MobileSteps from '~/components/Intership/MobileSteps.vue'
import type { IFaqs } from '~/types/common'

interface Props {
  steps: IFaqs[]
  title?: string
  isStep?: boolean
  loading?: boolean
}

defineProps<Props>()

const { width } = useWindowSize()
</script>

<template>
  <CommonWrapper
    v-if="width >= 768"
    :title="title || ''"
    class="!py-7 sm:!pt-14 sm:!pb-16 sm:!py-0"
  >
    <Transition mode="out-in" name="fade">
      <div :key="loading" class="flex-y-center flex-col">
        <template v-if="loading">
          <StepsLoading
            v-for="i in 5"
            :key="i"
            :reverse="!isStep ? i % 2 === 1 : i % 2 === 0"
          />
        </template>
        <template v-else-if="steps?.length">
          <hr class="hidden md:block w-px bg-green" />
          <CardSteps
            v-for="(step, i) in steps"
            :key="i"
            :reverse="!isStep ? i % 2 === 1 : i % 2 === 0"
            class="hidden md:grid"
            is-center
            v-bind="{ step: i + 1, data: step }"
          />
        </template>
      </div>
    </Transition>
  </CommonWrapper>

  <CommonWrapper
    v-else
    :title="title || ''"
    class="bg-white !py-7 sm:!pt-14 sm:!pb-16 sm:!py-0"
  >
    <Transition mode="out-in" name="fade">
      <div :key="loading" class="flex-y-center flex-col">
        <template v-if="loading">
          <StepsLoading v-for="i in 5" :key="i" is-half reverse />
        </template>
        <template v-else-if="steps?.length">
          <div v-if="steps?.length" class="flex-y-center flex-col">
            <MobileSteps
              v-for="(step, i) in steps"
              :key="i"
              :reverse="isStep ? i % 2 === 1 : i % 2 === 0"
              is-center
              v-bind="{ step: i + 1, data: step }"
            />
          </div>
        </template>
      </div>
    </Transition>
  </CommonWrapper>
</template>
