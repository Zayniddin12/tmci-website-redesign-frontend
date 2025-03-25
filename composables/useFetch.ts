export const useMyFetch: typeof useFetch = (request, opts?) => {
  const locale = useCookie('locale').value || 'en'
  return useFetch(request, {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      ...opts?.headers,
      'Accept-Language': locale,
    },
  })
}
