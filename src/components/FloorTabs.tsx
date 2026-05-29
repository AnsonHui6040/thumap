"use client";

import type { Floor } from "@/types/navigation";

type FloorTabsProps = {
  floors: Floor[];
  activeFloorId?: string;
  defaultFloorId?: string;
  onChange?: (floorId: string) => void;
};

export default function FloorTabs({
  floors,
  activeFloorId,
  defaultFloorId,
  onChange,
}: FloorTabsProps) {
  const fallbackFloor = floors.find((floor) => floor.id === defaultFloorId) ?? floors[0];
  const currentFloor = floors.find((floor) => floor.id === activeFloorId) ?? fallbackFloor;

  if (!currentFloor) {
    return null;
  }

  return (
    <section className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            Active Floor
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{currentFloor.name}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            切換樓層後，地圖只會顯示目前樓層的地點與節點；已設定的起點與終點會保留在導航面板中。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:max-w-[55%] lg:justify-end">
          {floors.map((floor) => {
            const isActive = floor.id === currentFloor.id;

            return (
              <button
                key={floor.id}
                type="button"
                onClick={() => onChange?.(floor.id)}
                className={`min-h-11 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[var(--accent)] text-white shadow-[0_12px_30px_rgba(15,118,110,0.25)]"
                    : "border border-[var(--line)] bg-white/70 text-slate-700 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
              >
                {floor.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
