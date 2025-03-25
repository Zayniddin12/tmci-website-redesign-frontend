import { useCustomToast } from '@/composables/useCustomToast'

export const useHandleError = () => {
  const { showToast } = useCustomToast()

  function handleError(error: any) {
    if (error?._data) {
      if (error?._data?.detail) {
        showToast(error?._data?.detail, 'error')
      } else if (!error?._data?.errors?.length) {
        showToast(error?._data?.[0]?.error?.message, 'error')
      } else {
        showToast(error?._data?.errors[0]?.message, 'error')
      }
    } else if (error?.response?._data) {
      if (!error?.response?._data?.errors?.length) {
        showToast(error?.response?._data?.[0]?.error?.message, 'error')
      } else {
        showToast(error?.response?._data?.errors?.[0]?.message, 'error')
      }
    }
  }

  return { handleError }
}
