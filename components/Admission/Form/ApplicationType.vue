<script setup lang="ts">
import { ref, unref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import type { TForm } from '@/composables/useForm'
import { applicationTypeList } from '~/data/admission.data'
import { useHomeStore } from '~/store/home'
import type { IApplicationType } from '~/types/admission/index.types'

const props = defineProps<{
  form?: TForm<IApplicationType>
}>()

const { form } = unref(props)

const { t } = useI18n()

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

const savedApplicationType = getCookie('applicationType')
const selectedAdmissionType = ref(
  savedApplicationType ? parseInt(savedApplicationType) : null
)

watch(
  () => form.values.applicationType,
  (value) => {
    selectedAdmissionType.value = value
    setCookie('applicationType', value.toString(), 1)
    if (value === 2) {
      setCookie('locale', 'en', 1)
    } else if (value === 1) {
      setCookie('locale', 'uz', 1)
    }
  }
)

if (form.values.applicationType === null && savedApplicationType !== null) {
  form.values.applicationType = parseInt(savedApplicationType)
}
</script>

<template>
  <form v-if="form" class="flex flex-col gap-4" @submit.prevent>
    <form-group :label="t('apply_form.application.type')" label-class="mb-1">
      <form-select
        v-model="form.values.applicationType"
        :error="form.$v.value.applicationType.$error"
        :options="applicationTypeList()"
        :placeholder="t('apply_form.application.select_type')"
        label-key="value"
        value-key="id"
      >
        <template #chevron="{ isOpen }">
          <span
            :class="{ '!-rotate-180': isOpen }"
            class="icon-chevron-down transition-300 inline-block text-xl leading-5 text-gray"
          />
        </template>
      </form-select>
    </form-group>

    <form-group
      :label="t('apply_form.personal_information.email')"
      label-class="mb-1"
    >
      <form-input
        v-model="form.values.email"
        :error="form.$v.value.email.$error"
        :placeholder="t('apply_form.personal_information.enter_email')"
        type="email"
      />
    </form-group>
  </form>
</template>
