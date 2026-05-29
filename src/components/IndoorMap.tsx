"use client";

import { getRouteNodesByFloor, getRouteSegmentsByFloor } from "@/lib/routing";
import type {
  Edge,
  Floor,
  NavigationNode,
  Place,
  PlaceType,
  RouteResult,
} from "@/types/navigation";

type IndoorMapProps = {
  floor: Floor;
  places: Place[];
  nodes: NavigationNode[];
  edges: Edge[];
  selectedStartPlace: Place | null;
  selectedEndPlace: Place | null;
  routeResult: RouteResult | null;
  onPlaceClick: (place: Place) => void;
};

type MarkerPalette = {
  fill: string;
  stroke: string;
  text: string;
};

function getPalette(type: PlaceType): MarkerPalette {
  switch (type) {
    case "classroom":
      return { fill: "#ffffff", stroke: "#0f766e", text: "#115e59" };
    case "entrance":
      return { fill: "#dbeafe", stroke: "#2563eb", text: "#1d4ed8" };
    case "elevator":
      return { fill: "#ede9fe", stroke: "#7c3aed", text: "#6d28d9" };
    case "stairs":
      return { fill: "#fef3c7", stroke: "#d97706", text: "#b45309" };
    case "restroom":
      return { fill: "#dcfce7", stroke: "#16a34a", text: "#15803d" };
    default:
      return { fill: "#ffffff", stroke: "#334155", text: "#0f172a" };
  }
}

function getMarkerPosition(place: Place) {
  return {
    x: place.x,
    y: place.y - 110,
  };
}

function renderPlaceShape(place: Place, x: number, y: number) {
  const palette = getPalette(place.type);

  switch (place.type) {
    case "classroom":
      return (
        <rect
          x={x - 44}
          y={y - 26}
          width={88}
          height={52}
          rx={18}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={4}
        />
      );
    case "entrance":
      return (
        <polygon
          points={`${x},${y - 34} ${x + 38},${y - 6} ${x + 38},${y + 20} ${x},${y + 34} ${x - 38},${y + 20} ${x - 38},${y - 6}`}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={4}
        />
      );
    case "elevator":
      return (
        <rect
          x={x - 30}
          y={y - 30}
          width={60}
          height={60}
          rx={14}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={4}
        />
      );
    case "stairs":
      return (
        <polygon
          points={`${x},${y - 34} ${x + 34},${y + 30} ${x - 34},${y + 30}`}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={4}
        />
      );
    case "restroom":
      return (
        <circle
          cx={x}
          cy={y}
          r={30}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={4}
        />
      );
    default:
      return (
        <circle
          cx={x}
          cy={y}
          r={24}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={4}
        />
      );
  }
}

export default function IndoorMap({
  floor,
  places,
  nodes,
  edges,
  selectedStartPlace,
  selectedEndPlace,
  routeResult,
  onPlaceClick,
}: IndoorMapProps) {
  const nodeLookup = new Map(nodes.map((node) => [node.id, node]));
  const seenEdges = new Set<string>();
  const visibleEdges = edges.filter((edge) => {
    const pairKey = [edge.from, edge.to].sort().join(":");

    if (seenEdges.has(pairKey)) {
      return false;
    }

    seenEdges.add(pairKey);
    return true;
  });

  const currentFloorStart = selectedStartPlace?.floorId === floor.id ? selectedStartPlace : null;
  const currentFloorEnd = selectedEndPlace?.floorId === floor.id ? selectedEndPlace : null;
  const routeNodes = routeResult?.success ? getRouteNodesByFloor(routeResult, nodes, floor.id) : [];
  const routeNodeIds = new Set(routeNodes.map((node) => node.id));
  const routeSegments = routeResult?.success ? getRouteSegmentsByFloor(routeResult, nodes, floor.id) : [];

  return (
    <section className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Indoor Routing Map
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{floor.name}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            點擊地圖上的地點可依序設定起點與終點。跨樓層路線會依目前樓層切片顯示，避免將不同樓層直接連成不合理的斜線。
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px] font-medium text-slate-600 sm:text-xs">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-teal-700">教室</span>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">入口</span>
          <span className="rounded-full bg-violet-50 px-3 py-1 text-violet-700">電梯</span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">樓梯</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">廁所</span>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(230,244,241,0.85))]">
        <div className="w-full min-h-[320px] sm:min-h-[360px] lg:min-h-[420px]" style={{ aspectRatio: `${floor.width} / ${floor.height}` }}>
          <svg
            viewBox={`0 0 ${floor.width} ${floor.height}`}
            className="h-full w-full"
            role="img"
            aria-label={`${floor.name} 室內地圖`}
          >
            <rect
              x="0"
              y="0"
              width={floor.width}
              height={floor.height}
              fill="#f8fffc"
              pointerEvents="none"
            />
            <rect
              x="60"
              y="280"
              width={floor.width - 120}
              height="240"
              rx="120"
              fill="#ecfeff"
              stroke="#bae6fd"
              strokeWidth="6"
              pointerEvents="none"
            />

            <g opacity="0.95" pointerEvents="none">
              {visibleEdges.map((edge) => {
                const fromNode = nodeLookup.get(edge.from);
                const toNode = nodeLookup.get(edge.to);

                if (!fromNode || !toNode) {
                  return null;
                }

                return (
                  <line
                    key={edge.id}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#0f766e"
                    strokeWidth="16"
                    strokeLinecap="round"
                    opacity="0.28"
                  />
                );
              })}
            </g>

            <g pointerEvents="none">
              {routeSegments.map(([fromNode, toNode], index) => (
                <g key={`${fromNode.id}-${toNode.id}-${index}`}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#fff7ed"
                    strokeWidth="26"
                    strokeLinecap="round"
                    opacity="0.95"
                  />
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#f97316"
                    strokeWidth="16"
                    strokeLinecap="round"
                    opacity="0.96"
                  />
                </g>
              ))}
            </g>

            <g pointerEvents="none">
              {nodes.map((node) => (
                <g key={node.id}>
                  {routeNodeIds.has(node.id) ? (
                    <circle cx={node.x} cy={node.y} r="22" fill="#fed7aa" opacity="0.75" />
                  ) : null}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="13"
                    fill={routeNodeIds.has(node.id) ? "#ea580c" : "#134e4a"}
                    stroke={routeNodeIds.has(node.id) ? "#fff7ed" : "#ccfbf1"}
                    strokeWidth="5"
                  />
                  <text
                    x={node.x}
                    y={node.y + 52}
                    fontSize="20"
                    fontWeight="600"
                    fill="#334155"
                    textAnchor="middle"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </g>

            <g>
              {places.map((place) => {
                const palette = getPalette(place.type);
                const marker = getMarkerPosition(place);
                const isStart = currentFloorStart?.id === place.id;
                const isEnd = currentFloorEnd?.id === place.id;

                return (
                  <g
                    key={place.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${place.name}，點擊以選擇起點或終點`}
                    onClick={() => onPlaceClick(place)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onPlaceClick(place);
                      }
                    }}
                    className="cursor-pointer"
                  >
                    <line
                      x1={place.x}
                      y1={place.y - 12}
                      x2={marker.x}
                      y2={marker.y + 36}
                      stroke="#94a3b8"
                      strokeWidth="4"
                      strokeDasharray="10 10"
                      pointerEvents="none"
                    />

                    {isStart ? (
                      <circle
                        cx={marker.x}
                        cy={marker.y}
                        r="40"
                        fill="none"
                        stroke="#0f766e"
                        strokeWidth="8"
                        opacity="0.38"
                        pointerEvents="none"
                      />
                    ) : null}
                    {isEnd ? (
                      <circle
                        cx={marker.x}
                        cy={marker.y}
                        r="48"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="8"
                        opacity="0.34"
                        pointerEvents="none"
                      />
                    ) : null}

                    {renderPlaceShape(place, marker.x, marker.y)}

                    {isStart || isEnd ? (
                      <g pointerEvents="none">
                        <rect
                          x={marker.x - 34}
                          y={marker.y - 88}
                          width="68"
                          height="28"
                          rx="14"
                          fill={isStart ? "#115e59" : "#c2410c"}
                        />
                        <text
                          x={marker.x}
                          y={marker.y - 68}
                          fontSize="16"
                          fontWeight="700"
                          fill="#ffffff"
                          textAnchor="middle"
                        >
                          {isStart ? "起點" : "終點"}
                        </text>
                      </g>
                    ) : null}

                    <text
                      x={marker.x}
                      y={marker.y + 62}
                      fontSize="22"
                      fontWeight="700"
                      fill={palette.text}
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {place.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        當前地圖顯示的是 {floor.name} 可見節點、設施與路線片段；完整導航摘要請參考左側面板與逐步導航。
      </p>
    </section>
  );
}
