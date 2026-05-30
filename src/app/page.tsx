import Link from "next/link";
import BuildingSelector from "@/components/BuildingSelector";
import { getBuildings } from "@/lib/data";

export default function HomePage() {
  const buildings = getBuildings();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 sm:py-12 md:px-10 md:py-16">
      <section className="overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--surface)] px-5 py-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10 md:px-10 md:py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[var(--accent)]">
          Web-based Indoor Navigation Prototype
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          校園室內地圖導航系統
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
          thumap 是一個聚焦校園與建築室內空間的 Web-based indoor navigation prototype，
          目前以 M 棟 mock data 驗證搜尋、樓層切換、Dijkstra 路徑規劃、跨樓層導航與 QR-style 起點帶入。
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-sm font-medium text-slate-700">
          <span className="rounded-full bg-white/85 px-3 py-2 shadow-sm">SVG Indoor Map</span>
          <span className="rounded-full bg-white/85 px-3 py-2 shadow-sm">Dijkstra Routing Engine</span>
          <span className="rounded-full bg-white/85 px-3 py-2 shadow-sm">Chinese Turn-by-turn Guidance</span>
          <span className="rounded-full bg-white/85 px-3 py-2 shadow-sm">QR-style Start</span>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
        <div className="rounded-[32px] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(240,248,245,0.88))] px-5 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:px-8 sm:py-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            New Mobile-first Guide
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900">
            把校門、站牌、停車與室內導航接成同一條手機導覽流程
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            新增的手機導覽頁把校園總覽、室內帶路與交通選擇真正放進 thumap，先解決首次到校與外部交通資訊，再把使用者帶回現有 M 棟導航工作區。
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-sm font-medium text-slate-700">
            <span className="rounded-full bg-white/85 px-3 py-2 shadow-sm">Campus Overview</span>
            <span className="rounded-full bg-white/85 px-3 py-2 shadow-sm">Gate / Bus / Parking Handoff</span>
            <span className="rounded-full bg-white/85 px-3 py-2 shadow-sm">Mobile-first UI</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/campus-guide"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(15,118,110,0.22)] transition duration-200 hover:bg-[var(--accent-strong)]"
            >
              查看手機導覽頁
            </Link>
            <Link
              href="/map/M"
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              直接開啟 M 棟導航
            </Link>
          </div>
        </div>

        <div className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] px-5 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:px-8 sm:py-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
            Guide Scope
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Screen 1
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                校園總覽
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                先看入口、校區分帶、接駁站與教室代碼邏輯。
              </p>
            </div>
            <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Screen 2
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                室內帶路
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                保留既有 QR-style 起點、逐步導引與小地圖策略。
              </p>
            </div>
            <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Screen 3
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                交通選擇
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                把公車、高鐵、開車與停車備援一起收進同一頁。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 sm:mt-10">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
              Available Buildings
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">示範建築</h2>
          </div>
          <p className="text-sm leading-6 text-slate-500">
            目前提供 1 棟 mock building，作為室內導航與 routing engine 的產品原型驗證場景。
          </p>
        </div>

        <BuildingSelector buildings={buildings} />
      </section>
    </main>
  );
}
