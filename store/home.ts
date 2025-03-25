import type { IDefaultResponse } from '~/types'
import type {
  IAnnouncement,
  IProgram,
  ISelectList,
  ISocial,
} from '~/types/about/index.types'
import type { IPartner, IStudentTestimonial } from '~/types/common'
import type {
  AboutHome,
  IContactInfo,
  IDepartmentContact,
  IEvents,
  IMenu,
  IMobileApp,
  IProgramSingle,
} from '~/types/home.types'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    events: [] as IEvents[],
    news: [] as IEvents[],
    hasNextNews: false as boolean,
    hasNextEvents: false as boolean,
    singleProgram: {} as IProgramSingle,
    programsList: [] as IProgram[],
    socials: {} as ISocial,
    staticPages: {} as ISelectList[],
    mobileApp: {} as IMobileApp,
    departmentContacts: {} as IDepartmentContact[],
    contactInfo: {} as IContactInfo,
    quickAnnouncement: {} as IAnnouncement,
    menus: [] as IMenu[],
    aboutHome: {} as AboutHome,
    isExistImage: true as boolean,
    firstLoad: false as boolean,
    testimonials: [] as IStudentTestimonial[],
    testimonialsLoading: true,
    partners: [] as IPartner[],
    partnersLoading: true,
  }),
  actions: {
    fetchHomeAbout() {
      return new Promise<AboutHome>((resolve, reject) => {
        useApi()
          .$get<AboutHome>('main/about/')
          .then((data) => {
            this.aboutHome = data
            this.isExistImage = !!data.home_image.url.original
            this.firstLoad = !!this.isExistImage
            resolve(this.aboutHome)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchEvents(params?: any) {
      return new Promise<IEvents[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IEvents>>('post/events/', { params })
          .then((data) => {
            this.events = data.results
            this.hasNextEvents = !!data.next
            resolve(this.events)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchNews(params?: any) {
      return new Promise<IEvents[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IEvents>>('post/news/', { params })
          .then((data) => {
            this.news = data.results
            this.hasNextNews = !!data.next
            resolve(this.news)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchProgramsSingle(slug: string) {
      return new Promise<IProgramSingle>((resolve, reject) => {
        useApi()
          .$get(`program/program/${slug}/`)
          .then((data) => {
            this.singleProgram = data
            resolve(this.singleProgram)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchPrograms(params?: any) {
      return new Promise<IProgram[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IProgram>>(`program/faculties-programs/`, {
            params,
          })
          .then((data) => {
            this.programsList = data?.results
            resolve(this.programsList)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchSocial() {
      return new Promise<ISocial>((resolve, reject) => {
        useApi()
          .$get<ISocial>(`main/footer/`)
          .then((data) => {
            this.socials = data
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchStaticPage(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`static-pages/${slug}`)
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchStaticPages() {
      return new Promise<ISelectList[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<ISelectList>>(`static-pages/`)
          .then((data) => {
            this.staticPages = data?.results
            resolve(this.staticPages)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchMobileApp() {
      if (Object.keys(this.mobileApp).length) return
      return new Promise<IMobileApp>((resolve, reject) => {
        useApi()
          .$get<IMobileApp>('mobile-apps/')
          .then((data) => {
            this.mobileApp = data
            resolve(this.mobileApp)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchDepartmentContact() {
      return new Promise<IDepartmentContact[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IDepartmentContact>>('department/contacts/')
          .then((data) => {
            this.departmentContacts = data?.results
            resolve(this.departmentContacts)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchContactInfo() {
      return new Promise<IContactInfo>((resolve, reject) => {
        useApi()
          .$get<IContactInfo>('contacts/')
          .then((data) => {
            this.contactInfo = data
            resolve(this.contactInfo)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchAnnouncement() {
      return new Promise<IAnnouncement>((resolve, reject) => {
        useApi()
          .$get<IAnnouncement>('main/quick-announcement/')
          .then((data) => {
            this.quickAnnouncement = data
            resolve(this.quickAnnouncement)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchMenu() {
      return new Promise<IMenu[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IMenu>>(`main/menu/`)
          .then((data) => {
            this.menus = data?.results
            resolve(this.menus)
            console.log(this.menus)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchStudentTestimonials() {
      this.testimonialsLoading = true
      useApi()
        .$get<IDefaultResponse<IStudentTestimonial>>(
          'main/student-testimonials/'
        )
        .then((response) => {
          this.testimonials = response.results
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.testimonialsLoading = false
        })
    },

    fetchPartners() {
      this.partnersLoading = true
      useApi()
        .$get<IDefaultResponse<IPartner>>('main/partners/')
        .then((response) => {
          this.partners = response.results
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.partnersLoading = false
        })
    },
  },
})
