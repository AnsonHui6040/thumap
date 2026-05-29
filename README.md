# thumap

校園 / 建築室內地圖導航系統

## 專案定位

thumap 是一個以 Web 為核心的室內導航 prototype，專注於校園與建築場景中的地圖互動、搜尋與路線規劃體驗。現階段專案使用單一建築 M 棟作為 mock data 範例，用來驗證室內地圖資料模型、地點搜尋、圖論路徑規劃、跨樓層導航與 QR-style 起點帶入。

這個專案的目標不是一次完成所有定位能力，而是先建立一個可長期擴充、可持續迭代、可放上 GitHub 的產品原型基礎。後續可沿著多棟建築、多樓層、多種定位方式與地圖資料管線逐步擴充。

## 核心問題

- 室內空間不像戶外 GPS 導航一樣容易定位，定位來源與場域資料通常更複雜。
- 傳統平面圖多半只能靜態查看，缺少互動搜尋與即時路線規劃能力。
- 多樓層建築需要同時處理電梯、樓梯、樓層切換與路線分段顯示。
- 第一版先以 QR-style URL start 作為起點帶入方式，降低即時定位系統的導入成本。

## 核心功能

- 建築物入口
- 樓層切換
- SVG 室內地圖
- Place 搜尋
- 起點 / 終點選擇
- Dijkstra 最短路徑
- 跨樓層路線切片
- SVG route rendering
- 中文逐步導航
- QR-style URL start 起點帶入
- 響應式介面

## 技術架構

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- SVG Indoor Map
- TypeScript mock data
- Dijkstra shortest path
- URL query parameter positioning

## 資料模型

- Building：代表建築物本體，包含建築名稱、描述與所屬樓層列表。
- Floor：代表單一樓層，包含樓層名稱、尺寸與顯示設定。
- Place：代表可搜尋的地點，例如教室、入口、電梯、樓梯與廁所。
- NavigationNode：代表路徑圖上的節點，用來建構室內可通行網路。
- Edge：代表兩個節點之間的可通行連線，並記錄權重與連線型態。
- RouteResult：代表最短路徑計算結果，包含節點序列、邊序列、總權重與錯誤訊息。
- RouteInstruction：代表中文逐步導航內容，例如步行、電梯、樓梯與抵達提示。
- RoutePoint：用來統一起點來源，讓 Place 起點與 Node 起點能以同一種抽象型別處理。

## 專案架構

- src/app：App Router 頁面與路由入口。
- src/components：UI 元件與互動式地圖、面板、搜尋介面。
- src/data：建築、樓層、地點、節點與邊的 mock data。
- src/lib：資料存取、路徑規劃與導航說明等純函式。
- src/types：專案共用型別與資料模型定義。

## 如何執行

```bash
npm install
npm run dev
npm run lint
npm run build
```

## 部署到 GitHub Pages

thumap 已加入 GitHub Pages 的 static export 設定，適合部署到：

- https://AnsonHui6040.github.io/thumap/

設定方式如下：

- 進入 GitHub repository 的 Settings → Pages。
- 將 Source 設為 GitHub Actions。
- 當 main 分支有新 commit push 後，workflow 會自動執行部署。

本機測試方式：

```bash
npm run build
```

當 Next.js 使用 `output: "export"` 時，`npm run build` 會直接產生 `out/`，可作為 GitHub Pages 的靜態部署輸出。

static export 的限制：

- 不支援 server API。
- 不支援需要 Node.js server 的功能。
- 圖片最佳化需關閉，或改用 `unoptimized`。

## 可測試路徑

- /
- /map/M
- /map/M?start=M108
- /map/M?start=M_1F_ENTRANCE
- /map/M?start=M_1F_N4
- /map/M?start=INVALID
- /map/UNKNOWN

## 建議測試案例

- M108 → M145
- M108 → 1F 廁所
- M108 → 2F 廁所
- QR start M108
- QR start M_1F_ENTRANCE
- QR start M_1F_N4
- QR start INVALID
- 起點與終點相同
- 清除起點 / 終點後路線消失

## 目前限制

- 尚未支援即時 GPS 室內定位
- 尚未支援 BLE Beacon
- 尚未支援 Wi-Fi 指紋定位
- 尚未支援 AR 導航
- 尚未支援後台地圖編輯器
- 尚未接資料庫
- 第一版只使用 mock data
- 第一版只示範 M 棟
- SVG 地圖目前是簡化示意，不是正式 CAD / BIM 圖資

## 未來擴充方向

- 擴充至多棟建築
- 加入無障礙路線
- 加入 QR Code 圖片產生
- 加入後台地圖編輯器
- 加入資料庫
- 加入 BLE Beacon / Wi-Fi 定位
- 加入活動導覽
- 加入多語系支援
- 加入地圖資料匯入工具
- 將 SVG 地圖升級為 GeoJSON / vector map pipeline

## 產品路線 Roadmap

- v0.1：目前 MVP，完成單棟建築、雙樓層、搜尋、路徑規劃、跨樓層切片與 QR-style 起點帶入。
- v0.2：擴充至多建築場景，整理資料結構、地點管理方式與基礎地圖資產。
- v0.3：加入地圖編輯器，讓節點、路徑與設施資料可視化管理。
- v0.4：引入定位能力，逐步整合 BLE Beacon、Wi-Fi 或其他室內定位來源。
- v1.0：發展為可部署的室內導航平台，支援更完整的資料流、場域管理與使用情境。