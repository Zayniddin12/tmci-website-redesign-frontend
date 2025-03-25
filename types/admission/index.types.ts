import type { IPhoto } from '~/types/about/index.types'

export type TStepperTypes = 'not-started' | 'in-progress' | 'completed'

export interface IStepper {
  id: number
  title: string
  status: TStepperTypes
}

export type IPhoneVerification = {
  with_otp: boolean
  phoneNumber: string
}

export interface IPersonalInformationFirstStep {
  passportSerialNumber: string
  birthDate: string
}

export interface IPersonalInformationSecondStep {
  firstName: string
  lastName: string
  fatherName: string
  gender: string
  pinfl: string
  avatar: File
  citizenship: string
  phoneNumber: string
  emergency_contact: string
}

export interface IApplicationType {
  applicationType: string
  email: string
}

export enum EApplicationType {
  LOCAL = 1,
  INTERNATIONAL = 2,
}

export interface IEducationBackground {
  highQualification: string
  name: string
  region: string
  district: string
  start_date: string
  end_date: string
  diploma: File
}

export interface IExamForm {
  entrance_via: 'entrance_exam' | 'dtm_result' | 'ielts_score' | 'duolingo'
  ielts_score?: string
  duolingo_score?: number
  certificate?: number
  transfer_transcript?: number
  transfer_application?: number
  transfer_studies: string | number
  exam_date: number
  dtm_score?: number
  dtm_application?: any
}

export interface IDirection {
  program: string
  faculty: string
}

export type MilestoneCard = {
  id: number
  year: string
  content: string
}
export type EntranceExamType =
  | 'scholarship_local'
  | 'scholarship_international'
  | 'program_local'
  | 'program_international'

export type EntranceExam = {
  id: number
  name: string
  type: EntranceExamType
  date: string
  fee: number
  registration_deadline: string
}

export type HighestQualification = {
  id: number
  title: string
}

export type IeltsScore = {
  id: number
  name: string
  slug: string
}

export interface IFinancialAid {
  title: string
  image: IPhoto
  description: string
  full_scholarship: string
  requirements: string
  the_deans_scholarship: string
  eligibility: string
  assessment: string
}

export interface IAdmissionInfo {
  title: string
  description: string
  card_title: string
  card_description: string
  anti_corruption_department: {
    title: string
    description: string
    phone: string
    email: string
    application_time: string
  }
}

export interface IContent {
  title: string
  content?: string
  icon?: string
  is_card: boolean
}

export interface IScholarshipSingle {
  title: string
  slug?: string
  image?: string
  card_title?: string
  card_description?: string
  content_items?: IContent[]
}
