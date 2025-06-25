<template>
  <div class="p-6 bg-gray-100 rounded-lg">
    <h3 class="text-lg font-bold mb-4">Pinia Store 示範</h3>
    
    <div class="space-y-4">
      <div>
        <p><strong>目前狀態:</strong> {{ store.someState }}</p>
        <p><strong>計數:</strong> {{ store.count }}</p>
        <p><strong>雙倍計數:</strong> {{ store.doubleCount }}</p>
      </div>
      
      <div class="space-x-2">
        <Button @click="store.increment()" variant="default">
          增加計數
        </Button>
        
        <Button @click="updateMessage" variant="outline">
          更新訊息
        </Button>
        
        <Button @click="resetStore" variant="destructive">
          重置
        </Button>
      </div>
      
      <div class="text-sm text-gray-600">
        <p>💾 此狀態會自動保存到 localStorage</p>
        <p>🔄 重新整理頁面後狀態會保持</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~/stores/count'

const store = useStore()

function updateMessage() {
  const messages = [
    'Hello Pinia!',
    'Vue 3 很棒！',
    'Nuxt 3 超讚！',
    'TypeScript 萬歲！',
    'SSR 真香！'
  ]
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
  store.updateState(randomMessage)
}

function resetStore() {
  store.updateState('hello pinia')
  store.count = 0
}
</script> 