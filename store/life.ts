import type { IDefaultResponse } from '~/types'
import type { IPostSingle, IStory } from '~/types/home.types'

export const useLifeStore = defineStore('life', {
  state: () => ({
    postSingle: {} as IPostSingle,
    stories: [] as IStory[],
    hasNextStory: null as string | null,
  }),
  actions: {
    fetchPostSingle(slug?: string) {
      return new Promise<IPostSingle>((resolve, reject) => {
        useApi()
          .$get(`/post/${slug}`)
          .then((data) => {
            this.postSingle = data
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchStories(params?: any) {
      return new Promise<IStory[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IStory>>(`static/student-story/`, { params })
          .then((data) => {
            this.stories = data?.results
            this.hasNextStory = data?.next
            resolve(this.stories)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})
