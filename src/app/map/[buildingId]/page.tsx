import { Suspense } from "react";
import BuildingMapWorkspace from "@/components/BuildingMapWorkspace";
import {
  getBuildingById,
  getEdgesByBuilding,
  getFloorsByBuilding,
  getNodesByBuilding,
  getPlacesByBuilding,
} from "@/lib/data";

type BuildingMapPageProps = {
  params: Promise<{
    buildingId: string;
  }>;
};

export function generateStaticParams() {
  return [{ buildingId: "M" }];
}

export default async function BuildingMapPage({ params }: BuildingMapPageProps) {
  const { buildingId } = await params;
  const building = getBuildingById(buildingId);

  if (!building) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-10 sm:px-6 sm:py-12">
        <section className="w-full rounded-[32px] border border-rose-200 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-600">
            Invalid Building
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">找不到指定建築物</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            目前 thumap prototype 僅提供 M 棟 mock data。請改用 /map/M 進入室內地圖頁。
          </p>
        </section>
      </main>
    );
  }

  const floors = getFloorsByBuilding(building.id);
  const places = getPlacesByBuilding(building.id);
  const nodes = getNodesByBuilding(building.id);
  const edges = getEdgesByBuilding(building.id);
  const defaultFloor = floors.find((floor) => floor.level === 1) ?? floors[0];

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-16">
      <section className="mb-8 overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
          Indoor Routing Prototype
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {building.name}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
          目前提供樓層切換、SVG 室內地圖、地點搜尋、起點與終點選擇、最短路線計算、中文逐步導航，以及以 URL start 參數帶入起點。
        </p>

        <div className="mt-5 flex flex-wrap gap-2 text-sm font-medium text-slate-700">
          <span className="rounded-full bg-white/85 px-3 py-2 shadow-sm">Mock Building Data</span>
          <span className="rounded-full bg-white/85 px-3 py-2 shadow-sm">Cross-floor Routing</span>
          <span className="rounded-full bg-white/85 px-3 py-2 shadow-sm">Responsive UI</span>
        </div>
      </section>

      <Suspense
        fallback={
          <section className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-5 text-sm leading-6 text-slate-600 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-6">
            正在載入室內導航工作區...
          </section>
        }
      >
        <BuildingMapWorkspace
          building={building}
          floors={floors}
          places={places}
          nodes={nodes}
          edges={edges}
          defaultFloorId={defaultFloor?.id}
        />
      </Suspense>
    </main>
  );
}