<template>
  <div
    :class="[{ '!border-red': error }, inputWrapperClass]"
    class="bg-gray-100 rounded-lg border border-gray-100 transition-300 focus-within:border-red focus-within:bg-white flex items-center gap-1 p-3"
  >
    <slot name="prefix" />
    <input
      :id="inputId"
      ref="Input"
      :class="[inputClass]"
      :value="modelValue"
      class="w-full h-full text-base font-medium sm:text-sm caret-red bg-transparent outline-none text-dark placeholder:text-gray"
      v-bind="{
        id,
        type,
        minlength,
        maxlength,
        max,
        min,
        disabled,
        placeholder,
        readonly,
        autocomplete,
      }"
      @blur="$emit('blur')"
      @focus="handleFocus"
      @focusout="$emit('focusout')"
      @input="handleInput"
      @keyup.enter="handleEnter"
    />
    <slot name="suffix" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

export interface Props {
  id?: string
  type?: string
  placeholder?: string
  modelValue: number | string
  disabled?: boolean
  error?: boolean
  focus?: boolean
  maxlength?: number
  minlength?: number
  max?: number
  min?: number
  inputClass?: string | string[]
  inputWrapperClass?: string | string[]
  autocomplete?: string
  inputId?: string
  readonly?: boolean
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur'): void
  (e: 'focusout'): void
  (e: 'focus'): void
  (e: 'enter'): void
}>()

const handleInput = (e: { target: HTMLInputElement }) => {
  emit('update:modelValue', e.target.value)
}
const handleEnter = () => {
  emit('enter')
}
const Input = ref()
defineExpose({ Input })

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  maxlength: 99,
  modelValue: '',
  minlength: undefined,
  max: undefined,
  min: undefined,
  inputClass: undefined,
  autocomplete: 'new-password',
})

const handleFocus = () => {
  emit('focus')
}
watch(
  () => props?.focus,
  (value) => {
    if (value) {
      Input?.value?.focus()
    }
  },
  { deep: true, immediate: true }
)
</script>

<style>
input[type='number']::-webkit-inner-spin-button {
  display: none;
}
</style>
