"use client";

import type { Floor, RouteInstruction, RouteInstructionType } from "@/types/navigation";

type RouteInstructionsProps = {
  instructions: RouteInstruction[];
  floors: Floor[];
};

function getFloorName(floors: Floor[], floorId: string) {
  return floors.find((floor) => floor.id === floorId)?.name ?? floorId;
}

function getTypeLabel(type: RouteInstructionType) {
  switch (type) {
    case "start":
      return "出發";
    case "walk":
      return "步行";
    case "elevator":
      return "電梯";
    case "stairs":
      return "樓梯";
    case "arrive":
      return "抵達";
    default:
      return "步驟";
  }
}

function getBadgeClassName(type: RouteInstructionType) {
  switch (type) {
    case "start":
      return "bg-teal-100 text-teal-700";
    case "walk":
      return "bg-slate-100 text-slate-700";
    case "elevator":
      return "bg-violet-100 text-violet-700";
    case "stairs":
      return "bg-amber-100 text-amber-700";
    case "arrive":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function RouteInstructions({ instructions, floors }: RouteInstructionsProps) {
  if (instructions.length === 0) {
    return null;
  }

  return (
    <section className="mt-5 rounded-[24px] border border-[var(--line)] bg-white/80 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">導航步驟</p>
        <p className="text-xs font-medium text-slate-500">共 {instructions.length} 個步驟</p>
      </div>
      <ol className="mt-4 space-y-2 sm:space-y-3">
        {instructions.map((instruction, index) => (
          <li key={`${instruction.floorId}-${instruction.type}-${index}`} className="rounded-2xl border border-slate-200 bg-white/80 p-3 sm:p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-slate-900 px-2 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClassName(instruction.type)}`}>
                {getTypeLabel(instruction.type)}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                {getFloorName(floors, instruction.floorId)}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-[15px]">{instruction.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
