<template>
  <div class="bg-white rounded-3xl p-5 grid gap-4">
    <h3 class="text-2xl font-medium">{{ $t('feedback.personal_details') }}</h3>
    <!-- content-->
    <div class="grid gap-4">
      <div class="flex flex-col md:flex-row gap-4">
        <FormGroup
          :label="$t('feedback.form.feedback_type.label')"
          class="w-full"
        >
          <FormSelect
            v-model="form.values.feedback_type"
            :options="feedbackTypes"
            :placeholder="$t('feedback.form.feedback_type.placeholder')"
            class="w-full"
            label-key="title"
            value-key="id"
            @click.stop
          />
        </FormGroup>

        <FormGroup
          :label="$t('feedback.form.question_type.label')"
          class="w-full"
        >
          <FormSelect
            v-model="form.values.question_type"
            :options="questionTypes"
            :placeholder="$t('feedback.form.question_type.placeholder')"
            class="w-full"
            label-key="title"
            value-key="id"
            @click.stop
          />
        </FormGroup>
      </div>
      <FormGroup :label="$t('feedback.form.details.label')" is-required>
        <FormTextarea
          v-model="form.values.details"
          :error="form.$v.value.details?.$error"
          :placeholder="$t('feedback.form.details.placeholder')"
        />
      </FormGroup>
    </div>

    <BaseButton
      :loading
      :text="$t('feedback.form.submit.label')"
      class="ml-auto w-full max-w-sm"
      icon="icon-send-converted"
      type="button"
      variant="error"
      @click="$emit('submit')"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IFeedbackForm } from '~/types'
import type { IFeedbackType } from '~/types/common'

interface Emits {
  (e: 'submit'): void
}

interface Props {
  loading: boolean
  feedbackTypes: IFeedbackType[]
  questionTypes: IFeedbackType[]
}

defineProps<Props>()
defineEmits<Emits>()
const form = defineModel<IFeedbackForm>()
</script>
