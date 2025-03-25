import type { IPhoto } from '~/types/about/index.types'

export interface IEvents {
  slug: string
  image: IPhoto
  thumbnail_image: string
  title: string
  description: string
  published_at: string
  views_count: number
  comments_count: number
  event_date: string
}

export interface Head {
  full_name: string
  position: string
  photo: IPhoto
}

export interface Faculty {
  card_title: string
  card_description: string
  phone_number: string
  email: string
  instagram: string
  telegram: string
  linkedin: string
  facebook: string
  youtube: string
  head: Head
}

export interface IStudyFormat {
  education_period: string
  education_languages: string
  price: string
  study_format: string
  location: string
  next_admission: string
}

export interface IProgramSingle {
  title: string
  icons?: string
  education_period: string
  card_title: string
  card_description: string
  education_languages: string
  education_level: string
  price: string
  study_format: {
    title: string
  }[]
  next_admission: string
  requirements: string
  who_can_apply: string
  career_opportunities: string
  faculty: Faculty
  study_formats: IStudyFormat[]
  contents: {
    title: string
    content: string
  }[]
}

export interface IContacts {
  title: string
  address: string
  phone_1: string
  phone_2: string | null
  email: string
}

export interface ILocation {
  title: string
  address: string
  location: {
    lat: number
    lon: number
  }
}

export interface IContactInfo {
  address: string
  email: string
  phone_1: string
  phone_2: string
  operation_hours: string
  locations: ILocation[]
}

export interface IVacancyDetail {
  slug: string
  title: string
  responsibilities: string
  contacts: IContacts
}

export interface IPostSingle {
  id: number
  tags: any[]
  category: {
    id: number
    title: string
    slug: string
  }
  image: IPhoto
  links: {
    facebook_link: string
    twitter_link: string
    linkedin_link: string
    instagram_link: string
    telegram_link?: string
    youtube_link?: string
  }
  thumbnail_image: string
  title: string
  slug: string
  description: string | undefined
  content: string
  published_at: string
  comments_count: number
  event_date: string
  send_from_email: boolean
  event_type: string
  event_price: string
  event_location_url: string
  event_location: string
  event_location_lat: number
  event_location_long: number
  event_phone: string
  event_email: string
  event_time: string
  event_web_site: string
  event_organizer: string
  event_total_slot: number
  event_blocked_slot: number
  views_count: number
}

export interface IStory {
  id: number
  title: string
  description: string
  student: {
    full_name: string
    position: string
    photo: IPhoto
  }
  cover_image: IPhoto
}

export interface IMobileApp {
  title: string
  description: string
  google_play: string
  app_store: string
  qr_code: string
}

export interface IDepartmentContact {
  head: {
    full_name: string
    position: string
  }
  phone_number: string
  email: string
  application_time: string
}

export interface IShowCase {
  image: {
    original: string
    s1000x1000: string
    s500x500: string
    s100x100: string
  }
  video: string
  title: string
  subtitle: string
  redirect_url: string
}

export interface IMenu {
  id: number
  title: string
  url: string
  on_top: boolean
  children: IMenu[]
  showcase: IShowCase
  slug?: string
}

export interface AboutHome {
  site_title: string
  site_logo: string
  university_name: string
  university_phone_number: string
  university_email: string
  wellcome_title: string
  wellcome_description: string
  about_title: string
  about_description: string
  request_info_title: string
  request_info_description: string
  home_image: {
    first: boolean
    url: {
      original: string
      s1000x1000: string
      s500x500: string
      s100x100: string
    }
  }
  video: string | null
}
