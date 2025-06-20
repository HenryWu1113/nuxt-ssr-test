<template>
  <div>
    <div v-if="isPending">載入中...</div>
    <div v-else-if="isError">錯誤: {{ error }}</div>
    <pre v-else>{{ data }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'

// 使用普通的 useQuery，但在父組件中用 Suspense 包裝
const { data, isPending, isError, error } = useQuery({
  queryKey: ['github-user', 'nuxt'],
  queryFn: async () => {
    const response = await fetch('https://api.github.com/users/nuxt')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }
})
</script> 