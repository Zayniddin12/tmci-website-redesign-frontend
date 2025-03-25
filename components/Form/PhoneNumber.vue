<template>
  <div ref="inputWrapper" class="phone-input relative">
    <i
      :class="valid ? 'opacity-0' : 'opacity-100'"
      class="icon-global transition-200 text-2xl h-6 text-gray-100 absolute-y left-2 flex-center"
    />

    <VueTelInput
      ref="phoneInput"
      v-model="phone"
      :auto-default-country
      :class="[
        {
          invalid: !valid,
          '!border-red !bg-[#FEF7F7]': invalidError || error,
        },
      ]"
      :disabled="readonly"
      :input-options="{ placeholder, maxlength: 20 }"
      class="py-0.5 bg-gray-100 border-transparent"
      default-country="uz"
      valid-characters-only
      @validate="handleValidatedPhone"
      @update:model-value="onPhoneNumberChange"
    />
  </div>
</template>

<script lang="ts" setup>
import '@/assets/styles/vue-tel-input.css'

import { useEventListener } from '@vueuse/core'
import { AsYouType } from 'libphonenumber-js'
import { computed, onMounted, ref } from 'vue'
import { VueTelInput } from 'vue-tel-input'

interface Props {
  error?: boolean
  modelValue?: string
  placeholder?: string
  loading?: boolean
  readonly?: boolean
}

const props = defineProps<Props>()

interface Emits {
  (event: 'update:modelValue', value?: string): void

  (event: 'trigger', value: boolean): void

  (event: 'blur', value?: string): void

  (event: 'reset-validation'): void
}

const emit = defineEmits<Emits>()

const valid = ref(false)
const invalidError = ref(false)

const phone = computed({
  get() {
    return props.modelValue
  },
  set(value?: string) {
    emit('update:modelValue', value)
  },
})

const phoneInput = ref<HTMLElement>()
const inputWrapper = ref<HTMLElement>()

useEventListener(phoneInput, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'Backspace' && phone.value === '+') {
    e.preventDefault()
  }
})

const onFocus = () => {
  if (phone.value?.length === 0) {
    emit('update:modelValue', '+')
  }
}

const onBlur = () => {
  if (phone.value?.length === 1) {
    phone.value = undefined
    setTimeout(() => {
      emit('reset-validation')
    }, 10)
  }

  // On change tab validation touch method fires immediately. So we need to wait
  setTimeout(() => emit('blur', phone.value), 500)
}

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault()

  const pastedText = e.clipboardData?.getData('text/plain') || ''

  const hasDefaultPlus = phone.value?.startsWith('+')
  const hasPastedPlus = pastedText?.startsWith('+')
  const hasEnteredNumber = phone.value && phone.value?.length > 1

  if (hasDefaultPlus && hasPastedPlus) {
    phone.value = pastedText
  } else if (hasEnteredNumber) {
    phone.value = `${phone.value}${pastedText}`
  } else if (hasDefaultPlus && !hasPastedPlus) {
    phone.value = `+${pastedText}`
  } else if (!hasDefaultPlus && hasPastedPlus) {
    phone.value = pastedText
  } else if (!hasDefaultPlus && !hasPastedPlus) {
    phone.value = `+${pastedText}`
  }
}

onMounted(() => {
  const phoneInput = inputWrapper.value?.querySelector(
    '.phone-input input'
  ) as HTMLInputElement
  phoneInput.setAttribute('placeholder', props.placeholder || '')

  phoneInput.type = 'tel'

  phoneInput.onblur = onBlur
  phoneInput.onfocus = onFocus
  phoneInput.onpaste = onPaste

  // phoneInput.focus()

  if (props.modelValue) {
    phone.value = props.modelValue
  }
})

interface IValidateOptions {
  country: {
    dialCode: string
    iso2: string
    name: string
  }
  countryCode: string | undefined
  formatted: string | ''
  valid: boolean | undefined
  countryCallingCode?: string
  nationalNumber?: string
  number?: string
}

function handleValidatedPhone(options: IValidateOptions) {
  valid.value = !!options?.countryCode || false
  invalidError.value =
    !!options?.countryCode &&
    !options.valid &&
    options.formatted.length > String(options.number)?.length &&
    // The shortest phone number length (formatted) will be more than 10
    // Before this solution when user entered '+99899' the trigger fired
    // and input border color changed to red. This solution helps to prevent this
    String(options.number)?.length > 10
  emit('trigger', invalidError.value)
}

const onPhoneNumberChange = (value: string) => {
  if (!value.startsWith('+')) {
    const newValue = value.split('+').join('')
    phone.value = new AsYouType().input('+' + newValue)
  } else {
    phone.value = new AsYouType().input(value)
  }
}
</script>

<style>
.phone-input .vue-tel-input {
  @apply rounded-md border focus-within:border-red transition-all duration-200 focus-within:bg-white;
}

.phone-input .vti__input {
  @apply ml-2;
}

.phone-input input {
  @apply py-2 pl-0 bg-transparent text-base md:text-sm font-medium text-dark;
}

.phone-input input::placeholder {
  @apply text-sm font-medium text-gray-400;
}
</style>
