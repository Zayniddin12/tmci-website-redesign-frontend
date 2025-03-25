export interface IDefaultResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ICustomObject<T = string> {
  [key: string]: T
}

type TClass =
  | string
  | string[]
  | Record<string, boolean>
  | Record<string, boolean>[]

export type TClassName = TClass | TClass[]

export interface IParams {
  page?: number
  limit: number
  offset: number
  search?: string
}

export interface IStaticData {
  id: number
  title: string
  description: string
}

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
  Loaded = 'loaded',
}

export interface IFeedbackForm {
  student_employee_id?: string
  name: string
  campus: number
  college_program?: string
  email: string
  phone_number: string
  details?: string
  feedback_type?: number
  question_type?: number
}
