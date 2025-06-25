<template>
  <div>
    <div v-if="query.isPending">載入中...</div>
    <div v-else-if="query.isError">錯誤c c : {{ query.error }}</div>
    <pre v-else>{{ query.data }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'

// 使用普通的 useQuery，但在父組件中用 Suspense 包裝
const query = toRef(useQuery({
  queryKey: ['github-user', 'nuxt'],
  queryFn: async () => {
    const response = await fetch('https://api.github.com/users/nuxt')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }
}))
</script> 