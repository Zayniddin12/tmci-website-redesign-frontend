<template>
  <div>
    <h2 class="font-bold text-xl sm:text-2xl md:text-[28px] my-6 text-center">
      {{ $t('submit_doc') }}
    </h2>
    <CardWrapper class="!bg-white">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <FormGroup :label="$t('form.full_name')">
          <FormInput
            v-model="form.values.student_full_name"
            :error="form.$v.value?.student_full_name?.$error"
            type="text"
            :placeholder="$t('form.enter_full_name')"
          />
        </FormGroup>

        <client-only>
          <FormGroup :label="$t('submenu.admissions.passport_series_number')">
            <FormInput
              v-model="form.values.student_passport"
              v-maska="'AA #######'"
              :error="form.$v.value?.student_passport?.$error"
              type="text"
              :placeholder="$t('enter_passport')"
            />
          </FormGroup>
        </client-only>

        <FormGroup :label="$t('field_of_study')">
          <FormSelect
            v-model="form.values.student_faculty"
            :error="form.$v.value?.student_faculty?.$error"
            :options="programs"
            :placeholder="$t('select_faculty')"
            label-key="title"
            value-key="slug"
          />
        </FormGroup>

        <FormGroup :label="$t('type_of_study')">
          <FormSelect
            v-model="form.values.student_study_format"
            :error="form.$v.value?.student_study_format?.$error"
            :options="studyFormats"
            :placeholder="$t('select_type_of_study')"
            label-key="title"
            value-key="slug"
          />
        </FormGroup>

        <FormGroup
          :label="$t('contract_number')"
          class="col-span-1 md:col-span-2"
        >
          <FormInput
            v-model="form.values.student_contract_number"
            :error="form.$v.value?.student_contract_number?.$error"
            type="text"
            :placeholder="$t('enter_contract_number')"
          />
        </FormGroup>

        <FormGroup :label="$t('friend.name')">
          <FormInput
            v-model="form.values.friend_full_name"
            :error="form.$v.value?.friend_full_name?.$error"
            type="text"
            :placeholder="$t('friend.enter_name')"
          />
        </FormGroup>

        <client-only>
          <FormGroup :label="$t('friend.passport')">
            <FormInput
              v-model="form.values.friend_passport"
              v-maska="'AA #######'"
              :error="form.$v.value?.friend_passport?.$error"
              type="text"
              :placeholder="$t('friend.enter_passport')"
            />
          </FormGroup>
        </client-only>

        <FormGroup :label="$t('friend.group_n')">
          <FormInput
            v-model="form.values.friend_group_n"
            :placeholder="$t('friend.enter_group_n')"
            :error="form.$v.value?.friend_group_n?.$error"
          />
        </FormGroup>

        <FormGroup :label="$t('friend.date_of_application')">
          <FormDatePicker
            v-model="form.values.friend_date_of_application"
            :error="form.$v.value?.friend_date_of_application?.$error"
          />
        </FormGroup>
      </div>

      <div class="flex justify-center md:justify-end mt-6">
        <BaseButton
          :text="$t('submit')"
          icon="icon-send-converted text-white text-lg"
          variant="error"
          class="min-w-[160px] md:min-w-[260px] max-w-max"
          :loading="buttonLoading"
          :disabled="form.$v.value.$invalid"
          @click="submit"
        />
      </div>
    </CardWrapper>
  </div>
</template>
<script setup lang="ts">
import { required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { useCustomToast } from '~/composables/useCustomToast'
import { useForm } from '~/composables/useForm'
import { useHomeStore } from '~/store/home'
import { useUniversityStore } from '~/store/unversity'
import type { IProgram } from '~/types/about/index.types'
import { formatDate } from '~/utils'

const { t } = useI18n()
const { showToast } = useCustomToast()
const { handleError } = useHandleError()
const buttonLoading = ref(false)
const homeStore = useHomeStore()
const universityStore = useUniversityStore()
const programs = computed(() => homeStore.programsList as IProgram[])
const studyFormats = computed(() => universityStore.areaOfStudy)

const form = useForm(
  {
    student_full_name: '',
    student_passport: '',
    student_faculty: '',
    student_study_format: '',
    student_contract_number: '',
    friend_full_name: '',
    friend_passport: '',
    friend_group_n: '',
    friend_date_of_application: '',
  },
  {
    student_full_name: { required },
    student_passport: { required },
    student_faculty: { required },
    student_study_format: { required },
    student_contract_number: { required },
    friend_full_name: { required },
    friend_passport: { required },
    friend_group_n: { required },
    friend_date_of_application: { required },
  }
)

function submit() {
  form.$v.value.$touch()
  const formData = {
    full_name: form.values.student_full_name,
    passport_info: form.values.student_passport,
    group: form.values.friend_group_n,
    field_of_study: form.values.student_faculty,
    type_of_study: form.values.student_study_format,
    contract_number: form.values.student_contract_number,
    friend_full_name: form.values.friend_full_name,
    friend_passport_info: form.values.friend_passport,
    date_of_application: formatDate(form.values.friend_date_of_application),
  }
  buttonLoading.value = true
  useApi()
    .$post('static/friend-referral/apply/', {
      body: formData,
    })
    .then(() => {
      for (const key in form.values) {
        form.values[key] = ''
      }
      form.$v.value.$reset()
      showToast(t('successfully_submitted'), 'success')
    })
    .catch((err) => {
      handleError(err)
    })
    .finally(() => {
      buttonLoading.value = false
    })
}

onMounted(() => {
  universityStore.fetchAreaOfStudy()
})
</script>

<style scoped></style>
