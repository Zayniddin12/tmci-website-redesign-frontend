import { defineStore } from 'pinia'

import { useHandleError } from '~/composables/useHandleError'
import type { IDefaultResponse, IParams } from '~/types'
import type {
  Citizenship,
  City,
  CommonResponse,
  Country,
  ICamp,
  IFeedbackType,
} from '~/types/common'
import type { IVacancyDetail } from '~/types/home.types'

export const useCommonStore = defineStore('common', {
  state: () => ({
    country: {
      loading: false,
      list: [] as Country[],
      count: 0,
    },
    city: {
      loading: false,
      list: [] as City[],
      count: 0,
    },
    citizenship: {
      loading: false,
      list: [] as Citizenship[],
      count: 0,
    },
    vacancyDetail: {} as IVacancyDetail,
    sendFeedbackLoading: false,
    campusList: [] as ICamp[],
    feedbackTypes: [] as IFeedbackType[],
    questionTypes: [] as IFeedbackType[],
  }),

  actions: {
    async fetchCountry(params?: IParams, merge = false) {
      this.country.loading = true
      if (this.country.list?.length && !params?.search?.length && !merge) return

      try {
        const res = await useApi().$get<CommonResponse<Country>>('/country/', {
          params,
        })
        if (merge) this.country.list = this.country.list.concat(res.results)
        else this.country.list = res.results

        this.country.count = res.total
      } catch (e) {
        useHandleError().handleError(e)
      } finally {
        this.country.loading = false
      }
    },

    async fetchCity(country: string, params?: IParams, merge = false) {
      this.city.loading = true

      try {
        const res = await useApi().$get<CommonResponse<City>>('/city/', {
          params: { ...params, country },
        })
        if (merge) this.city.list = this.city.list.concat(res.results)
        else this.city.list = res.results

        this.city.count = res.total
      } catch (e) {
        useHandleError().handleError(e)
      } finally {
        this.city.loading = false
      }
    },

    async fetchCitizenship(params?: IParams, merge = false) {
      this.citizenship.loading = true
      if (this.citizenship.list?.length && !params?.search?.length && !merge)
        return

      try {
        const res = await useApi().$get<IDefaultResponse<Citizenship>>(
          '/nationality-list/',
          {
            params,
          }
        )
        if (merge)
          this.citizenship.list = this.citizenship.list.concat(res.results)
        else this.citizenship.list = res.results

        this.citizenship.count = res.count
      } catch (e) {
        useHandleError().handleError(e)
      } finally {
        this.citizenship.loading = false
      }
    },

    fetchVacancyDetail(slug: string) {
      return new Promise<IVacancyDetail>((resolve, reject) => {
        useApi()
          .$get<IVacancyDetail>(`vacancy/${slug}`)
          .then((data) => {
            this.vacancyDetail = data
            resolve(this.vacancyDetail)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fileUpload(file: any): Promise<{ file: string; id: string | number }> {
      const formData = new FormData()
      formData.append('file', file)

      return new Promise<{ file: string; id: number }>((resolve, reject) => {
        useApi()
          .$post<{ file: string; id: number }>(`upload_file/`, {
            body: formData,
          })
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    sendFeedback(data) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post('feedbacks/feedback/create/', {
            body: data,
          })
          .then((res) => {
            console.log(res)
            resolve(res)
          })
          .catch((error) => reject(error))
          .finally(() => (this.sendFeedbackLoading = false))
      })
    },

    fetchCampusList() {
      useApi()
        .$get<IDefaultResponse<IFeedbackType>>('/feedbacks/campus/list/')
        .then((res) => {
          this.campusList = res.results
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchFeedbackTypes() {
      useApi()
        .$get<IDefaultResponse<IFeedbackType>>('/feedbacks/feedback-types/')
        .then((res) => {
          this.feedbackTypes = res.results
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchQuestionTypes() {
      useApi()
        .$get<IDefaultResponse<IFeedbackType>>('/feedbacks/question-types/')
        .then((res) => {
          this.questionTypes = res.results
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
})
