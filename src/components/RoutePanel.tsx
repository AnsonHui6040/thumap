"use client";

import RouteInstructions from "@/components/RouteInstructions";
import type {
  Floor,
  NavigationStartSelection,
  Place,
  RouteInstruction,
  RouteResult,
} from "@/types/navigation";

type RoutePanelProps = {
  startSelection: NavigationStartSelection | null;
  endPlace: Place | null;
  floors: Floor[];
  routeResult: RouteResult | null;
  routeFloorIds: string[];
  isCrossFloor: boolean;
  instructions: RouteInstruction[];
  onClearStart: () => void;
  onClearEnd: () => void;
  onClearAll: () => void;
};

function getFloorName(floors: Floor[], floorId: string) {
  return floors.find((floor) => floor.id === floorId)?.name ?? floorId;
}

export default function RoutePanel({
  startSelection,
  endPlace,
  floors,
  routeResult,
  routeFloorIds,
  isCrossFloor,
  instructions,
  onClearStart,
  onClearEnd,
  onClearAll,
}: RoutePanelProps) {
  const hasCompleteSelection = Boolean(startSelection && endPlace);
  const routeStatusMessage = !startSelection
    ? "尚未選擇起點，請先設定導航起點。"
    : !endPlace
      ? "尚未選擇目的地，請選擇要前往的地點。"
      : routeResult?.success
        ? "路線已完成計算，可依下方步驟導航。"
        : (routeResult?.errorMessage ?? "目前無法計算路線");

  return (
    <section className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
        Routing Summary
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900">起點與終點</h2>

      <div className="mt-6 space-y-4">
        <div className="rounded-[24px] border border-[var(--line)] bg-white/80 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700">起點</p>
              <p className="mt-2 break-words text-lg font-semibold text-slate-900">
                {startSelection ? startSelection.name : "請選擇起點"}
              </p>
              {startSelection ? (
                <p className="mt-1 text-sm text-slate-500">{getFloorName(floors, startSelection.floorId)}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClearStart}
              disabled={!startSelection}
              className="w-full rounded-full border border-teal-200 px-4 py-2.5 text-sm font-medium text-teal-700 transition hover:border-teal-300 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              清除起點
            </button>
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--line)] bg-white/80 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-orange-700">終點</p>
              <p className="mt-2 break-words text-lg font-semibold text-slate-900">
                {endPlace ? endPlace.name : "請選擇目的地"}
              </p>
              {endPlace ? (
                <p className="mt-1 text-sm text-slate-500">{getFloorName(floors, endPlace.floorId)}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClearEnd}
              disabled={!endPlace}
              className="w-full rounded-full border border-orange-200 px-4 py-2.5 text-sm font-medium text-orange-700 transition hover:border-orange-300 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              清除終點
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[24px] border border-[var(--line)] bg-white/80 p-4">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">總權重</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {routeResult?.success ? routeResult.totalWeight : "--"}
          </p>
        </div>

        <div className="rounded-[24px] border border-[var(--line)] bg-white/80 p-4">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">是否跨樓層</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {routeResult?.success ? (isCrossFloor ? "是" : "否") : "--"}
          </p>
          {routeResult?.success && routeFloorIds.length > 0 ? (
            <p className="mt-1 text-sm text-slate-500">
              經過 {routeFloorIds.map((floorId) => getFloorName(floors, floorId)).join("、")}
            </p>
          ) : null}
        </div>
      </div>

      <div
        className={`mt-5 rounded-[24px] border p-4 text-sm leading-6 ${
          hasCompleteSelection && routeResult?.success
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : hasCompleteSelection && routeResult?.success === false
              ? "border-amber-200 bg-amber-50 text-amber-700"
              : "border-dashed border-[var(--line)] bg-white/70 text-slate-600"
        }`}
      >
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] opacity-70">狀態</p>
        {routeStatusMessage}
      </div>

      <RouteInstructions instructions={instructions} floors={floors} />

        <div className="mt-5 grid gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={onClearStart}
          disabled={!startSelection}
            className="w-full rounded-full border border-[var(--line)] bg-white/80 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          清除起點
        </button>
        <button
          type="button"
          onClick={onClearEnd}
          disabled={!endPlace}
          className="w-full rounded-full border border-[var(--line)] bg-white/80 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          清除終點
        </button>
        <button
          type="button"
          onClick={onClearAll}
          disabled={!startSelection && !endPlace}
          className="w-full rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          清除全部
        </button>
      </div>
    </section>
  );
}