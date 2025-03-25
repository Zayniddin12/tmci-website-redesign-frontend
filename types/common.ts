export type Country = {
  id: number
  name: string
  slug: string
}

export type City = {
  id: number
  name: string
  slug: string
  country: number
}

export type Citizenship = {
  id: number
  title: string
  title_en: string
  title_uz: string
  title_ru: string
  created_at: string
  updated_at: string
}

export type AreaOfStudy = {
  name: string
  slug: string
}

export type Faculty = {
  name: string
  slug: string
}

export type IProgramLevel = {
  name: string
  slug: string
}

// Define type for the entire JSON response
export type CommonResponse<T> = {
  links: {
    next: string | null
    previous: string | null
  }
  page_size: number
  current_page: number
  total_pages: number
  page_items: number
  total: number
  results: T[] // Array of Country objects
}

export type StudentOrientation = {
  video: string
  content: string | null
  title: string | null
}

export type Image = {
  original: string
  s100x100: string
  s500x500: string
  s1000x1000: string
}

export type StudentFacilite = {
  content: string | null
  images: Image[]
  title: string | null
}

export type TClub = {
  title: string
  subtitle: string
  about: string
  slug: string
  description: string
  main_image: Image
}

export type TInfo = {
  title: string
  content: string
  video: string
}

export type TClubSlug = {
  title: string
  subtitle: string
  about: string
  main_image: Image

  images: Image[]
  infos: TInfo
  related_clubs: TClub[]
}

export type TInternship = {
  title: string
  content: string
  main_image: Image | null
  instructions: any[]
  success_stories: any[]
  faqs: any[]
}

export type TInternshipSteps = {
  title: string
  body: string
  icon: string
}

export interface IResponse<T> {
  count: number
  previous?: string
  next?: string
  results: T[]
}

export interface IFaqs {
  title: string
  content: string
}

export interface ISuccessStory {
  student_name: string
  title: string
  student_avatar: Image
  content: string
  program_title: string
}

export interface IWorkAndTravel {
  title: string
  content: string
  description: string
  main_image: Image
  success_stories: ISuccessStory
  faqs: IFaqs[]
}

export interface ICamp {
  id: number
  title: string
  description: string
  main_image: string | null
  instructions: IFaqs[]
  content: string
  images: Image[]
  faqs: IFaqs[]
}

export interface IFeedbackType {
  id: number
  title: string
}

export interface IStudentTestimonial {
  student_name: string
  student_avatar: Image
  program_title: string
  content: string
}

export interface IPartner {
  title: string
  site_url: string
  logo: string
}

export interface IGreenCampusInfo {
  title: string
  content: string
  image?: Image
  file?: string | null
  is_card?: boolean
}

export interface IGreenInitiative {
  title: string
  slug: string
  subtitle?: string | null
  main_image?: Image
}

export interface IGreenCampus {
  title: string
  slug: string
  subtitle: string
  main_image?: Image
}

export interface IScholarship {
  title: string
  slug: string
  image: Image
  card_description: string
}

export interface IProcessStep {
  title: string
  description: string
  step_files: {
    id: number
    file: string
  }[]
}

export interface IAdmissionProcess {
  title: string
  content: string
  process_steps: IProcessStep[]
}

export interface IStaffMember {
  full_name: string
  position: string
  avatar: Image
  additional_info?: string
  phone_number?: string
  email?: string
  application_time?: string
  telegram?: string
  instagram?: string
  linkedin?: string
}

type NodeType = 'head' | 'subhead' | 'child' | 'subchild' | "subtree"

export interface IStructureNode {
  slug: string
  title: string
  staff_members: IStaffMember[]
  subunits: IStructureNode[]
  type?: NodeType
}
