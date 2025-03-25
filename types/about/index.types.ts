import type { Image } from '~/types/common'

export interface AboutUsCard {
  title: string
  description: string
  icon: string
}

export interface Milestone {
  description: string
  year: number
}

export interface TAbout {
  about_title: string
  about_description: string
  site_logo: string
  cards: AboutUsCard[]
  milestones: Milestone[]
}

export interface IPhoto {
  original: string
  s1000x1000: string
  s500x500: string
  s100x100: string
}

export interface TManagement {
  full_name: string
  position: string
  photo: IPhoto
  application_time: string
  phone_number: string
  email: string
}

export interface MissionAndValuesCard {
  title: string
  description: string
  icon: string
}

export interface IContact {
  title: string
  phone_number: string
  email: string
  responsible_person: string
  application_time: string
}

export interface IStaticPage {
  title: string
  description: string
  content?: string
  cards?: MissionAndValuesCard[]
  gallery?: {
    image: IPhoto
  }[]
  image?: IPhoto
  contacts?: IContact[]
}

export interface ISelectList {
  title: string
  slug: string
}

export interface IVacancyList extends ISelectList {
  department: {
    title: string
    slug: string
  }
  experience: string
  responsibilities: string
  location?: string
  phone?: string
  email?: string
}

export interface AntiCorruption {
  title: string
  department: {
    title: string
    head: string
    phone_number: string
    email: string
    application_time: string
    info: string
  }
}

export interface IRector {
  full_name: string
  position: string
  photo: IPhoto
  biography: string
  phone_number: string
  email: string
  application_time: string
}

export interface IOfficeOfRector {
  title: string
  card_title: string
  card_description: string
  instagram: string
  telegram: string
  linkedin: string
  facebook: string
  rector: IRector
}
export interface TManagementSingle {
  id: number
  image_src: {
    original: string
    s1000x1000: string
    s500x500: string
    s100x100: string
  }
  full_name: string
  full_name_en: string
  full_name_uz: string
  full_name_ru: string
  position: string
  position_en: string
  position_uz: string
  position_ru: string
  card_title: string
  card_title_en: string
  card_title_uz: string
  card_title_ru: string
  card_description: string
  card_description_en: string
  card_description_uz: string
  card_description_ru: string
  slug: string
  photo: string
  biography: string
  biography_en: string
  biography_uz: string
  biography_ru: string
  is_leadership: boolean
  is_faculty: boolean
  is_head_of_department: boolean
  weight: number
  phone_number: string
  email: string
  application_time: string
  application_time_en: string
  application_time_uz: string
  application_time_ru: string
  instagram: string
  telegram: string
  linkedin: string
  department: string
}

export interface ISupervisoryBoardHead {
  full_name: string
  position: string
  photo: Image
}

export interface ISupervisoryBoardMember {
  full_name: string
  position: string
  avatar: string | null
  biography: string
}

export interface IOfficeOfSupervisoryBoard {
  title: string
  card_title: string
  card_description: string
  head_of_board: ISupervisoryBoardHead
  description?: string | null
  members?: ISupervisoryBoardMember[]
}

export interface ILicense {
  title: string
  description: string
  image: IPhoto
  pdf: string
  docx: string
}

export interface IProgram {
  title: string
  slug?: string
  programs: {
    title: string
    icon: IPhoto
    education_level: string
    slug: string
    description: string
  }[]
}

export interface ISocial {
  instagram: string
  linkedin: string
  youtube: string
  telegram: string
  facebook: string
}

export interface IProgramList {
  title: string
  icon: IPhoto
  education_level: string
  slug: string
  description: string
}

export interface IAnnouncement {
  title: string
  is_active: boolean
  subtitle: string
  link: IPhoto
  action_name: string
}

export interface IMoreInfo {
  title: string
  description: string
  image: string
  video: string
}
