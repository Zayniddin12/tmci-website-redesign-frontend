import { defineStore } from 'pinia'

import { useApi } from '~/composables/useApi'
import { useHandleError } from '~/composables/useHandleError'
import type { IDefaultResponse, IParams } from '~/types'
import type {
  EntranceExam,
  EntranceExamType,
  HighestQualification,
  IAdmissionInfo,
  IeltsScore,
  IFinancialAid,
  IScholarshipSingle,
} from '~/types/admission/index.types'
import { removeEmptySpaces } from '~/utils'

export const useAdmissionStore = defineStore('admission', {
  state: () => ({
    localApplicationForm: {},
    activeSession: '',
    otpCode: '',
    otp_verified_token: '',
    examOptions: [] as EntranceExam[],
    highestQualification: [] as HighestQualification[],
    localIeltsScore: [] as IeltsScore[],
    internationalIeltsScore: [] as IeltsScore[],
    scholarshipSingle: {} as IScholarshipSingle,
    scholarshipSingleLoading: true,
  }),

  actions: {
    sentOtp(phone: string): Promise<void> {
      const form = {
        phone_number: removeEmptySpaces(phone),
      }

      return new Promise((resolve, reject) => {
        useApi()
          .$post<{ session: string }>('otp/send-code/', {
            body: form,
          })
          .then((response) => {
            this.activeSession = response.session
            resolve()
          })
          .catch((e) => {
            useHandleError().handleError(e)
            reject(e)
          })
      })
    },

    verifyOtp(phone: string, code: string): Promise<void> {
      const form = {
        phone_number: removeEmptySpaces(phone),
        code,
        session: this.activeSession,
      }

      return new Promise((resolve, reject) => {
        useApi()
          .$post<{ otp_verified_token: string }>('otp/verify-code/', {
            body: form,
          })
          .then((res) => {
            this.otp_verified_token = res?.otp_verified_token
            resolve()
          })
          .catch((e) => {
            reject(e)
          })
      })
    },

    getEntranceExams(type: EntranceExamType, params?: IParams): Promise<void> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<EntranceExam>>('exam-date-list/', {
            params: {
              type,
              ...params,
            },
          })
          .then((response) => {
            this.examOptions = response.results
            resolve()
          })
          .catch((e) => {
            useHandleError().handleError(e)
            reject(e)
          })
      })
    },

    getHighestQualification(): Promise<void> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<HighestQualification>>(
            'highest-qualification-list/'
          )
          .then((response) => {
            this.highestQualification = response.results
            resolve()
          })
          .catch((e) => {
            useHandleError().handleError(e)
            reject(e)
          })
      })
    },

    getLocalIeltsScore(): Promise<void> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IeltsScore>>('/english-proficiency-list/')
          .then((response) => {
            this.localIeltsScore = response.results
            resolve()
          })
          .catch((e) => {
            useHandleError().handleError(e)
            reject(e)
          })
      })
    },

    getInternationalIeltsScore(): Promise<void> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IeltsScore>>(
            '/scholarship-english-proficiency-list/',
            {
              params: {
                type: 'international',
              },
            }
          )
          .then((response) => {
            this.internationalIeltsScore = response.results
            resolve()
          })
          .catch((e) => {
            useHandleError().handleError(e)
            reject(e)
          })
      })
    },

    fetchScholarshipSingle(slug: string) {
      this.scholarshipSingleLoading = true
      return new Promise<IFinancialAid>((resolve, reject) => {
        useApi()
          .$get<IFinancialAid>(`/admission/financial-aid/${slug}/`)
          .then((data) => {
            this.scholarshipSingle = data
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            this.scholarshipSingleLoading = false
          })
      })
    },

    fetchAdmission() {
      return new Promise<IAdmissionInfo>((resolve, reject) => {
        useApi()
          .$get<IAdmissionInfo>(`admission/`)
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    apply(data: FormData, agent?: string): Promise<void> {
      return new Promise((resolve, reject) => {
        useApi()
          .$post('/admission/application-form/', {
            body: data,
            params: {
              agent,
            },
          })
          .then(() => {
            resolve()
          })
          .catch((e) => {
            reject(e)
          })
      })
    },
  },
})
