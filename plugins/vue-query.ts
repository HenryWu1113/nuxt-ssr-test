import { VueQueryPlugin, QueryClient, dehydrate, hydrate } from '@tanstack/vue-query'
import type { DehydratedState } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query')
  
  // 創建 QueryClient
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 分鐘
        gcTime: 1000 * 60 * 60 * 24, // 24 小時 (之前叫 cacheTime)
      },
    },
  })

  const options = {
    queryClient,
  }

  nuxtApp.vueApp.use(VueQueryPlugin, options)

  if (import.meta.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (import.meta.client && vueQueryState.value) {
    hydrate(queryClient, vueQueryState.value)
  }
}) 