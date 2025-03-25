import { defineStore } from 'pinia'

import { useApi } from '~/composables/useApi'
import { useHandleError } from '~/composables/useHandleError'
import type { IDefaultResponse, IParams } from '~/types'
import type { IProgram, IProgramList } from '~/types/about/index.types'
import type { AreaOfStudy, Faculty, IProgramLevel } from '~/types/common'

export const useUniversityStore = defineStore('university', {
  state: () => ({
    areaOfStudy: [] as AreaOfStudy[],
    faculties: [] as Faculty[],
    programs: [] as IProgramList[],
    facultiesFilter: [] as Faculty[],
    programLevels: [] as IProgramLevel[],
  }),

  actions: {
    async fetchAreaOfStudy() {
      if (this.areaOfStudy?.length) return

      try {
        const res = await useApi().$get<IDefaultResponse<AreaOfStudy>>(
          '/program/study-format-list/'
        )
        this.areaOfStudy = res.results
      } catch (e) {
        useHandleError().handleError(e)
      }
    },

    async fetchFaculties() {
      if (this.faculties?.length) return

      try {
        const res = await useApi().$get<IDefaultResponse<Faculty>>(
          '/program/faculties-list/'
        )
        this.faculties = res.results
      } catch (e) {
        useHandleError().handleError(e)
      }
    },

    // eslint-disable-next-line camelcase
    async fetchPrograms(level?: string, scope?: string, study_format?: string) {
      try {
        const res = await useApi().$get<IDefaultResponse<IProgramList>>(
          `/program/program-filter/`,
          {
            // eslint-disable-next-line camelcase
            params: { scope, level, study_format, limit: 30 },
          }
        )
        this.programs = res.results
      } catch (e) {
        useHandleError().handleError(e)
      }
    },
    async fetchProgramLevels() {
      try {
        const res = await useApi().$get<IDefaultResponse<IProgramLevel>>(
          `/program/level-list/`,
          {
            params: { limit: 30 },
          }
        )
        this.programLevels = res.results
      } catch (e) {
        useHandleError().handleError(e)
      }
    },
  },
})
