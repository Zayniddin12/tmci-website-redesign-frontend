export interface IApplyLocal {
  first_name: string
  last_name: string
  fathers_name: string
  passport_serial_number: string
  birth_date: string
  phone_number: string
  emergency_contact: string
  email: string
  gender: string
  entrance_via: number | string
  entrance_exam: number
  passport_file_1: File
  passport_file_2: File
  programmes: number
  direction: number
  area_of_study: number
  transcript: File
  dtm_score: number
  dtm_certificate: File
  // eslint-disable-next-line no-use-before-define
  type: TApplyType
}

export interface IApplyInternational {
  first_name: string
  last_name: string
  fathers_name: string
  nationality: number
  citizenship: number
  region: number
  passport_serial_number: string
  birth_date: string
  phone_number: string
  emergency_contact: string
  email: string
  highest_qualification: string
  highest_qualification_name: string
  highest_qualification_region: string
  highest_qualification_district: string
  highest_qualification_start_date: string
  highest_qualification_end_date: string
  highest_qualification_diploma: File
  entrance_via: number
  programmes: number
  direction: number
  entrance_exam: number
  passport_file_1: File
  passport_file_2: File
  area_of_study: number
  ielts_score: number
  ielts_certificate: File
  // eslint-disable-next-line no-use-before-define
  type: TApplyType
}

export interface IEntranceExam {
  id: number
  price: number
  start_date: string
  end_date: string
}

export type TApplyType = 'local' | 'international'
