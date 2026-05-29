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
