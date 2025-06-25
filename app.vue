<template>
  <div>
    <h1>Hello World</h1>
    <Button asChild class="bg-red-500 border-2 border-blue-500 ml-10 hover:bg-blue-500 hover:text-white" @click="alertHello">
      <h1>Click me</h1>
    </Button>
    
    <!-- 直接使用 GitHubUser 組件 -->
    <div>
      <h2>GitHub 用戶資料 (Vue Query 組件)</h2>
      <GitHubUser v-if="false" />
    </div>

    <!-- 使用手動預取的方式 -->
    <div>
      <h2>本地 API (Vue Query)</h2>
      <div v-if="localQuery.isPending.value">載入中...</div>
      <div v-else-if="localQuery.isError.value">錯誤: {{ localQuery.error.value }}</div>
      <pre v-else>{{ localQuery.data.value }}</pre>
    </div>
    <PiniaDemo />
    <!-- 台灣習慣的日期顯示方式 -->
    <div class="mt-4 p-4 border rounded-lg">
      <h3 class="font-bold mb-2">日期時間顯示</h3>
      <div class="space-y-2">
        <div>
          <span class="font-medium">當前時間（台北時區）：</span>
          <time :datetime="$dayjs().tz('Asia/Taipei').format()">
            {{ $dayjs().tz('Asia/Taipei').format('YYYY年MM月DD日 HH:mm:ss') }}
          </time>
        </div>
        <div>
          <span class="font-medium">範例日期（台灣格式）：</span>
          <time :datetime="$dayjs('2023-01-01').tz('Asia/Taipei').format()">
            {{ $dayjs('2023-01-01').tz('Asia/Taipei').format('YYYY/MM/DD (ddd)') }}
          </time>
        </div>
        <div>
          <span class="font-medium">完整日期時間：</span>
          <time :datetime="$dayjs('2023-01-01 14:30:00').tz('Asia/Taipei').format()">
            {{ $dayjs('2023-01-01 14:30:00').tz('Asia/Taipei').format('YYYY年MM月DD日 dddd 下午HH:mm') }}
          </time>
        </div>
      </div>
    </div>
    <h1>{{ text }}</h1>
    <!-- 比較：原本的 useFetch -->
    <div>
      <h2>useFetch 結果（原生 SSR 支援）</h2>
      <pre>{{ githubData }}</pre>
      <!-- <pre>{{ localData }}</pre> -->
    </div>

    <AlertDialog>
    <AlertDialogTrigger as="button" class="bg-red-500 border-2 border-blue-500 ml-10 hover:bg-blue-500 hover:text-white">Open</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  </div>
</template>

<script lang="ts" setup>
import { useQuery, useQueryClient } from '@tanstack/vue-query'

const text = useToUpper("it works!");

console.log(isEqual({a:1},{a:1}))

const a = ref({name:'Henry'})
const b=ref(a.value)
console.log('a===(useCloneDeep(b))',a.value===useCloneDeep(b.value))

// 取得 QueryClient 實例
const queryClient = useQueryClient()

// 在服務端預取資料（使用 $fetch）
// if (import.meta.server) {
//   try {
//     await queryClient.prefetchQuery({
//       queryKey: ['local-api'],
//       queryFn: async () => {
//         // 使用 $fetch 替代原生 fetch
//         return await $fetch('http://localhost:8081/')
//       }
//     })
//   } catch (error) {
//     console.log('Server prefetch failed:', error)
//   }
// }

// 使用 Vue Query 獲取本地 API（使用 $fetch）
const localQuery = useQuery({
  queryKey: ['local-api'],
  queryFn: async () => {
    // 使用 $fetch 替代原生 fetch，它會自動處理 SSR/客戶端差異
    return await $fetch('http://localhost:8081/')
  },
  retry: 1, // 減少重試次數
})

const alertHello = () => {
  alert('Hello')
  return 'Hello'
}

// const localQuery2 = useQuery({
//   queryKey: ['github-user', 'nuxt'],
//   queryFn: async () => {
//     const response = await fetch('https://api.github.com/users/nuxt')
//     if (!response.ok) {
//       throw new Error('Network response was not ok')
//     }
//     return response.json()
//   }
// })

// 比較：使用 Nuxt 原生的 useFetch（自動支援 SSR）
const { data: githubData } = await useFetch('https://api.github.com/users/nuxt')
// const { data: localData } = await useFetch('http://localhost:8081/')
</script>
