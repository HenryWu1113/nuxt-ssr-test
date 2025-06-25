import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStore = defineStore(
  'main',
  () => {
    // 狀態
    const someState = ref('hello pinia')
    const count = ref(0)
    
    // 計算屬性
    const doubleCount = computed(() => count.value * 2)
    
    // 動作
    function increment() {
      count.value++
    }
    
    function updateState(newState: string) {
      someState.value = newState
    }
    
    return { 
      someState, 
      count, 
      doubleCount, 
      increment, 
      updateState 
    }
  },
  {
    persist: {
      // 可以指定要持久化的狀態鍵值
      key: 'main-store',
      storage: piniaPluginPersistedstate.localStorage(),
      // 在 Nuxt 環境中，預設就會使用 localStorage
      // 或者指定只持久化特定欄位
      // pick: ['count', 'someState']
    },
  },
)