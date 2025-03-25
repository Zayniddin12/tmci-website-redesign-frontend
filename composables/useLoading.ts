import { ref } from 'vue'

import { LoadingStatus } from '~/types'

export const useLoading = () => {
  const loading = ref<LoadingStatus>(LoadingStatus.Idle)
  const setLoading = (status: LoadingStatus) => {
    loading.value = status
  }

  const callbackFunction = async (callback: () => Promise<void>) => {
    setLoading(LoadingStatus.Loading)
    try {
      await callback()
      setLoading(LoadingStatus.Success)
    } catch (error) {
      setLoading(LoadingStatus.Failed)
    } finally {
      setLoading(LoadingStatus.Loaded)
    }
  }
  return { loading, callbackFunction }
}
