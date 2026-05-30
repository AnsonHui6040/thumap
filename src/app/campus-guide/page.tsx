import Link from "next/link";
import type { ReactNode } from "react";

const heroHighlights = [
  "校門 / 站牌 / 停車",
  "手機優先多方位導覽",
  "串接現有 M 棟導航",
];

const summaryStats = [
  {
    label: "Screen set",
    value: "3 flows",
    description: "校園總覽、室內帶路、交通選擇一次整理。",
  },
  {
    label: "Audience",
    value: "新生 / 訪客",
    description: "先解決到校與定位，再切入室內地圖。",
  },
  {
    label: "Live handoff",
    value: "M 棟",
    description: "可直接從導覽頁接到既有導航工作區。",
  },
];

const overviewZones = [
  {
    title: "教學核心區",
    description: "管理學院、人文與主要教室棟集中在這一帶，首訪先看這個區帶最有效。",
  },
  {
    title: "圖資軸帶",
    description: "圖書館、集合點與資訊看板密集，適合作為校內重定位主軸。",
  },
  {
    title: "管理學院 M 區",
    description: "從外部總覽切到單一建築時，優先顯示 M 棟入口、樓層與教室碼。",
  },
  {
    title: "交通轉乘節點",
    description: "公車站、接駁站與共享移動工具集中在這一層資訊，方便先決定如何進校。",
  },
  {
    title: "正門入口 / 服務台",
    description: "最適合首訪者與大型活動日，旁邊就能接導覽牌、警衛室與校園資訊點。",
  },
  {
    title: "第二校門 / P1-P2",
    description: "適合開車或外圍進校，停車後能快速轉步行並靠近管理學院側入口。",
  },
];

const facilityHints = [
  {
    title: "教室代碼提示",
    description: "M101 = M 棟 + 1 樓 + 第 01 間教室，先理解編碼再開始找路。",
  },
  {
    title: "管理學院樓層",
    description: "B：影印/服務台；1F：討論室與階梯教室；2F：圖書館與專業教室。",
  },
  {
    title: "首次來校流程",
    description: "先選入口或站點，再看建築分區與接駁層級，最後才切入室內 QR 或教室導航。",
  },
  {
    title: "接駁站層級",
    description: "A：正門集散；B：圖書館轉乘；C：管理學院短駁，讓不同到校方式能直接接不同入口。",
  },
  {
    title: "熱門錨點",
    description: "圖書館、主軸大道、管理學院入口與正門服務台都可作為迷路時的重新定位點。",
  },
  {
    title: "入口選擇建議",
    description: "公車與首訪優先正門；停車與外圍進校優先第二校門；已在校內可直接切接駁站 B 或 C。",
  },
];

const routeStats = [
  { label: "ETA", value: "2m" },
  { label: "Weight", value: "74" },
  { label: "Status", value: "Ready" },
];

const routeSteps = [
  {
    title: "從西側入口節點沿主走廊直行",
    description: "對應 QR 起點與第一段高亮路徑。",
  },
  {
    title: "略過樓梯 / 電梯核心，保持右側動線",
    description: "若切到無障礙模式，可在這裡改成電梯方案。",
  },
  {
    title: "左轉進入東翼短廊，抵達 M145",
    description: "終點卡會顯示教室與最後提醒。",
  },
];

const indoorHints = [
  {
    title: "QR 失效時",
    description: "立即改用搜尋起點或地圖手動選點，不讓流程中斷。",
  },
  {
    title: "跨樓層時",
    description: "切換成樓梯 / 電梯建議，並說明下一層的接續點。",
  },
];

const transportOptions = [
  {
    label: "校內動線",
    title: "步行主軸 / 接駁 / YouBike / Oloo",
    description: "到校後不一定立刻進室內，先看主坡道、接駁點與共享移動工具，讓外部交通和校內移動能無縫接起來。",
  },
  {
    label: "市區公車",
    title: "榮總 / 東海大學站 / 校門站點",
    description: "300、306、323、325 等路線先帶你到主要下車點，再用站牌 → 校門 → 系館三段式導覽接續。",
  },
  {
    label: "高鐵 / 火車轉乘",
    title: "高鐵台中站 / 台中車站 → 公車轉乘",
    description: "外地來訪者先看站外轉乘方案，再根據抵達站點自動推薦正門或第二校門入口。",
  },
  {
    label: "開車 / 停車",
    title: "交流道 → 校門 → P1 / 周邊停車",
    description: "不只告訴使用者停哪裡，也要把停車完成後走哪條步行路線一起交代。",
  },
  {
    label: "接駁站層級",
    title: "A 正門集散 / B 圖書館轉乘 / C 管院短駁",
    description: "A 適合首訪與大型活動；B 適合在教學區之間移動；C 適合已知要去 M 棟的短距離切入。",
  },
  {
    label: "停車備援",
    title: "P1 滿位時改走 P2 + 第二校門",
    description: "把停車滿載也視為導航輸入，直接切換替代入口與步行路線，不讓資訊中斷。",
  },
];

const arrivalRoutes = [
  {
    title: "正門 → 管院 8 分",
    description: "適合步行與公車到訪，先沿主軸道路，再從 M 棟西入口切入室內模式。",
  },
  {
    title: "第二校門 → 管院 5 分",
    description: "適合停車後步行或外圍進校，路徑較短，應優先標記樓梯與坡道差異。",
  },
  {
    title: "榮總站 → 正門 4 分",
    description: "下車後先顯示最近校門與步行分鐘數，再導入系館或教室。",
  },
  {
    title: "P1 停車場 → M 棟 6 分",
    description: "停車完成後直接轉步行模式，並提示哪一個入口最接近管理學院。",
  },
  {
    title: "高鐵台中站 → 正門 45 分",
    description: "先顯示高鐵轉公車方案，再引導至正門或第二校門，不要求使用者自己拼接資訊。",
  },
  {
    title: "宿舍區 → 教學核心區 12 分",
    description: "顯示步行時間、接駁選項與主坡道提醒，避免只剩平面地圖資訊。",
  },
];

const implementationLinks = [
  {
    title: "校園總覽先行",
    description: "把入口、站牌、停車與校區分帶做成真頁面，先解決首次到校的資訊斷點。",
    href: "/campus-guide",
    action: "停留在導覽頁",
  },
  {
    title: "室內導航接續",
    description: "從手機導覽頁直接跳進 M 棟導航工作區，保留既有搜尋、樓層切換與路徑規劃。",
    href: "/map/M",
    action: "打開 M 棟導航",
  },
  {
    title: "首頁入口保留",
    description: "仍然可以從首頁進建築選擇器，讓產品展示與功能入口共存，不互相擠壓。",
    href: "/",
    action: "回到首頁",
  },
];

type PhoneShellProps = {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

type ChipProps = {
  children: ReactNode;
  active?: boolean;
};

function Chip({ children, active = false }: ChipProps) {
  const classes = active
    ? "border-transparent bg-[var(--accent)] text-white shadow-[0_10px_24px_rgba(15,118,110,0.22)]"
    : "border-slate-200/80 bg-white/90 text-slate-600";

  return (
    <span
      className={`rounded-full border px-3 py-2 text-[11px] font-medium tracking-[0.04em] ${classes}`}
    >
      {children}
    </span>
  );
}

function PhoneShell({ badge, title, description, children, footer }: PhoneShellProps) {
  return (
    <article className="min-w-[320px] max-w-[360px] snap-start rounded-[38px] bg-slate-950 p-3 shadow-[0_28px_80px_rgba(15,23,42,0.24)] md:min-w-0 md:max-w-none">
      <div className="mb-3 flex justify-center">
        <div className="h-6 w-36 rounded-b-[18px] bg-slate-900" />
      </div>

      <div className="flex h-full flex-col rounded-[28px] border border-white/65 bg-[linear-gradient(180deg,#fcfaf7_0%,#f2ede3_100%)]">
        <div className="border-b border-slate-200/80 px-5 pb-4 pt-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                {badge}
              </p>
              <h2 className="mt-3 text-[26px] font-semibold tracking-tight text-slate-900">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </div>
            <span className="rounded-full border border-slate-200/80 bg-white/90 px-3 py-1 text-xs font-medium text-slate-500">
              Mobile
            </span>
          </div>
        </div>

        <div className="flex-1 px-4 py-4">{children}</div>

        <div className="border-t border-slate-200/80 px-4 py-4">{footer}</div>
      </div>
    </article>
  );
}

function CampusMapIllustration() {
  return (
    <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-label="campus overview">
      <rect x="20" y="24" width="280" height="170" rx="26" fill="#f8f6f2" stroke="rgba(24,34,39,0.08)" />
      <ellipse cx="84" cy="72" rx="54" ry="32" fill="#dfead8" />
      <ellipse cx="232" cy="66" rx="46" ry="28" fill="#dceff0" />
      <ellipse cx="96" cy="146" rx="56" ry="34" fill="#f4ead6" />
      <ellipse cx="232" cy="146" rx="58" ry="34" fill="#e9f0dc" />
      <path d="M42 118 H 278" fill="none" stroke="#cbd4d8" strokeWidth="12" strokeLinecap="round" />
      <path d="M156 42 V 186" fill="none" stroke="#d6ddde" strokeWidth="10" strokeLinecap="round" />
      <path
        d="M50 118 C 76 118, 92 132, 104 150"
        fill="none"
        stroke="#0f766e"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="10 8"
      />
      <path
        d="M258 118 C 238 118, 220 130, 208 146"
        fill="none"
        stroke="#ea7d39"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="10 8"
      />
      <circle cx="48" cy="118" r="10" fill="#0f766e" />
      <circle cx="274" cy="118" r="10" fill="#ea7d39" />
      <circle cx="244" cy="92" r="9" fill="#ffffff" stroke="#182227" strokeWidth="3" />
      <rect x="203" y="146" width="24" height="18" rx="5" fill="#ffffff" stroke="#182227" strokeWidth="2" />
      <rect x="84" y="144" width="30" height="20" rx="6" fill="#ffffff" stroke="#182227" strokeWidth="2" />
      <g fill="#182227" fontFamily="Avenir Next, PingFang TC, Noto Sans TC, sans-serif" fontSize="11" fontWeight="700">
        <text x="32" y="68">教學區</text>
        <text x="205" y="66">圖書館</text>
        <text x="56" y="180">正門</text>
        <text x="76" y="142">管理學院 M</text>
        <text x="220" y="90">公車站</text>
        <text x="200" y="178">P1 停車</text>
        <text x="244" y="138">第二校門</text>
      </g>
    </svg>
  );
}

function IndoorMapIllustration() {
  return (
    <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-label="indoor route map">
      <rect x="26" y="38" width="268" height="144" rx="26" fill="#fffdfa" stroke="rgba(24,34,39,0.08)" />
      <path d="M62 108 H 132 H 192 H 262" fill="none" stroke="#d7dddf" strokeWidth="18" strokeLinecap="round" />
      <path
        d="M62 108 H 132 H 192 H 262"
        fill="none"
        stroke="#ea7d39"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="14 8"
      />
      <circle cx="62" cy="108" r="12" fill="#0f766e" />
      <circle cx="262" cy="108" r="12" fill="#ea7d39" />
      <circle cx="192" cy="108" r="10" fill="#ffffff" stroke="#182227" strokeWidth="3" />
      <g fill="#182227" fontFamily="Avenir Next, PingFang TC, Noto Sans TC, sans-serif" fontSize="12" fontWeight="700">
        <text x="48" y="136">M108</text>
        <text x="244" y="136">M145</text>
        <text x="173" y="136">轉折</text>
      </g>
    </svg>
  );
}

export default function CampusGuidePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-10 md:px-10 md:py-14">
      <section className="overflow-hidden rounded-[36px] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(240,248,245,0.86))] px-5 py-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] sm:px-8 sm:py-8 md:px-10 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[var(--accent)]">
              Mobile-first Campus Guide
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              把多方位手機導覽真正接進 thumap
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              這個頁面把先前的手機 storyboard 轉成真的 Next.js 畫面，先處理校門、站牌、停車與校區分帶，再把使用者接回 M 棟室內導航。它不是取代既有地圖工作區，而是把首次到校與到樓前的資訊補齊。
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-sm font-medium text-slate-700">
              {heroHighlights.map((highlight) => (
                <span key={highlight} className="rounded-full bg-white/90 px-3 py-2 shadow-sm">
                  {highlight}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/map/M"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(15,118,110,0.22)] transition duration-200 hover:bg-[var(--accent-strong)]"
              >
                直接打開 M 棟導航
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                回到首頁
              </Link>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/75 bg-white/86 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              What changed
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              從概念稿變成 app 內可點的真頁面
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              目前先用 App Router 靜態頁落地這個導覽流程，讓校園總覽、室內導引與交通選擇能和現有 M 棟導航共存。下一步若要繼續深化，可以把這些資料再接到真正的 campus data model。
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {summaryStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[22px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,248,0.92))] p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[34px] border border-[var(--line)] bg-[var(--surface)] px-4 py-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:px-6 sm:py-6 md:px-8 md:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
              Storyboards In App
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              手機導覽流程已經變成可瀏覽的真畫面
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-500">
            先用三個手機畫面整理從到校、找入口、切到建築，再接上室內路徑與交通決策。手機上可左右滑動，桌面上會並排呈現。
          </p>
        </div>

        <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          <PhoneShell
            badge="Overview"
            title="校園總覽"
            description="先釐清從哪個校門進校、巴士下車點在哪、停車該往哪停，再決定要切去哪一棟系館與哪一層。"
            footer={
              <div className="rounded-[20px] bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] px-4 py-4 text-white shadow-[0_18px_30px_rgba(15,118,110,0.24)]">
                <p className="text-sm font-semibold">從正門、接駁站 A 或 P1 停車開始，帶你走到管理學院</p>
                <p className="mt-1 text-xs leading-5 text-white/80">
                  入口、站點、停車與校區分帶都已接到室內導航
                </p>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="rounded-[20px] border border-slate-200/80 bg-white/90 px-4 py-3 text-sm text-slate-500 shadow-sm">
                搜尋校門、公車站、停車區、系館或教室代碼...
              </div>

              <div className="flex flex-wrap gap-2">
                <Chip active>正門 / 服務台</Chip>
                <Chip>教學核心區</Chip>
                <Chip>接駁站 A</Chip>
                <Chip>P1 / P2</Chip>
              </div>

              <section className="rounded-[24px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,248,246,0.94))] p-4 shadow-[0_18px_30px_rgba(15,23,42,0.05)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Campus map
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                  先選入口，再切進校園區域與室內導航
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  校門、巴士站與停車場是起點圖層，再往管理學院或教室碼細看，不要求使用者一開始就理解整張地圖。
                </p>
                <div className="mt-4 overflow-hidden rounded-[22px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(220,239,240,0.6),rgba(255,255,255,0.92))] p-2">
                  <CampusMapIllustration />
                </div>
              </section>

              <div className="grid grid-cols-2 gap-2">
                {overviewZones.map((zone) => (
                  <div
                    key={zone.title}
                    className="rounded-[18px] border border-slate-200/80 bg-white/92 p-3 shadow-[0_12px_22px_rgba(15,23,42,0.04)]"
                  >
                    <p className="text-sm font-semibold tracking-tight text-slate-900">{zone.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{zone.description}</p>
                  </div>
                ))}
              </div>

              <section className="rounded-[22px] border border-[rgba(15,118,110,0.16)] bg-[linear-gradient(180deg,rgba(15,118,110,0.08),rgba(255,255,255,0.96))] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Orientation ladder
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                  先入口、再區帶、再系館，避免一開始就陷進樓層細節
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  首訪建議順序是正門或站牌 → 教學核心區 / 圖資軸帶 → 管理學院入口 → 樓層 / 教室代碼。
                </p>
              </section>

              <div className="grid grid-cols-2 gap-2">
                {facilityHints.map((hint) => (
                  <div
                    key={hint.title}
                    className="rounded-[18px] border border-slate-200/80 bg-white/92 p-3 shadow-[0_12px_22px_rgba(15,23,42,0.04)]"
                  >
                    <p className="text-sm font-semibold tracking-tight text-slate-900">{hint.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{hint.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </PhoneShell>

          <PhoneShell
            badge="Indoor"
            title="室內帶路"
            description="當使用者已經進到 M 棟，就切成 QR + 室內節點導覽模式。"
            footer={
              <div className="flex items-center justify-between gap-3 rounded-[20px] bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] px-4 py-4 text-white shadow-[0_18px_30px_rgba(15,118,110,0.24)]">
                <div>
                  <p className="text-sm font-semibold">下一步：向東直行 35 公尺</p>
                  <p className="mt-1 text-xs leading-5 text-white/80">
                    已同步顯示 QR 起點與目的地剩餘距離
                  </p>
                </div>
                <Link
                  href="/map/M"
                  className="rounded-full bg-white/16 px-4 py-2 text-xs font-semibold text-white transition duration-200 hover:bg-white/24"
                >
                  開啟
                </Link>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Chip active>M 棟</Chip>
                <Chip>F1</Chip>
                <Chip active>F2</Chip>
                <Chip>F3</Chip>
              </div>

              <section className="rounded-[24px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,243,237,0.94))] p-4 shadow-[0_18px_30px_rgba(15,23,42,0.05)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Route session
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                      M108 → M145
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      QR-style start 已套用，優先顯示下一步與到達時間。
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white">
                    Live
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {routeStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[16px] border border-slate-200/80 bg-white p-3 text-center"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  {routeSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 rounded-[16px] border border-slate-200/80 bg-white/94 p-3"
                    >
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold tracking-tight text-slate-900">
                          {step.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[24px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,248,246,0.94))] p-4 shadow-[0_18px_30px_rgba(15,23,42,0.05)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Indoor map
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                  下一步固定可見，地圖縮成輔助層
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  手機導覽時不應要求使用者一直看全圖，應改成下一步 + 小地圖 + 退路資訊的組合。
                </p>
                <div className="mt-4 overflow-hidden rounded-[22px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(243,239,232,0.94))] p-2">
                  <IndoorMapIllustration />
                </div>
              </section>

              <div className="grid grid-cols-2 gap-2">
                {indoorHints.map((hint) => (
                  <div
                    key={hint.title}
                    className="rounded-[18px] border border-slate-200/80 bg-white/92 p-3 shadow-[0_12px_22px_rgba(15,23,42,0.04)]"
                  >
                    <p className="text-sm font-semibold tracking-tight text-slate-900">{hint.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{hint.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </PhoneShell>

          <PhoneShell
            badge="Transit"
            title="交通選擇"
            description="把校外到校、校門切入、校內移動與高峰提醒整理成真正可用的到校決策頁。"
            footer={
              <div className="rounded-[20px] bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] px-4 py-4 text-white shadow-[0_18px_30px_rgba(15,118,110,0.24)]">
                <p className="text-sm font-semibold">先看怎麼到校，再切入 thumap 室內導引</p>
                <p className="mt-1 text-xs leading-5 text-white/80">
                  多方位導覽 = 校外到校 + 校內定位 + 室內帶路
                </p>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Chip active>公車</Chip>
                <Chip>高鐵 / 火車</Chip>
                <Chip>開車</Chip>
                <Chip>校內接駁</Chip>
              </div>

              <div className="space-y-2">
                {transportOptions.map((option) => (
                  <section
                    key={option.title}
                    className="rounded-[20px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,243,237,0.94))] p-4 shadow-[0_16px_28px_rgba(15,23,42,0.05)]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {option.label}
                    </p>
                    <h3 className="mt-2 text-base font-semibold tracking-tight text-slate-900">
                      {option.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {option.description}
                    </p>
                  </section>
                ))}
              </div>

              <section className="rounded-[22px] border border-[rgba(15,118,110,0.16)] bg-[linear-gradient(180deg,rgba(15,118,110,0.08),rgba(255,255,255,0.96))] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Arrival reminders
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                  高峰時段先看站點層級與備援入口，再切系館導航
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  開學週、公演或活動日先顯示建議下車站點 / 接駁站 A-B-C / 建議校門 / 停車區滿載提醒，避免使用者一開始就掉進室內細節。
                </p>
              </section>

              <div className="grid grid-cols-2 gap-2">
                {arrivalRoutes.map((route) => (
                  <div
                    key={route.title}
                    className="rounded-[18px] border border-slate-200/80 bg-white/92 p-3 shadow-[0_12px_22px_rgba(15,23,42,0.04)]"
                  >
                    <p className="text-sm font-semibold tracking-tight text-slate-900">{route.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{route.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </PhoneShell>
        </div>
      </section>

      <section className="rounded-[34px] border border-[var(--line)] bg-[var(--surface)] px-5 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:px-8 md:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
              Product handoff
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              導覽頁和既有導航工作區已經接在同一個 app 裡
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-500">
            目前先把行前資訊、校區分帶與交通決策收斂到單一頁面，再用明確 CTA 導向既有功能，避免示範流程斷裂。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {implementationLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-[26px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,248,246,0.94))] p-5 shadow-[0_18px_32px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-1 hover:border-[var(--accent)]"
            >
              <p className="text-sm font-semibold tracking-tight text-slate-900">{item.title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              <p className="mt-5 text-sm font-medium text-[var(--accent)] transition duration-200 group-hover:translate-x-1">
                {item.action}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}