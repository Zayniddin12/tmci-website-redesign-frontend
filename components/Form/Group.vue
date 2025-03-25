<template>
  <div class="flex flex-col gap-1">
    <div class="flex-center-between">
      <p
        :class="labelClass"
        class="text-sm leading-130 text-dark flex-y-center"
        @click.stop
      >
        {{ label }}
        <span
          :class="{ 'opacity-100': isRequired }"
          class="text-red-300 text-xl leading-tight opacity-0"
        >
          *
        </span>
      </p>
      <transition-group name="fade-sm">
        <div>
          <p
            v-for="error in errors"
            :key="error.$uid"
            class="text-sm leading-130 font-normal text-red"
          >
            {{ error?.$message }}
          </p>
        </div>
      </transition-group>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core'

import type { TClassName } from '~/types'

interface Props {
  label: string
  labelClass?: TClassName
  errors?: ErrorObject[]
  errorLabel?: TClassName
  isRequired?: boolean
}

withDefaults(defineProps<Props>(), {
  label: 'Label',
  labelClass: '',
})
</script>
