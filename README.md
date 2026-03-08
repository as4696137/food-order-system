# Food Order System

> 一個具備響應式設計 (RWD)、溫暖主題風格的線上點餐系統前端應用。
> https://food-order-system-8tx.pages.dev/

## 🌟 專案簡介 (Overview)

Food Order System 是一個使用 React 和 TypeScript 打造的模擬線上點餐平台。專案採用了 Material-UI (MUI) 定製了溫暖、乾淨的視覺主題，並且確保在各種裝置 (桌機、平板、手機) 上都能提供良好的使用者體驗 (Responsive Web Design)。

此前端應用程式具備以下核心功能：
- **瀏覽菜單 (Menu Browsing)**：使用者可以瀏覽多種分類的餐點。
- **購物車管理 (Cart Management)**：
  - 新增餐點至購物車。
  - 在購物車內調整餐點數量或移除餐點。
  - 即時計算訂單總金額與數量。
- **歷史訂單 (Order History)**：結帳後，可於歷史紀錄區查看過往的訂單明細與總花費。
- **狀態管理**：使用 Redux Toolkit 進行全域狀態 (Cart, History) 管理。
- **測試覆蓋**：專案包含完整的單元測試 (Unit Test) 與整合測試 (Integration Test)，確保核心邏輯與 UI 渲染的穩定性。

## 🛠 技術棧 (Built With)

- **核心 (Core)**: [React 18](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **狀態管理 (State Management)**: [Redux Toolkit](https://redux-toolkit.js.org/), [React-Redux](https://react-redux.js.org/)
- **路由 (Routing)**: [React Router DOM](https://reactrouter.com/)
- **UI 框架 (UI Framework)**: [Material-UI (MUI)](https://mui.com/), [Emotion](https://emotion.sh/docs/introduction)
- **測試 (Testing)**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), jsdom

## 📂 專案結構 (Folder Structure)

```text
src/
 ├── components/       # 共用 UI 元件 (如 Header, Layout 等)
 ├── pages/            # 頁面元件 (Menu, Cart, History 等)
 ├── store/            # Redux Store 設置與 Slices (cartSlice, historySlice等)
 ├── utils/            # 工具函數 (如 test-utils 測試配置)
 ├── App.tsx           # 應用程式進入點與路由配置
 └── main.tsx          # 程式進入點 (Provider 綁定)
```

## 🚀 本地開發與運行 (Getting Started)

### 環境要求 (Prerequisites)
- [Node.js](https://nodejs.org/) (建議使用 v18 或以上版本)

### 安裝步驟 (Installation)

1. 進入專案目錄：
   ```bash
   cd food-order-system
   ```

2. 安裝必要的套件依賴：
   ```bash
   npm install
   ```

3. 啟動開發伺服器：
   ```bash
   npm run dev
   ```
   應用程式將會運行在預設的 Vite port (通常為 `http://localhost:5173/`)。

4. 建立正式版 (Production Build)：
   ```bash
   npm run build
   ```

## 🧪 測試說明 (Testing)

這個專案使用了 Vitest 搭配 React Testing Library 來撰寫測試，確保 Redux 的邏輯抽換與 React Component 的互動行為都在預期之內。

- **執行所有測試**：
  ```bash
  npm run test
  ```
- 測試涵蓋範圍：
  - Redux Reducers 與 Actions (e.g., `cartSlice.test.ts`, `historySlice.test.ts`)
  - React UI 元件的渲染與互動 (e.g., `Menu.test.tsx`, `Cart.test.tsx`, `History.test.tsx`, `App.test.tsx`)
