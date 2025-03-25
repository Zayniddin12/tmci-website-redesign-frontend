import { email, minLength, required, requiredIf } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { useForm } from '~/composables/useForm'
import type { ICardApply } from '~/types/admission/cards/apply-card.types'
import type { IStepper } from '~/types/admission/index.types'
import { validatePhoneNumber } from '~/utils'

export const admissionApplyCardData = (): ICardApply[] => {
  const { t } = useI18n()
  return [
    {
      title: t('admission.cards.program.title'),
      description: t('admission.cards.program.description'),
      url: '/apply/program',
    },
    {
      title: t('admission.cards.scholarship.title'),
      description: t('admission.cards.scholarship.description'),
      url: '/apply/scholarship',
    },
  ]
}

export const stepList = (): IStepper[] => {
  const { t } = useI18n()

  return [
    {
      id: 1,
      title: t('admission.steps.phone_verification'),
      status: 'in-progress',
    },
    {
      id: 2,
      title: t('admission.steps.personal_information'),
      status: 'not-started',
    },
    {
      id: 3,
      title: t('admission.steps.application_type'),
      status: 'not-started',
    },
  ]
}

export const localStepList = (): IStepper[] => {
  const { t } = useI18n()

  return [
    {
      id: 4,
      title: t('admission.steps.direction'),
      status: 'not-started',
    },
    {
      id: 5,
      title: t('admission.steps.exam'),
      status: 'not-started',
    },
  ]
}

export const internationalStepList = (): IStepper[] => {
  const { t } = useI18n()

  return [
    {
      id: 4,
      title: t('admission.steps.education_background'),
      status: 'not-started',
    },
    {
      id: 5,
      title: t('admission.steps.english_proficiency'),
      status: 'not-started',
    },
    {
      id: 6,
      title: t('admission.steps.direction'),
      status: 'not-started',
    },
  ]
}

export const applicationTypeList = (): {
  id: number
  value: string
}[] => {
  const { t } = useI18n()
  const check_passport = useCookie('check-passport').value

  const { local_exists, international_exists } = check_passport

  const applicationTypes = []

  if (!local_exists) {
    applicationTypes.push({ id: 1, value: t('admission.application_type.local') })
  }

  if (!international_exists) {
    applicationTypes.push({ id: 2, value: t('admission.application_type.international') })
  }

  return applicationTypes
}

export const phoneVerification = useForm(
  {
    with_otp: true,
    phoneNumber: '',
    // status: '',
  },
  {
    with_otp: { required },
    phoneNumber: {
      requiredIf: requiredIf(() => phoneVerification.values.with_otp),
      validatePhoneNumber: (value) =>
        phoneVerification.values.with_otp ? validatePhoneNumber(value) : {},
    },
    // status: { required },
  }
)

export const personalFormOne = useForm(
  {
    passportSerialNumber: '',
    birthDate: '',
  },
  {
    passportSerialNumber: { required, minLength: minLength(10) },
    birthDate: { required },
  }
)

export const personalFormTwo = useForm(
  {
    firstName: '',
    lastName: '',
    fatherName: '',
    gender: '',
    pinfl: '',
    avatar: '',
    citizenship: '',
    phoneNumber: '',
    emergency_contact: '',
  },
  {
    firstName: { required },
    lastName: { required },
    fatherName: { required },
    gender: { required },
    pinfl: { required },
    avatar: { required },
    citizenship: { required },
    phoneNumber: {
      requiredIf: requiredIf(() => !phoneVerification.values.with_otp),
      validatePhoneNumber: (value) =>
        !phoneVerification.values.with_otp ? validatePhoneNumber(value) : {},
    },
    emergency_contact: {
      requiredIf: requiredIf(() => !phoneVerification.values.with_otp),
      validatePhoneNumber: (value) =>
        !phoneVerification.values.with_otp
          ? validatePhoneNumber(value) &&
            value !== personalFormTwo.values.phoneNumber
          : true,
    },
  }
)

export const applicationTypeForm = useForm(
  {
    applicationType: null,
    email: '',
  },
  {
    applicationType: { required },
    email: {
      email,
      requiredIf: requiredIf(
        () => applicationTypeForm.values.applicationType !== 1
      ),
    },
  }
)

export const educationBackgroundForm = useForm(
  {
    highQualification: '',
    name: '',
    region: '',
    district: '',
    start_date: '',
    end_date: '',
    diploma: null,
  },
  {
    highQualification: { required },
    name: { required },
    region: { required },
    district: { required },
    start_date: { required },
    end_date: { required },
    diploma: { required },
  }
)

export const englishProficiencyForm = useForm(
  {
    entrance_via: '',
    ielts_score: '',
    duolingo_score: 0,
    certificate: '',
    exam_date: null,
  },
  {
    entrance_via: { required },
    exam_date: {
      requiredIf: requiredIf(
        () => englishProficiencyForm.values.entrance_via == 'entrance_exam'
      ),
    },
    ielts_score: {
      requiredIf: requiredIf(
        () => englishProficiencyForm.values.entrance_via == 'ielts_score'
      ),
    },
    duolingo_score: {
      requiredIf: requiredIf(
        () => englishProficiencyForm.values.entrance_via == 'duolingo'
      ),
    },
    certificate: {
      requiredIf: requiredIf(
        () => englishProficiencyForm.values.entrance_via == 'ielts_score'
      ),
    },
  }
)

export const directionForm = useForm(
  {
    area_of_study: '',
    program: '',
    faculty: '',
  },
  {
    area_of_study: { required },
    faculty: { required },
    program: { required },
  }
)
export const internationalDirectionForm = useForm(
  {
    program: '',
    faculty: '',
  },
  {
    faculty: { required },
    program: { required },
  }
)

export const examForm = useForm(
  {
    entrance_via: '',
    exam_date: '',
    dtm_score: '',
    dtm_application: '',
    transfer_transcript: '',
    transfer_application: '',
  },
  {
    entrance_via: { required },
    exam_date: {
      requiredIf: requiredIf(
        () => examForm.values.entrance_via == 'entrance_exam'
      ),
    },
    dtm_score: {
      requiredIf: requiredIf(
        () => examForm.values.entrance_via == 'dtm_result'
      ),
    },
    dtm_application: {
      requiredIf: requiredIf(
        () => examForm.values.entrance_via == 'dtm_result'
      ),
    },
    transfer_transcript: {
      requiredIf: requiredIf(
        () => englishProficiencyForm.values.entrance_via == 'transfer_studies'
      ),
    },
    transfer_application: {
      requiredIf: requiredIf(
        () => englishProficiencyForm.values.entrance_via == 'transfer_studies'
      ),
    },
  }
)
