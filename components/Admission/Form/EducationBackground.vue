<script lang="ts" setup>
import { unref } from 'vue'

import type { TForm } from '@/composables/useForm'
import { useAdmissionStore } from '~/store/admission'
import { useCommonStore } from '~/store/common'
import type { IEducationBackground } from '~/types/admission/index.types'

const props = defineProps<{
  form: TForm<IEducationBackground>
}>()

const { form } = unref(props)
const admissionStore = useAdmissionStore()
const commonStore = useCommonStore()

const highQualificationOptions = computed(
  () => admissionStore.highestQualification
)
const country = computed(() => commonStore.country)
const city = computed(() => commonStore.city)

const isInternationalApplicant = computed(() => form.values.isInternational)

// get min date with start_date format "YYYY-MM-DD"
const minDate = computed(() => {
  const startDate = form.values.start_date
  return startDate ? new Date(startDate) : new Date()
})

admissionStore.getHighestQualification()
commonStore.fetchCountry()

watch(
  () => form.values.region,
  (region) => {
    commonStore.fetchCity(region)
  },
  { deep: true }
)
</script>

<template>
  <form v-if="form" class="grid grid-cols-2 gap-4" @submit.prevent>
    <template v-if="!isInternationalApplicant">
      <FormGroup
        :label="$t('apply_form.education_background.highest_qualification')"
        class="col-span-2"
        label-class="mb-1"
      >
        <FormSelect
          v-model="form.values.highQualification"
          :error="form.$v.value.highQualification.$error"
          :options="highQualificationOptions"
          :placeholder="
            $t('apply_form.education_background.select_qualification')
          "
          label-key="title"
        >
          <template #chevron="{ isOpen }">
            <span
              :class="{ '!-rotate-180': isOpen }"
              class="icon-chevron-down transition-300 inline-block text-xl leading-5 text-gray"
            />
          </template>
        </FormSelect>
      </FormGroup>
    </template>

    <FormGroup
      :label="$t('apply_form.education_background.name_school')"
      class="col-span-2"
      label-class="mb-1"
    >
      <FormInput
        v-model="form.values.name"
        :error="form.$v.value.name.$error"
        :placeholder="$t('enter_your_answer')"
      />
    </FormGroup>

    <FormGroup
      :label="$t('apply_form.education_background.region')"
      class="col-span-2 md:col-span-1"
      label-class="mb-1"
    >
      <FormSelect
        v-model="form.values.region"
        :error="form.$v.value.region.$error"
        :options="country.list"
        :placeholder="$t('apply_form.education_background.select_region')"
      >
        <template #chevron="{ isOpen }">
          <span
            :class="{ '!-rotate-180': isOpen }"
            class="icon-chevron-down transition-300 inline-block text-xl leading-5 text-gray"
          />
        </template>
      </FormSelect>
    </FormGroup>

    <FormGroup
      :label="$t('apply_form.education_background.district')"
      class="col-span-2 md:col-span-1"
      label-class="mb-1"
    >
      <FormSelect
        v-model="form.values.district"
        :disabled="!form.values.region"
        :error="form.$v.value.district.$error"
        :options="city.list"
        :placeholder="$t('apply_form.education_background.select_district')"
      >
        <template #chevron="{ isOpen }">
          <span
            :class="{ '!-rotate-180': isOpen }"
            class="icon-chevron-down transition-300 inline-block text-xl leading-5 text-gray"
          />
        </template>
      </FormSelect>
    </FormGroup>

    <FormGroup
      :label="$t('apply_form.education_background.start_date')"
      class="col-span-2 md:col-span-1"
      label-class="mb-1"
    >
      <FormDatePicker
        v-model="form.values.start_date"
        :error="form.$v.value.start_date.$error"
        :max-date="new Date()"
        :placeholder="$t('date_placeholder')"
      />
    </FormGroup>

    <FormGroup
      :label="$t('apply_form.education_background.end_date')"
      class="col-span-2 md:col-span-1"
      label-class="mb-1"
    >
      <FormDatePicker
        v-model="form.values.end_date"
        :error="form.$v.value.end_date.$error"
        :min-date="minDate"
        :placeholder="$t('date_placeholder')"
      />
    </FormGroup>

    <FormGroup
      :label="$t('apply_form.education_background.diploma')"
      class="col-span-2"
      label-class="mb-1"
    >
      <FormFileInput
        v-model="form.values.diploma"
        :error="form.$v.value.diploma.$error"
        :label="$t('choose_file')"
        :placeholder="$t('file_placeholder')"
        accept="image/*, application/pdf"
      />
    </FormGroup>
  </form>
</template>

<style scoped></style>
