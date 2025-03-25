<template>
  <div class="c-date-picker relative">
    <VueDatePicker
      ref="datePicker"
      auto-apply
      :month-change-on-scroll="false"
      text-input
      :text-input-options="{
        enterSubmit: true,
        openMenu: false,
        format: 'dd.MM.yyyy',
      }"
      :hide-navigation="[
        'month',
        'year',
        'calendar',
        'time',
        'minutes',
        'hours',
        'seconds',
      ]"
      :max-date="new Date()"
      :year-range="yearRange"
      format="dd.MM.yyyy"
      :format-locale="formatLocale"
      @update:model-value="onChangeValue"
    >
      <template #dp-input>
        <FormInput
          v-maska="'##.##.####'"
          v-bind="{ error, disabled }"
          :model-value="value"
          :placeholder="$t('form.date_placeholder')"
          class="!p-2"
          @update:model-value="value = $event"
          @blur="emit('blur')"
        >
          <template #suffix>
            <i class="icon-calendar-event text-2xl text-gray" />
          </template>
        </FormInput>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'

import VueDatePicker from '@vuepic/vue-datepicker'
import enUS from 'date-fns/locale/en-US/index'
import ru from 'date-fns/locale/ru/index'
import uz from 'date-fns/locale/uz/index'
import uzCyrl from 'date-fns/locale/uz-Cyrl/index'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  modelValue: string
  error?: boolean
  disabled?: boolean
  range?: boolean
  customClass?: string
  inputClass?: string
}
const props = defineProps<Props>()

interface Emits {
  (event: 'blue'): void
  (event: 'update:modelValue', value: string): void
}
const emit = defineEmits<Emits>()

const { locale } = useI18n()

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const yearRange = [new Date().getFullYear() - 100, new Date().getFullYear()]

const formatLocale = computed(() => {
  const locales = {
    uz,
    uzc: uzCyrl,
    kaa: uz,
    ru,
    en: enUS,
  }

  return locales[locale.value as keyof typeof locales]
})

const datePicker = ref()

const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value ? datePicker.value?.closeMenu() : datePicker.value?.openMenu()
  showMenu.value = !showMenu.value
}

const onChangeValue = (val: string) => {
  value.value = dayjs(val).format('DD.MM.YYYY')
  showMenu.value = false
}
</script>

<style>
.c-date-picker .dp__overlay_container {
  height: 288px !important;
}

.c-date-picker .dp__input {
  padding: 8px 12px !important;
}

.c-date-picker .dp__input_wrap svg {
  display: none !important;
}
</style>
