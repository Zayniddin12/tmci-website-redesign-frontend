<script lang="ts" setup>
import { unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import type { TForm } from '@/composables/useForm'
import { useAdmissionStore } from '~/store/admission'
import type { IExamForm } from '~/types/admission/index.types'

const props = defineProps<{
  form?: TForm<IExamForm>
}>()
const { t } = useI18n()
const { form } = unref(props)
const route = useRoute()

const admissionStore = useAdmissionStore()
console.log("admissionStore",admissionStore)
const entranceExamOptions = computed(() => admissionStore.examOptions)
const ieltsScore = computed(() => {
  if (route.path.includes('/program')) {
    return admissionStore.localIeltsScore
  } else {
    return admissionStore.internationalIeltsScore
  }
})

const optionsList = computed(() => {
  return [
    {
      label: t('apply_form.english_proficiency.entrance_exam'),
      value: 'entrance_exam',
    },
    {
      label: t('apply_form.english_proficiency.ielts'),
      value: 'ielts_score',
    },
    {
      label: 'Duolingo',
      value: 'duolingo',
    },
  ]
})

onMounted(() => {
  if (route.path.includes('/program')) {
    admissionStore.getLocalIeltsScore()
    admissionStore.getEntranceExams('program_international')
  } else {
    admissionStore.getInternationalIeltsScore()
    admissionStore.getEntranceExams('scholarship_international')
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

    <!-- Show IELTS score select field if entranceVia is 'ielts' -->
    <FormGroup
      v-if="form.values.entrance_via === 'ielts_score'"
      :label="$t('apply_form.english_proficiency.ielts_score')"
      class="col-span-2 md:col-span-1"
      label-class="mb-1"
    >
      <FormSelect
        v-model="form.values.ielts_score"
        :error="form.$v.value.ielts_score.$error"
        :options="ieltsScore"
        :placeholder="$t('apply_form.english_proficiency.select_ielts_score')"
        label-key="name"
        value-key="id"
      />
    </FormGroup>
    <FormGroup
      v-if="form.values.entrance_via === 'duolingo'"
      v-maska="'###'"
      label="Duolingo"
      class="col-span-2 md:col-span-1"
      label-class="mb-1"
    >
      <FormInput
        v-model="form.values.duolingo_score"
        :error="form.$v.value.duolingo_score.$error"
        placeholder="Duolingo"
      />
    </FormGroup>

    <FormGroup
      v-if="
        form.values.entrance_via === 'ielts_score' ||
        form.values.entrance_via === 'duolingo'
      "
      :label="$t('apply_form.education_background.diploma')"
      class="col-span-2"
      label-class="mb-1"
    >
      <FormFileInput
        v-model="form.values.certificate"
        :error="form.$v.value.certificate.$error"
        :label="$t('choose_file')"
        :placeholder="$t('file_placeholder')"
        accept="image/*, application/pdf"
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
  </form>
</template>
