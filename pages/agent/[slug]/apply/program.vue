<template>
  <main class="min-h-[calc(100vh-586px)]">
    <ClientOnly>
      <BaseBreadcrumb :routes="breadcrumbs" class="mb-3 !bg-gray-100" />
      <AdmissionWrapperMain
        v-if="!isSuccessfully"
        :title="t('application_for_programs')"
      >
        <template #content>
          <section class="lg:grid lg:grid-cols-4 gap-5">
            <aside class="col-span-4 lg:col-span-1 mb-5 lg:mb-0">
              <AdmissionStepper
                :active-step="currentStep"
                :stepper-list="currentStepList()"
              />
            </aside>
            <CommonCard class="col-span-4 lg:col-span-3 relative h-max">
              <template #content>
                <div
                  v-if="loading"
                  class="flex items-center justify-center rounded-[24px] absolute top-0 left-0 right-0 bottom-0 bg-white !h-[300px]"
                >
                  <div class="spinner"></div>
                </div>
                <section v-else class="flex flex-col">
                  <Transition mode="out-in" name="fade">
                    <component
                      :is="getCurrentComponent?.component"
                      :form="getCurrentComponent?.form"
                    />
                  </Transition>

                  <AdmissionCardActions
                    :current-step="currentStep"
                    :disabled="!!getCurrentComponent?.form.$v.value.$error"
                    :loading="
                      loading && currentStep === currentComponentList.length
                    "
                    :button-loading="buttonLoading"
                    @back="back"
                    @continue="next"
                  />
                </section>
              </template>
            </CommonCard>
          </section>
        </template>
      </AdmissionWrapperMain>
      <AdmissionCardSuccessStatus v-else />

      <AdmissionCardVerifyPhoneNumber
        :seconds="seconds"
        :show="showPhoneNumberModal"
        @close="showPhoneNumberModal = false"
        @resend="resend"
        @submit="verifyPhoneNumber"
      />
    </ClientOnly>
  </main>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import ApplicationType from '~/components/Admission/Form/ApplicationType.vue'
import Direction from '~/components/Admission/Form/Direction.vue'
import EducationBackground from '~/components/Admission/Form/EducationBackground.vue'
import EnglishProficiency from '~/components/Admission/Form/EnglishProfiency.vue'
import Exam from '~/components/Admission/Form/Exam.vue'
import internationalDirection from '~/components/Admission/Form/InternationalDirection.vue'
import PersonalInformationStepOne from '~/components/Admission/Form/PersonalInformationStepOne.vue'
import PersonalInformationStepTwo from '~/components/Admission/Form/PersonalInformationStepTwo.vue'
import PhoneVerification from '~/components/Admission/Form/PhoneVerification.vue'
import { useCustomToast } from '~/composables/useCustomToast'
import type { TForm } from '~/composables/useForm'
import { useHandleError } from '~/composables/useHandleError'
import {
  applicationTypeForm,
  directionForm,
  educationBackgroundForm,
  englishProficiencyForm,
  examForm,
  internationalDirectionForm,
  internationalStepList,
  localStepList,
  personalFormOne,
  personalFormTwo,
  phoneVerification,
  stepList,
} from '~/data/admission.data'
import { useAdmissionStore } from '~/store/admission'
import { useCommonStore } from '~/store/common'
import { useHomeStore } from '~/store/home'
import { EApplicationType } from '~/types/admission/index.types'
import { removeEmptySpaces } from '~/utils'

const { showToast } = useCustomToast()

interface StepperComponent {
  id: number
  form: TForm<any>
  component: Component
}

const { t } = useI18n()
const admissionStore = useAdmissionStore()
const commonStore = useCommonStore()
const route = useRoute()
const agentSlug = route.params.slug || undefined

const admissionPhoneNumber = ref('')

const breadcrumbs = computed(() => [
  { name: t('admission.name'), path: '/admission' },
  { name: t('apply'), path: `/agent/${agentSlug}/apply` },
  { name: t('application_for_programs'), path: `/agent/${agentSlug}/apply/program` },
])

const currentStep = ref(1)
const completedStep = ref(0)
const isLocal = ref(false)
const isInternational = ref(false)
const showPhoneNumberModal = ref(false)
const seconds = ref(120)
const isSuccessfully = ref(false)
const formData = new FormData()
const loading = ref(false)

const currentComponentList = computed(() => {
  let components: StepperComponent[] = [
    { id: 1, component: PhoneVerification, form: phoneVerification },
    { id: 2, component: PersonalInformationStepOne, form: personalFormOne },
    { id: 3, component: PersonalInformationStepTwo, form: personalFormTwo },
    { id: 4, component: ApplicationType, form: applicationTypeForm },
  ]
  const internationalComponents: StepperComponent[] = [
    {
      id: 7,
      component: internationalDirection,
      form: internationalDirectionForm,
    },
    { id: 6, component: EnglishProficiency, form: englishProficiencyForm },
    { id: 5, component: EducationBackground, form: educationBackgroundForm },
  ]

  const localComponents: StepperComponent[] = [
    { id: 6, component: Exam, form: examForm },
    { id: 5, component: Direction, form: directionForm },
  ]

  if (isLocal.value) {
    components = [...components, ...localComponents]
  } else if (isInternational.value) {
    components = [...components, ...internationalComponents]
  }

  return components
})

const getCurrentComponent = computed(() => {
  return currentComponentList.value.find(
    (item) => item.id === currentStep.value
  )
})

function setCookie(name: string, value: string | null, days: number = 1 ) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

const updateStepType = (typeId: EApplicationType) => {
  isLocal.value = typeId === EApplicationType.LOCAL
  isInternational.value = typeId !== EApplicationType.LOCAL
}

const currentStepList = () => {
  const currentList = stepList()
  if (currentStep.value > 4) {
    isLocal.value
      ? currentList.push(...localStepList())
      : currentList.push(...internationalStepList())
  }

  return currentList
}

const { setLocale } = useI18n()

const next = () => {
  getCurrentComponent.value?.form.$v.value.$touch()
  if (getCurrentComponent.value?.form.$v.value.$invalid) return

  // phone verification
  if (currentStep.value === 1) {
    if (
      (completedStep.value === 1 &&
        phoneVerification.values.phoneNumber === admissionPhoneNumber.value) ||
      !phoneVerification.values.with_otp
    ) {
      currentStep.value++
      return
    }
    sendCode()
    return
  }

  if (currentStep.value === 2) {
    buttonLoading.value = true
    useApi()
      .$post('/admission/application-form/check-passport/', {
        body: {
          passport_number:
            personalFormOne.values.passportSerialNumber.replaceAll(' ', ''),
        },
      })
      .then((res) => {
        if (res.exists) {
          showToast(t('passport_already_exists'), 'error')
        } else {
          currentStep.value++
          setCookie('check-passport', JSON.stringify(res), 1)
        }
      })
      .finally(() => (buttonLoading.value = false))
    return
  }

  if (currentStep.value === 3 && !phoneVerification.values.with_otp) {
    buttonLoading.value = true
    checkPhone(personalFormTwo.values.phoneNumber).then((res) => {
      if (res.exists) {
        showToast('phone_number_phone_already_exists', 'error')
      } else {
        currentStep.value++
      }
      buttonLoading.value = false
    })
    return
  }

  if (currentStep.value === currentComponentList.value.length) {
    convertToFormData()

    loading.value = true

    fileToId().then(() => {
      admissionStore
        .apply(formData, agentSlug)
        .then(() => {
          isSuccessfully.value = true
          clearForm()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
        .catch((err) => {
          useHandleError().handleError(err)
          currentStep.value = currentComponentList.value.length
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  if (currentStep.value === 4) {
    if (getCurrentComponent.value?.form.values.applicationType === 1) {
      setLocale('uz')
    } else {
      setLocale('en')
    }
    useHomeStore().fetchMenu()
    useHomeStore().fetchStaticPages()
  }

  window.scrollTo({ top: 0, behavior: 'smooth' })
  currentStep.value++
}

const back = () => {
  if (currentStep.value === 1) return
  currentStep.value -= 1
}

const buttonLoading = ref(false)

async function checkPhone(phone: string) {
  return await useApi().$post('/admission/application-form/check-phone/', {
    body: { phone: removeEmptySpaces(phone) },
  })
}
const sendCode = (): Promise<void> => {
  buttonLoading.value = true
  return admissionStore
    .sentOtp(phoneVerification.values.phoneNumber)
    .then(() => {
      showPhoneNumberModal.value = true
    })
    .finally(() => (buttonLoading.value = false))
}
const resend = () => {
  sendCode()
    .then(() => (seconds.value = 119))
    .catch(() => (seconds.value = 0))
}
const verifyPhoneNumber = (code: string) => {
  admissionStore
    .verifyOtp(phoneVerification.values.phoneNumber, code)
    .then(() => {
      admissionPhoneNumber.value = phoneVerification.values.phoneNumber

      showPhoneNumberModal.value = false
      currentStep.value++
      completedStep.value = 1
    })
    .catch((err) => {
      useHandleError().handleError(err)
    })
}

const getApplicationValue = () => {
  return applicationTypeForm.values.applicationType == 1
    ? 'program_local'
    : 'program_international'
}
const convertToFormData = () => {
  formData.append('type', getApplicationValue())

  if (phoneVerification.values.with_otp) {
    formData.append(
      'phone',
      removeEmptySpaces(phoneVerification.values.phoneNumber)
    )
  } else {
    formData.append(
      'phone',
      removeEmptySpaces(personalFormTwo.values.phoneNumber)
    )
    formData.append(
      'emergency_contact',
      removeEmptySpaces(personalFormTwo.values.emergency_contact)
    )
  }
  formData.append('with_otp', phoneVerification.values.with_otp)
  formData.append('first_name', personalFormTwo.values.firstName)
  formData.append('last_name', personalFormTwo.values.lastName)
  formData.append('middle_name', personalFormTwo.values.fatherName)
  formData.append('pinfl', personalFormTwo.values.pinfl)
  formData.append('avatar', personalFormTwo.values.avatar)
  formData.append('gender', personalFormTwo.values.gender)
  formData.append('nationality_v2', personalFormTwo.values.citizenship)
  formData.append(
    'passport',
    removeEmptySpaces(personalFormOne.values.passportSerialNumber)
  )

  const birthDate = personalFormOne.values.birthDate
    .split('.')
    .reverse()
    .join('-')
  const startDate = educationBackgroundForm.values.start_date
    .split('.')
    .reverse()
    .join('-')
  const endDate = educationBackgroundForm.values.end_date
    .split('.')
    .reverse()
    .join('-')

  formData.append('birth_day', birthDate)
  formData.append('email', applicationTypeForm.values.email)

  formData.append(
    'highest_qualification',
    educationBackgroundForm.values.highQualification
  )
  formData.append('school_name', educationBackgroundForm.values.name)
  formData.append('school_start_date', startDate)
  formData.append('school_end_date', endDate)
  formData.append('school_region', educationBackgroundForm.values.region)
  formData.append('school_district', educationBackgroundForm.values.district)

  if (applicationTypeForm.values.applicationType == 1) {
    formData.append('entrance_via_type', examForm.values.entrance_via)
    formData.append('dtm_score', examForm.values.dtm_score)
    if (examForm.values.entrance_via === 'entrance_exam') {
      formData.append('exam_date', examForm.values.exam_date)
    }
  } else {
    formData.append(
      'entrance_via_type',
      englishProficiencyForm.values.entrance_via
    )
    formData.append(
      'english_proficiency_v2',
      englishProficiencyForm.values.ielts_score
    )
    formData.append(
      'duolingo_score',
      englishProficiencyForm.values.duolingo_score
    )
    if (englishProficiencyForm.values.entrance_via === 'entrance_exam') {
      formData.append('exam_date', englishProficiencyForm.values.exam_date)
    }
  }

  formData.append(
    'area_of_study',
    internationalDirectionForm.values.program ||
      directionForm.values.area_of_study
  )
  formData.append(
    'programme',
    internationalDirectionForm.values.faculty || directionForm.values.faculty
  )
  // formData.append('programme_faculty', directionForm.values.program)
  formData.append('otp_verified_token', admissionStore.otp_verified_token)
}

const fileToId = async () => {
  try {
    if (applicationTypeForm.values.applicationType === 1) {
      if (examForm.values.entrance_via === 'dtm_result') {
        const dtm = await commonStore.fileUpload(
          examForm.values.dtm_application
        )
        formData.append('dtm_application', dtm.id as string)
      }

      if (examForm.values.entrance_via === 'transfer_studies') {
        const transfreApplication = await commonStore.fileUpload(
          examForm.values.transfer_application
        )
        formData.append(
          'transfer_application',
          transfreApplication.id as string
        )
      }
      if (examForm.values.entrance_via === 'transfer_studies') {
        const transferTranscript = await commonStore.fileUpload(
          examForm.values.transfer_transcript
        )
        formData.append('transfer_transcript', transferTranscript.id as string)
      }
    } else {
      const diploma = await commonStore.fileUpload(
        educationBackgroundForm.values.diploma
      )
      formData.append('attestat', diploma.id as string)

      if (englishProficiencyForm.values.entrance_via === 'ielts_score') {
        const certificate = await commonStore.fileUpload(
          englishProficiencyForm.values.certificate
        )
        formData.append('certificate', certificate.id as string)
      }
    }
  } catch (e) {
    useHandleError().handleError(e)
  }
}

const clearForm = () => {
  phoneVerification.values.phoneNumber = ''
  phoneVerification.values.status = ''

  personalFormOne.values.passportSerialNumber = ''
  personalFormOne.values.birthDate = ''
  personalFormTwo.values.firstName = ''
  personalFormTwo.values.lastName = ''
  personalFormTwo.values.fatherName = ''
  personalFormTwo.values.gender = ''
  personalFormTwo.values.pinfl = ''
  personalFormTwo.values.avatar = ''
  personalFormTwo.values.citizenship = ''

  educationBackgroundForm.values.highQualification = ''
  educationBackgroundForm.values.name = ''
  educationBackgroundForm.values.start_date = ''
  educationBackgroundForm.values.end_date = ''
  educationBackgroundForm.values.region = ''
  educationBackgroundForm.values.district = ''
  educationBackgroundForm.values.diploma = null

  englishProficiencyForm.values.entrance_via = ''
  englishProficiencyForm.values.ielts_score = ''
  englishProficiencyForm.values.exam_date = ''
  englishProficiencyForm.values.certificate = ''

  examForm.values.entrance_via = ''
  examForm.values.dtm_score = ''
  examForm.values.exam_date = ''
  examForm.values.dtm_application = ''
  examForm.values.transfer_transcript = ''
  examForm.values.transfer_application = ''

  directionForm.values.area_of_study = ''
  directionForm.values.faculty = ''
  directionForm.values.program = ''

  internationalDirectionForm.values.area_of_study = ''
  internationalDirectionForm.values.faculty = ''
  internationalDirectionForm.values.program = ''

  applicationTypeForm.values.applicationType = null
  applicationTypeForm.values.email = ''

  phoneVerification.$v.value.$reset()
  personalFormOne.$v.value.$reset()
  personalFormTwo.$v.value.$reset()
  educationBackgroundForm.$v.value.$reset()
  englishProficiencyForm.$v.value.$reset()
  examForm.$v.value.$reset()
  directionForm.$v.value.$reset()
  internationalDirectionForm.$v.value.$reset()
  applicationTypeForm.$v.value.$reset()

  for (const key of formData.keys()) {
    formData.delete(key)
  }
}

watch(
  () => applicationTypeForm.values.applicationType,
  (id) => {
    if (id) {
      updateStepType(id)
    }
  },
  {
    deep: true,
  }
)

watch(
  () => currentStep.value,
  (step) => {
    if (step > 4) {
      isLocal.value
        ? updateStepType(EApplicationType.LOCAL)
        : updateStepType(EApplicationType.INTERNATIONAL)
    }
  }
)

watch(isSuccessfully, (newVal) => {
  if (newVal) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
</script>

<style scoped>
.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 6px solid;
  border-color: #dbdcef;
  border-right-color: theme('colors.red.100');
  animation: spinner-d3wgkg 1s infinite linear;
}

@keyframes spinner-d3wgkg {
  to {
    transform: rotate(1turn);
  }
}
</style>
