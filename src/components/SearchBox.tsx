"use client";

import { useDeferredValue, useState } from "react";
import type { Floor, Place } from "@/types/navigation";

type SearchBoxProps = {
  places: Place[];
  floors: Floor[];
  onSelectStart: (place: Place) => void;
  onSelectEnd: (place: Place) => void;
};

function getSearchScore(place: Place, query: string) {
  const normalizedId = place.id.toLowerCase();
  const normalizedName = place.name.toLowerCase();
  const normalizedKeywords = place.keywords.map((keyword) => keyword.toLowerCase());

  if (normalizedId === query || normalizedName === query) {
    return 120;
  }

  if (normalizedId.startsWith(query) || normalizedName.startsWith(query)) {
    return 95;
  }

  if (normalizedKeywords.some((keyword) => keyword === query)) {
    return 88;
  }

  if (normalizedId.includes(query)) {
    return 72;
  }

  if (normalizedName.includes(query)) {
    return 64;
  }

  if (normalizedKeywords.some((keyword) => keyword.includes(query))) {
    return 56;
  }

  return 0;
}

export default function SearchBox({ places, floors, onSelectStart, onSelectEnd }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [expandedPlaceId, setExpandedPlaceId] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const floorNameById = Object.fromEntries(floors.map((floor) => [floor.id, floor.name]));
  const results = deferredQuery
    ? places
        .map((place) => ({ place, score: getSearchScore(place, deferredQuery) }))
        .filter((result) => result.score > 0)
        .sort((left, right) => right.score - left.score || left.place.name.localeCompare(right.place.name, "zh-Hant"))
    : [];

  function handleSelect(place: Place, target: "start" | "end") {
    if (target === "start") {
      onSelectStart(place);
    } else {
      onSelectEnd(place);
    }

    setQuery("");
    setExpandedPlaceId(null);
  }

  return (
    <section className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
        Place Search
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900">搜尋地點</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        可搜尋教室、入口、電梯、樓梯、廁所與關鍵字，例如 M108、M145、電梯、廁所、品牌管理。
      </p>

      <label className="mt-5 block">
        <span className="sr-only">搜尋地點</span>
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setExpandedPlaceId(null);
          }}
          placeholder="輸入教室編號、設施名稱或關鍵字"
          className="w-full rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-4 focus:ring-teal-100"
        />
      </label>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        點開搜尋結果後，可直接指定為起點或終點。
      </p>

      <div className="mt-5 space-y-3">
        {deferredQuery ? (
          results.length > 0 ? (
            <div className="max-h-[24rem] overflow-y-auto pr-1">
              <ul className="space-y-3">
                {results.map(({ place }) => {
                  const isExpanded = expandedPlaceId === place.id;

                  return (
                    <li key={place.id} className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white/80 p-4">
                      <button
                        type="button"
                        onClick={() => setExpandedPlaceId(isExpanded ? null : place.id)}
                        className="flex w-full items-start justify-between gap-3 text-left"
                      >
                        <div className="min-w-0">
                          <p className="break-words text-base font-semibold text-slate-900">{place.name}</p>
                          <p className="mt-1 break-words text-sm text-slate-500">
                            {place.id} · {floorNameById[place.floorId] ?? place.floorId}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {place.type}
                        </span>
                      </button>

                      {isExpanded ? (
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() => handleSelect(place, "start")}
                            className="w-full rounded-full bg-teal-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800"
                          >
                            設為起點
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelect(place, "end")}
                            className="w-full rounded-full bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-700"
                          >
                            設為終點
                          </button>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-[var(--line)] bg-white/70 px-4 py-5 text-sm text-slate-500">
              找不到符合條件的地點，請改用教室編號、設施名稱或其他關鍵字再試一次。
            </p>
          )
        ) : (
          <p className="rounded-2xl border border-dashed border-[var(--line)] bg-white/70 px-4 py-5 text-sm text-slate-500">
            請輸入教室編號、設施名稱或關鍵字以開始搜尋。
          </p>
        )}
      </div>
    </section>
  );
}
