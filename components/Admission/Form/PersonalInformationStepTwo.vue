<template>
  <form v-if="form" @submit.prevent>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <FormGroup
        :label="$t('apply_form.personal_information.first_name')"
        label-class="mb-1"
      >
        <FormInput
          v-model="form.values.firstName"
          :error="form.$v.value.firstName.$error"
          :placeholder="$t('apply_form.personal_information.enter_first_name')"
        />
      </FormGroup>

      <FormGroup
        :label="$t('apply_form.personal_information.last_name')"
        label-class="mb-1"
      >
        <FormInput
          v-model="form.values.lastName"
          :error="form.$v.value.lastName.$error"
          :placeholder="$t('apply_form.personal_information.enter_last_name')"
        />
      </FormGroup>

      <FormGroup
        :label="$t('apply_form.personal_information.father_name')"
        label-class="mb-1"
      >
        <FormInput
          v-model="form.values.fatherName"
          :error="form.$v.value.fatherName.$error"
          :placeholder="$t('apply_form.personal_information.enter_father_name')"
        />
      </FormGroup>

      <FormGroup
        :label="$t('apply_form.personal_information.gender')"
        label-class="mb-1"
      >
        <FormSelect
          v-model="form.values.gender"
          :error="form.$v.value.gender.$error"
          :options="genderList"
          :placeholder="$t('apply_form.personal_information.select_gender')"
          label-key="name"
          value-key="value"
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
        :label="$t('apply_form.personal_information.pinfl')"
        label-class="mb-1"
      >
        <FormInput
            type="number"
          v-model="form.values.pinfl"
          :error="form.$v.value.pinfl.$error"
          :placeholder="$t('apply_form.personal_information.pinfl')"
        />
      </FormGroup>
      <FormGroup
        :label="$t('apply_form.personal_information.avatar')"
        label-class="mb-1"
      >
        <FormFileInput
          v-model="form.values.avatar"
          :label="$t('choose_file')"
          :placeholder="$t('file_placeholder')"
          accept="image/*, application/pdf"
        />
      </FormGroup>

      <FormGroup
        v-if="!phoneVerification.values.with_otp"
        :label="$t('apply_form.phone_verification.phone_number')"
        label-class="mb-1"
      >
        <FormPhoneNumber
          v-model="form.values.phoneNumber"
          :error="form.$v.value.phoneNumber.$error"
          class="bg-[#F6F7F8] border-none rounded-lg py-px"
        />
      </FormGroup>
      <FormGroup
        v-if="!phoneVerification.values.with_otp"
        :label="$t('emergency_contact')"
        label-class="mb-1"
      >
        <FormPhoneNumber
          v-model="form.values.emergency_contact"
          :error="form.$v.value.emergency_contact.$error"
          class="bg-[#F6F7F8] border-none rounded-lg py-px"
        />
      </FormGroup>
    </div>

    <FormGroup
      :label="$t('apply_form.personal_information.citizenship')"
      label-class="mb-1 mt-4"
    >
      <FormSelect
        v-model="form.values.citizenship"
        :error="form.$v.value.citizenship.$error"
        :options="citizenship?.list"
        :placeholder="$t('apply_form.personal_information.select_citizenship')"
        infinite-scroll
        label-key="title"
        value-key="id"
        search-input
        @infinite-scroll="loadMore"
        @search-options="search"
      >
        <template #chevron="{ isOpen }">
          <span
            :class="{ '!-rotate-180': isOpen }"
            class="icon-chevron-down transition-300 inline-block text-xl leading-5 text-gray"
          />
        </template>
      </FormSelect>
    </FormGroup>
  </form>
</template>

<script lang="ts" setup>
import { unref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { personalFormOne, phoneVerification } from '~/data/admission.data'
import { useCommonStore } from '~/store/common'
import type { IParams } from '~/types'
import type { IPersonalInformationSecondStep } from '~/types/admission/index.types'

const props = defineProps<{
  form?: TForm<IPersonalInformationSecondStep>
}>()

const { form } = unref(props)
const { t } = useI18n()
const commonStore = useCommonStore()

const removeEmptySpaces = (str: string) => str.replace(/\s+/g, '')

const genderList = computed(() => {
  return [
    {
      id: 1,
      name: t('male'),
      value: 'male',
    },
    {
      id: 2,
      name: t('female'),
      value: 'female',
    },
  ]
})
const citizenship = computed(() => commonStore.citizenship)
const params: IParams = reactive({
  offset: 0,
  limit: 10,
})
commonStore.fetchCitizenship(params)
const loadMore = () => {
  params.offset += 10
  commonStore.fetchCitizenship(params, true)
}
const search = (val: string) => {
  params.offset = 0
  params.limit = 10
  params.search = val

  if (val === '') {
    delete params.search
    commonStore.fetchCitizenship(params)
  } else {
    debounce(
      'search_citizenship',
      () => {
        commonStore.fetchCitizenship(params)
      },
      100
    )
  }
}

const userAvatar = ref<string | null>(null)
function getFormValues() {
  const passportNumber = removeEmptySpaces(
    personalFormOne.values.passportSerialNumber
  )
  const birthDate = personalFormOne.values.birthDate
    .split('.')
    .reverse()
    .join('-')

  useApi()
    .$post('/admission/application-form/get-user-data/', {
      body: {
        passport: passportNumber,
        birth_date: birthDate,
      },
    })
    .then((res) => {
      form.values.firstName = res?.first_name
      form.values.lastName = res?.last_name
      form.values.fatherName = res?.second_name
      form.values.gender = res?.gender
      form.values.pinfl = res?.pinfl

      userAvatar.value = res?.avatar.file
      if (res?.avatar) {
        const filePath = res.avatar.file
        const fileName = filePath.substring(filePath.lastIndexOf('/') + 1)
        form.values.avatar = fileName
      }
      const citizenshipId = res?.citizenship?.id
      if (citizenshipId) {
        const foundCitizenship = commonStore.citizenship.list.find(
          (item) => item.id === citizenshipId
        )
        if (foundCitizenship) {
          form.values.citizenship = foundCitizenship?.id
        } else {
          commonStore.citizenship.list.push(res?.citizenship)
          form.values.citizenship = res?.citizenship.id
        }
      }
    })
    .catch((error) => {
      console.error('Error fetching user data:', error)
    })
}
onMounted(() => {
  getFormValues()
})
</script>

<style scoped></style>
