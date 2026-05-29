import Link from "next/link";
import type { Building } from "@/types/navigation";

type BuildingSelectorProps = {
  buildings: Building[];
};

export default function BuildingSelector({ buildings }: BuildingSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {buildings.map((building) => (
        <Link
          key={building.id}
          href={`/map/${building.id}`}
          className="group min-w-0 overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[var(--accent)] hover:bg-[var(--surface-strong)] sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
                Building Prototype {building.id}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">{building.name}</h2>
            </div>
            <span className="w-fit rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-800">
              {building.floors.length} 個樓層
            </span>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">{building.description}</p>

          <div className="mt-6 flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
            <span>開啟導航工作區</span>
            <span className="transition duration-200 group-hover:translate-x-1">
              進入地圖
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
