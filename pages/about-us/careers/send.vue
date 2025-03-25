<script lang="ts" setup>
import { email, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useCustomToast } from '~/composables/useCustomToast'
import { useForm } from '~/composables/useForm'
import { useHandleError } from '~/composables/useHandleError'
import { useAboutStore } from '~/store/about'
import { useCommonStore } from '~/store/common'
import type { IDefaultResponse } from '~/types'
import type { IVacancyList } from '~/types/about/index.types'

const { t } = useI18n()
const { showToast } = useCustomToast()
const { handleError } = useHandleError()
const aboutStore = useAboutStore()
const store = useCommonStore()
const route = useRoute()
const buttonLoading = ref(false)
const vacancy = computed(
  () => aboutStore.vacancyList as IDefaultResponse<IVacancyList>
)

aboutStore.fetchVacancy()
const routes = [
  {
    name: t('about_us'),
    path: '/about-us',
  },
  {
    name: t('submenu.about.careers'),
    path: '/about-us/careers',
  },
]

const form = useForm(
  {
    first_name: '',
    last_name: '',
    email: '',
    birth_date: '',
    vacancy: route?.query?.vacancy ?? '',
    cv: '',
  },
  {
    first_name: { required },
    last_name: { required },
    email: { required, email },
    birth_date: { required },
    vacancy: { required },
    cv: { required },
  }
)

function submit() {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    buttonLoading.value = true
    store
      .fileUpload(form.values.cv)
      .then((res) => {
        send(res)
      })
      .catch((error) => {
        handleError(error)
      })
  }
}

function send(file: { file: string; id: number }) {
  useApi()
    .$post('application/', {
      body: {
        first_name: form.values.first_name,
        last_name: form.values.last_name,
        email: form.values.email,
        birth_date: form.values.birth_date.split('.').reverse().join('-'),
        vacancy_slug: form.values.vacancy,
        cv: file?.id,
      },
    })
    .then(() => {
      for (const key in form.values) {
        form.values[key] = ''
      }
      form.$v.value.$reset()
      showToast(t('successfully_submitted'), 'success')
    })
    .catch((error) => {
      handleError(error)
    })
    .finally(() => {
      buttonLoading.value = false
    })
}
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />

    <div class="container pb-8">
      <h3 class="text-center mt-3 title-style mb-4 md:mb-6">
        {{ $t('submit_doc') }}
      </h3>

      <CardWrapper class="!bg-white mx-auto w-full max-w-[782px]">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <FormGroup :label="$t('form.first_name')">
            <FormInput
              v-model="form.values.first_name"
              :error="form.$v.value?.first_name?.$error"
              :placeholder="$t('form.enter_first_name')"
              required
              type="text"
            />
          </FormGroup>

          <FormGroup :label="$t('form.last_name')">
            <FormInput
              v-model="form.values.last_name"
              :error="form.$v.value?.last_name?.$error"
              :placeholder="$t('form.enter_last_name')"
              required
              type="text"
            />
          </FormGroup>

          <FormGroup :label="$t('form.email')">
            <FormInput
              v-model="form.values.email"
              :error="form.$v.value?.email?.$error"
              :placeholder="$t('form.enter_email')"
              required
              type="text"
            />
          </FormGroup>

          <FormGroup :label="$t('form.date_of_birth')">
            <FormDatePicker
              v-model="form.values.birth_date"
              :error="form.$v.value?.birth_date?.$error"
              :placeholder="$t('form.select_date')"
              required
            />
          </FormGroup>

          <FormGroup :label="$t('form.position')">
            <FormSelect
              v-model="form.values.vacancy"
              :error="form.$v.value?.vacancy?.$error"
              :options="vacancy?.results"
              :placeholder="$t('form.select_position')"
              label-key="title"
              required
              value-key="slug"
            />
          </FormGroup>

          <FormGroup :label="$t('form.your_cv')">
            <form-file-input
              v-model="form.values.cv"
              :error="form.$v.value.cv?.$error"
              :label="$t('choose_file')"
              :placeholder="$t('drag_drop')"
              accept="image/*, application/pdf"
            />
          </FormGroup>
        </div>

        <div class="flex justify-end mt-6">
          <BaseButton
            :disabled="buttonLoading"
            :loading="buttonLoading"
            :text="$t('submit')"
            class="min-w-[126px] max-w-max"
            icon="icon-send-converted text-white text-lg"
            icon-position="right"
            type="button"
            variant="error"
            @click="submit"
          />
        </div>
      </CardWrapper>
    </div>

    <div class="lg:mt-[160px]">
      <CommonDownloadApp />
    </div>
  </div>
</template>

<style scoped></style>
