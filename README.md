# Nuxt SSR 測試專案

這是一個基於 Nuxt 3 的全端應用程式，整合了現代前端技術堆疊，用於測試伺服器端渲染 (SSR) 和資料獲取功能。

## 📋 專案概覽

本專案展示了如何使用 Nuxt 3 建立一個具有以下特性的現代網頁應用：
- ✅ 伺服器端渲染 (SSR)
- ✅ Vue Query 狀態管理
- ✅ 現代 UI 組件系統
- ✅ API 路由處理
- ✅ 外部資料獲取
- ✅ TypeScript 支援

## 🛠 技術堆疊

### 核心框架
- **Nuxt 3** (3.17.5) - 全端 Vue.js 框架
- **Vue 3** (3.5.16) - 前端框架
- **TypeScript** (5.8.3) - 型別安全

### 狀態管理與資料獲取
- **@tanstack/vue-query** (5.80.10) - 強大的資料獲取和快取管理
- **@vueuse/core** (13.4.0) - Vue 組合式函數集合

### UI/UX
- **Tailwind CSS** (4.1.10) - 實用優先的 CSS 框架
- **Reka UI** (2.3.1) - 無樣式可存取性組件
- **Lucide Vue Next** (0.522.0) - 圖示庫
- **Shadcn/UI** - 現代 UI 組件系統

### 開發工具
- **ESLint** (9.29.0) - 程式碼品質檢查
- **@nuxt/fonts** - 字體最佳化
- **@nuxt/image** - 圖片最佳化
- **@nuxt/icon** - 圖示管理

## 📁 專案結構

```
nuxt-ssr-test/
├── app.vue                    # 主應用程式入口
├── nuxt.config.ts            # Nuxt 配置檔案
├── components/               # Vue 組件目錄
│   ├── GitHubUser.vue       # GitHub 用戶資料組件 (Vue Query 示範)
│   └── ui/                  # UI 組件庫 (Shadcn/UI)
│       ├── button/          # 按鈕組件
│       └── alert-dialog/    # 對話框組件
├── server/                  # 伺服器端代碼
│   └── api/
│       └── kktix.ts        # KKTIX RSS 資料 API
├── plugins/                 # Nuxt 外掛
│   └── vue-query.ts        # Vue Query 配置
├── lib/                    # 實用工具函數
│   └── utils.ts           # 通用工具函數
├── assets/                 # 靜態資源
│   └── css/
│       └── tailwind.css   # Tailwind CSS 配置
└── public/                # 公共資源
    ├── favicon.ico
    └── robots.txt
```

## 🚀 快速開始

### 環境需求
- Node.js 18+ 
- npm/pnpm/yarn

### 安裝依賴

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

### 開發環境

啟動開發伺服器 (http://localhost:3000)：

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev
```

### 建置產品版本

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build
```

### 預覽產品版本

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview
```

## 🔧 功能特色

### 1. Vue Query 整合
- **客戶端狀態管理**：使用 `@tanstack/vue-query` 進行資料獲取和快取
- **SSR 支援**：在伺服器端預取資料，客戶端水合
- **錯誤處理**：內建重試機制和錯誤狀態管理

### 2. API 路由
- **KKTIX RSS API** (`/api/kktix`)：
  - 獲取 KKTIX 活動資料
  - XML 解析為 JSON 格式
  - 錯誤回退機制 (提供模擬資料)
  - 支援 CORS 和錯誤處理

### 3. UI 組件系統
- **Shadcn/UI 整合**：現代、可存取的 UI 組件
- **Tailwind CSS**：實用優先的樣式系統
- **暗色模式支援**：內建明暗主題切換
- **響應式設計**：支援各種螢幕尺寸

### 4. 型別安全
- **完整 TypeScript 支援**：所有代碼都有型別檢查
- **API 回應型別**：定義完整的介面型別
- **組件 Props 驗證**：確保組件使用的型別安全

## 📄 主要檔案說明

### `app.vue`
主應用程式入口，展示：
- Vue Query 資料獲取示範
- UI 組件使用範例
- GitHub API 和本地 API 呼叫

### `components/GitHubUser.vue`
示範 Vue Query 用法：
- 非同步資料載入
- 載入狀態處理
- 錯誤狀態顯示

### `server/api/kktix.ts`
後端 API 路由：
- RSS 資料獲取和解析
- 錯誤處理和回退機制
- CORS 支援

### `plugins/vue-query.ts`
Vue Query 設定：
- QueryClient 配置
- SSR 支援 (dehydrate/hydrate)
- 快取策略設定

## 🌐 API 端點

### `/api/kktix`
- **方法**: GET
- **用途**: 獲取 KKTIX 活動資料
- **回應格式**: JSON
- **特色**: 
  - RSS 到 JSON 轉換
  - 錯誤時提供模擬資料
  - 支援 CORS

## 📚 學習資源

- [Nuxt 3 文件](https://nuxt.com/docs)
- [Vue Query 文件](https://tanstack.com/query/latest/docs/vue/overview)
- [Tailwind CSS 文件](https://tailwindcss.com/docs)
- [Shadcn/UI Vue 文件](https://www.shadcn-vue.com)

## 🤝 開發指南

### 代碼規範
- 使用 ESLint 進行代碼檢查
- 遵循 Vue 3 Composition API 最佳實踐
- TypeScript 嚴格模式

### 新增組件
1. 在 `components/` 目錄下建立新組件
2. 使用 TypeScript 和 Composition API
3. 遵循 Shadcn/UI 設計規範

### 新增 API 路由
1. 在 `server/api/` 目錄下建立新檔案
2. 使用 `defineEventHandler` 包裝
3. 加入適當的錯誤處理

## 📄 授權

此專案用於學習和測試目的。

---

**專案分析時間**: ${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}
