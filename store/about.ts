import type { IDefaultResponse } from '~/types'
import type {
  AntiCorruption,
  ILicense,
  IOfficeOfRector,
  IProgram,
  ISelectList,
  IStaticPage,
  IVacancyList,
  TAbout,
  TManagement,
  TManagementSingle,
} from '~/types/about/index.types'

export const useAboutStore = defineStore('aboutStore', {
  state: () => ({
    about: {} as TAbout,
    management: [] as TManagement[],
    managementSingle: {} as TManagementSingle,
    managementNext: 'null' as string | null,
    staticPage: {} as IStaticPage,
    vacancyList: {} as IDefaultResponse<IVacancyList>,
    antiCorruption: {} as AntiCorruption,
    department: [] as ISelectList[],
    license: [] as ILicense[],
    slug: '' as string,
  }),
  actions: {
    fetchAbout() {
      return new Promise<TAbout>((resolve, reject) => {
        useApi()
          .$get('static/about-us/')
          .then((data) => {
            this.about = data
            resolve(this.about)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchManagement(limit?: number, offset?: number) {
      return new Promise<TManagement[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<TManagement>>('employee/management/', {
            params: {
              limit,
              offset,
              slug: this.slug,
            },
          })
          .then((data) => {
            this.managementNext = data?.next
            this.management = data?.results
            resolve(this.management)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchManagementSingle() {
      return new Promise<TManagement[]>((resolve, reject) => {
        useApi()
          .$get<TManagementSingle>(`employee/${this.slug}`)
          .then((data) => {
            this.managementSingle = data
            resolve(this.managementSingle)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchStaticPage(url: string) {
      return new Promise<IStaticPage>((resolve, reject) => {
        return useApi()
          .$get<IStaticPage>(url)
          .then((data) => {
            this.staticPage = data
            resolve(this.staticPage)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchVacancy(params?: any) {
      return new Promise<IDefaultResponse<IVacancyList>>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IVacancyList>>('vacancy/', {
            params,
          })
          .then((data) => {
            this.vacancyList = data
            resolve(this.vacancyList)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchAntiCorruption() {
      return new Promise<AntiCorruption>((resolve, reject) => {
        useApi()
          .$get<AntiCorruption>('department/anti-corruption/')
          .then((data) => {
            this.antiCorruption = data
            resolve(this.antiCorruption)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchDepartment(limit?: number, offset?: number) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<ISelectList>>('department/list/', {
            params: {
              limit,
              offset,
            },
          })
          .then((data) => {
            this.department = data?.results
            resolve(this.department)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchRector() {
      return new Promise<IOfficeOfRector>((resolve, reject) => {
        useApi()
          .$get<IOfficeOfRector>('department/rector-office/')
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchLicense() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<ILicense>>('static/licences/')
          .then((data) => {
            this.license = data?.results
            resolve(this.license)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchProgramList(tab: string, with_description?: boolean) {
      return new Promise<IProgram[]>((resolve, reject) => {
        useApi()
          .$get<IProgram[]>(`program/faculties/${tab}/`, {
            params: {
              with_description,
            },
          })
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})
