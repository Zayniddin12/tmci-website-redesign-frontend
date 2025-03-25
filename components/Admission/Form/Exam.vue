<script lang="ts" setup>
import { unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import type { TForm } from '@/composables/useForm'
import { useAdmissionStore } from '~/store/admission'
import type { IExamForm } from '~/types/admission/index.types'
import { dtmScore } from '~/utils'

const props = defineProps<{
  form?: TForm<IExamForm>
}>()
const { t } = useI18n()
const { form } = unref(props)
const admissionStore = useAdmissionStore()
const route = useRoute()

const entranceExamOptions = computed(() => admissionStore.examOptions)
const agentSlug = route.params.slug || undefined

const optionsList = computed(() => {
  if (route.path === '/apply/program' || route.path === `/agent/${agentSlug}/apply/program`) {
    return [
      {
        label: t('apply_form.english_proficiency.entrance_exam'),
        value: 'entrance_exam',
      },
      {
        label: t('apply_form.english_proficiency.dtm_result'),
        value: 'dtm_result',
      },
      {
        label: t('apply_form.english_proficiency.transfer_studies'),
        value: 'transfer_studies',
      },
    ]
  } else if (route.path === '/apply/scholarship' || route.path === `/agent/${agentSlug}/apply/scholarship`) {
    return [
      {
        label: t('apply_form.english_proficiency.entrance_exam'),
        value: 'entrance_exam',
      },
    ]
  }
})

onMounted(() => {
  if (route.path.includes('/program')) {
    admissionStore.getEntranceExams('program_local')
  } else {
    admissionStore.getEntranceExams('scholarship_local')
  }
})
</script>

<template>
  <form
    v-if="form"
    :class="{
      'grid-cols-1 gap-5': form.values.entrance_via === 'entrance_exam',
      'grid-cols-2 gap-4': form.values.entrance_via !== 'entrance_exam',
    }"
    class="grid"
    @submit.prevent
  >
    <FormGroup
      :label="$t('admission.steps.english_proficiency')"
      class="col-span-2 md:col-span-1"
      label-class="mb-1"
    >
      <FormSelect
        v-model="form.values.entrance_via"
        :error="form.$v.value.entrance_via.$error"
        :label-key="$t('label')"
        :options="optionsList"
        :placeholder="$t('apply_form.english_proficiency.select_entrance_via')"
        :value-key="$t('value')"
      />
    </FormGroup>

    <!-- Show DTM select field if entranceVia is 'dtm' -->
    <client-only>
      <FormGroup
        v-if="form.values.entrance_via === 'dtm_result'"
        :label="$t('apply_form.english_proficiency.dtm_score')"
        class="col-span-2 md:col-span-1"
        label-class="mb-1"
      >
        <FormInput
          v-model.number="form.values.dtm_score"
          v-maska="dtmScore()"
          :error="form.$v.value.dtm_score.$error"
          :label-key="$t('label')"
          :placeholder="$t('apply_form.english_proficiency.enter_your_score')"
          :value-key="$t('value')"
        />
      </FormGroup>
    </client-only>

    <FormGroup
      v-if="form.values.entrance_via === 'dtm_result'"
      :label="$t('apply_form.english_proficiency.dtm_certificate')"
      class="col-span-2"
      label-class="mb-1"
    >
      <FormFileInput
        v-model="form.values.dtm_application"
        :error="form.$v.value.dtm_application.$error"
        :label="$t('choose_file')"
        :placeholder="$t('file_placeholder')"
        accept="image/*, application/pdf"
        @update:model-value="form.values.dtm_application = $event"
      />
    </FormGroup>

    <!-- Show content related to entrance exams if entranceVia is 'entrance_exam' -->
    <template v-if="form.values.entrance_via === 'entrance_exam'">
      <div class="flex flex-col gap-4">
        <CardApplyCardEducation
          v-for="(exam, idx) in entranceExamOptions"
          :key="idx"
          :exam="exam"
          :form="form"
        />
      </div>
    </template>

    <!-- Show content related to entrance exams if entranceVia is 'transfer_studiesw' -->
    <template v-if="form.values.entrance_via === 'transfer_studies'">
      <div class="col-span-2">
        <FormGroup
          :label="$t('apply_form.education_background.application')"
          class="col-span-2"
          label-class="mb-1"
        >
          <FormFileInput
            v-model="form.values.transfer_application"
            :error="form.$v.value.transfer_application.$error"
            :label="$t('choose_file')"
            :placeholder="$t('file_placeholder')"
            accept="image/*, application/pdf"
          />
        </FormGroup>

        <FormGroup
          :label="$t('apply_form.education_background.transcript')"
          class="col-span-2 mt-4"
          label-class="mt-1"
        >
          <FormFileInput
            v-model="form.values.transfer_transcript"
            :error="form.$v.value.transfer_transcript.$error"
            :label="$t('choose_file')"
            :placeholder="$t('file_placeholder')"
            accept="image/*, application/pdf"
          />
        </FormGroup>
      </div>
    </template>
  </form>
</template>
