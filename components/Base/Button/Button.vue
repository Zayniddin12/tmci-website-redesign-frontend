<template>
  <button
    :class="[
      variants[variant],
      sizes[size],
      { '!pointer-events-none !h-10': loading },
      { 'border-none active:!scale-100': disabled },
    ]"
    class="relative transition-300 active:scale-95 group/button"
    v-bind="{ disabled, type }"
  >
    <div v-if="loading" class="flex-center w-full">
      <span class="spinner" />
    </div>
    <span
      v-else
      :class="[
        {
          '!opacity-0': loading,
          'flex-center justify-center gap-2': text?.length,
          'flex-row-reverse': iconPosition === 'left',
        },
        mainClass,
      ]"
      class="text-center whitespace-nowrap"
    >
      <slot>
        <span v-if="iconLeft?.length" :class="iconLeft" />
        <span v-if="text?.length"> {{ text }} </span>
        <span v-if="icon?.length" :class="icon" />
      </slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import type {
  TButtonSizes,
  TButtonVariants,
} from '~/types/components/button.types'

interface Props {
  variant?: TButtonVariants
  size?: TButtonSizes
  loading?: boolean
  mainClass?: string
  iconPosition?: 'left' | 'right'
  text?: string
  icon?: string
  iconLeft?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  text: 'Button',
  type: 'button',
  loading: false,
})

const variants: Record<TButtonVariants, string> = {
  primary:
    'bg-transparent text-dark disabled:!bg-gray-200 disabled:!border-none disabled:text-white hover:bg-red hover:text-white rounded-lg border border-red shadow',
  secondary:
    'bg-white text-dark rounded-lg disabled:!bg-gray-200 disabled:text-gray-300 hover:bg-gray-200',
  dark: 'bg-dark-100 text-white backdrop-blur-lg border-solid border-dark-200 border disabled:!bg-gray-200 disabled:text-gray-300 hover:bg-white hover:text-dark hover:border-transparent',
  gray: 'bg-[#E6EAED] text-gray transition-300 backdrop-blur-lg border-solid border disabled:!bg-gray-200 disabled:text-gray-300 hover:bg-white hover:text-dark hover:border-red rounded-lg',
  warning:
    'bg-red/[12%] text-red disabled:!bg-gray-200 disabled:text-gray-300 rounded-lg border border-transparent hover:bg-gray-100 hover:border-red',
  error:
    'bg-red text-white disabled:!bg-gray-200 disabled:text-gray-300 rounded-lg border border-red hover:bg-red/90',
}

const sizes: Record<TButtonSizes, string> = {
  small: 'py-2 px-4 text-xs font-medium leading-130',
  medium: 'py-[9px] text-base px-4 sm:px-6 font-medium text-base leading-120',
  large: 'py-3 px-7 font-medium text-sm leading-130',
}
</script>

<style scoped>
.spinner {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #971837 94%, #0000) top/3.8px 3.8px
      no-repeat,
    conic-gradient(#0000 30%, #971837);
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 3.8px),
    #000 0
  );
  animation: spinner-c7wet2 0.8s infinite linear;
}

@keyframes spinner-c7wet2 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
