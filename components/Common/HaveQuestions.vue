<script lang="ts" setup>
import { required } from '@vuelidate/validators'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useCustomToast } from '~/composables/useCustomToast'
import { useForm } from '~/composables/useForm'
import { useHandleError } from '~/composables/useHandleError'
import { useHomeStore } from '~/store/home'
import type { IDepartmentContact } from '~/types/home.types'
import { formatPhoneNumber } from '~/utils'

defineProps<{
  bodyClass?: string
}>()

const loading = ref(false)
const store = useHomeStore()
const { showToast } = useCustomToast()
const { handleError } = useHandleError()
const { t } = useI18n()
const form = useForm(
  {
    full_name: '',
    phone_number: '',
    question: '',
  },
  {
    full_name: { required },
    phone_number: { required },
    question: { required },
  }
)

store.fetchDepartmentContact()
const contact = computed(() => store.departmentContacts as IDepartmentContact[])

function submit() {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    loading.value = true
    const questionFormData = new FormData()
    questionFormData.append('full_name', form.values.full_name)
    questionFormData.append(
      'phone_number',
      `+998${form.values.phone_number.replaceAll(' ', '').replaceAll('-', '')}`
    )
    questionFormData.append('question', form.values.question)

    useApi()
      .$post('static/ask-question/', {
        body: questionFormData,
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
        loading.value = false
      })
  }
}
</script>

<template>
  <div
    :class="[bodyClass]"
    class="relative flex md:gap-5 flex-col md:flex-row w-full bg-gray-100 rounded-3xl"
  >
    <div class="p-5 md:p-9 w-full">
      <div class="max-w-[456px] space-y-5">
        <div class="space-y-3">
          <i18n-t class="base-title-style !mb-0" keypath="have" tag="p">
            <template #question>
              <span class="text-red">{{ $t('questions') }}</span>
            </template>
          </i18n-t>

          <p class="max-w-[402px] text-sm sm:text-base font-medium">
            {{ $t('any_questions') }}
          </p>
        </div>

        <div class="flex gap-3 md:gap-5">
          <a
            v-if="store.contactInfo.phone_1"
            :href="'tel:' + store.contactInfo.phone_1"
            class="flex flex-1 items-center gap-1.5 p-2 md:p-3 bg-transparent duration-200 hover:bg-white border border-gray-300 hover:border-red hover:shadow-main rounded-xl"
          >
            <i class="text-2xl text-gray icon-phone h-6 flex-center"></i>
            <p class="text-sm truncate sm:text-base font-medium">
              {{ formatPhoneNumber(store.contactInfo.phone_1) }}
            </p>
          </a>
          <a
            class="flex flex-1 items-center gap-1.5 p-2 md:p-3 bg-transparent duration-200 hover:bg-white border border-gray-300 hover:border-red hover:shadow-main rounded-xl"
            href="mailto:info@tmci.uz"
          >
            <i class="text-2xl text-gray icon-mail h-6 flex-center"></i>
            <p class="text-sm truncate sm:text-base font-medium">
              info@tmci.uz
            </p></a
          >
        </div>
      </div>
    </div>

    <div
      class="shadow-main max-w-full md:max-w-[582px] w-full bg-white lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 p-4 md:p-6 space-y-4 md:space-y-6 rounded-[20px] border border-gray-300"
    >
      <div class="md:mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <FormGroup :label="$t('form.full_name')">
            <FormInput
              v-model="form.values.full_name"
              :error="form.$v.value?.full_name?.$error"
              :placeholder="$t('form.enter_full_name')"
              input-wrapper-class="h-full"
              required
              type="text"
            />
          </FormGroup>

          <client-only>
            <FormGroup :label="$t('form.phone_number')">
              <FormInput
                v-model="form.values.phone_number"
                v-maska="'## ###-##-##'"
                :error="form.$v.value?.phone_number?.$error"
                :placeholder="$t('phone_placeholder')"
              >
                <template #prefix>
                  <p class="text-base font-medium sm:text-sm">+998</p>
                </template>
              </FormInput>
            </FormGroup>
          </client-only>
        </div>

        <FormGroup :label="$t('question')" class="mt-2 md:mt-4">
          <FormTextarea
            v-model="form.values.question"
            :error="form.$v.value?.question?.$error"
            :maxlength="400"
            :placeholder="$t('write_your_question')"
            :rows="4"
            required
            type="text"
          />
        </FormGroup>
      </div>

      <div class="w-full">
        <BaseButton
          :disabled="loading"
          :loading="loading"
          :text="$t('send')"
          class="min-w-[174px] text-center !ml-auto flex-center !h-10 max-w-max"
          icon="icon-send-converted text-white text-lg"
          icon-position="right"
          variant="error"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>
