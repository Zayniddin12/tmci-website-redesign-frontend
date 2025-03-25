<template>
  <div class="bg-white rounded-3xl p-5">
    <h3 class="text-2xl font-medium">{{ $t('feedback.personal_details') }}</h3>
    <!-- warning-->
    <div class="bg-gray-200 rounded-2xl p-4 flex items-start gap-3 mt-3">
      <div
        class="bg-yellow rounded-full text-white grid place-items-center shrink-0 size-12 p-1"
      >
        <i class="icon-info-circle text-3.5xl align-middle" />
      </div>
      <div>
        <h3 class="text-base font-medium">
          {{ $t('feedback.alert.title') }}
        </h3>
        <p class="text-sm leading-tight">{{ $t('feedback.alert.info') }}</p>
      </div>
    </div>

    <!-- content-->

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 mt-6">
      <FormGroup
        :label="$t('feedback.form.student_id.label')"
        label-class="!font-normal"
      >
        <FormInput
          v-model="form.values.student_id"
          :placeholder="$t('feedback.form.student_id.placeholder')"
          input-class="placeholder:!font-normal"
          type="number"
        />
      </FormGroup>
      <FormGroup
        :label="$t('feedback.form.name.label')"
        is-required
        label-class="!font-normal"
      >
        <FormInput
          v-model="form.values.name"
          :error="form.$v.value.name?.$error"
          :placeholder="$t('feedback.form.name.placeholder')"
          input-class="placeholder:!font-normal"
        />
      </FormGroup>
      <FormGroup
        :label="$t('feedback.form.branch.label')"
        is-required
        label-class="!font-normal"
      >
        <FormSelect
          v-model="form.values.campus"
          :error="form.$v.value.campus.$error"
          :options
          :placeholder="$t('feedback.form.branch.placeholder')"
          label-key="title"
          value-key="id"
        />
      </FormGroup>
      <FormGroup
        :label="$t('feedback.form.college_program.label')"
        label-class="!font-normal"
      >
        <FormInput
          v-model="form.values.college_program"
          :placeholder="$t('feedback.form.college_program.placeholder')"
          input-class="placeholder:!font-normal"
        />
      </FormGroup>
      <FormGroup
        :label="$t('feedback.form.email.label')"
        is-required
        label-class="!font-normal"
      >
        <FormInput
          v-model="form.values.email"
          :error="form.$v.value.email?.$error"
          :placeholder="$t('feedback.form.email.placeholder')"
          input-class="placeholder:!font-normal"
        />
      </FormGroup>
      <FormGroup
        :label="$t('feedback.form.phone.label')"
        is-required
        label-class="!font-normal"
      >
        <FormPhoneNumber
          v-model="form.values.phone_number"
          :error="form.$v.value.phone_number?.$error"
          :placeholder="$t('feedback.form.phone.placeholder')"
          input-class="placeholder:!font-normal"
        />
      </FormGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IFeedbackForm } from '~/types'
import type { ICamp } from '~/types/common'

interface Props {
  options: ICamp[]
}

defineProps<Props>()
const form = defineModel<IFeedbackForm>()
</script>
