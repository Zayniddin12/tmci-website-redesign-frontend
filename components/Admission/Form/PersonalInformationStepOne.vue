<script lang="ts" setup>
import { onMounted, unref } from 'vue'

import type { TForm } from '@/composables/useForm'
import { useAdmissionStore } from '~/store/admission'
import type { IPersonalInformationFirstStep } from '~/types/admission/index.types'

const props = defineProps<{
  form?: TForm<IPersonalInformationFirstStep>
}>()

const store = useAdmissionStore()
onMounted(() => {
  store.fetchAdmission()
})
const { form } = unref(props)
</script>

<template>
  <form v-if="form" class="flex flex-col gap-4" @submit.prevent>
    <client-only>
      <FormGroup
        :label="$t('apply_form.personal_information.passport_serial_number')"
        label-class="mb-1"
      >
        <FormInput
          v-model="form.values.passportSerialNumber"
          v-maska="'AA #######'"
          :error="form.$v.value.passportSerialNumber.$error"
          :placeholder="
            $t('apply_form.personal_information.enter_passport_serial_number')
          "
          class="h-11"
        />
      </FormGroup>
    </client-only>

    <FormGroup
      :label="$t('apply_form.personal_information.date_of_birth')"
      label-class="mb-1"
    >
      <FormDatePicker
        v-model="form.values.birthDate"
        :error="form.$v.value.birthDate.$error"
        :max-date="new Date()"
        :placeholder="$t('apply_form.personal_information.place_of_birth')"
        class="h-11"
      />
    </FormGroup>
  </form>
</template>
