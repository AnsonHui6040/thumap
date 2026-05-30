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
  glow: string;
};

type MapPoint = {
  x: number;
  y: number;
};

type LayoutStats = {
  minSourceX: number;
  maxSourceX: number;
  boardLeft: number;
  boardTop: number;
  boardWidth: number;
  boardHeight: number;
  top: number;
  bottom: number;
  corridorX: number;
  legendX: number;
  legendWidth: number;
};

type DirectorySection = {
  title: string;
  accent: string;
  items: string[];
};

type ZonePanel = {
  title: string;
  lines: string[];
  x: number;
  y: number;
  width: number;
  height: number;
  stroke: string;
};

function getPalette(type: PlaceType): MarkerPalette {
  switch (type) {
    case "classroom":
      return {
        fill: "#111827",
        stroke: "#bef264",
        text: "#f8fafc",
        glow: "rgba(190,242,100,0.24)",
      };
    case "entrance":
      return {
        fill: "#111827",
        stroke: "#f9a8d4",
        text: "#f8fafc",
        glow: "rgba(249,168,212,0.24)",
      };
    case "elevator":
      return {
        fill: "#111827",
        stroke: "#86efac",
        text: "#f8fafc",
        glow: "rgba(134,239,172,0.24)",
      };
    case "stairs":
      return {
        fill: "#111827",
        stroke: "#fde68a",
        text: "#f8fafc",
        glow: "rgba(253,230,138,0.24)",
      };
    case "restroom":
      return {
        fill: "#111827",
        stroke: "#67e8f9",
        text: "#f8fafc",
        glow: "rgba(103,232,249,0.24)",
      };
    default:
      return {
        fill: "#111827",
        stroke: "#cbd5e1",
        text: "#f8fafc",
        glow: "rgba(203,213,225,0.24)",
      };
  }
}

function getPlaceTypeLabel(type: PlaceType) {
  switch (type) {
    case "classroom":
      return "教室";
    case "entrance":
      return "入口";
    case "elevator":
      return "電梯";
    case "stairs":
      return "樓梯";
    case "restroom":
      return "廁所";
    default:
      return "地點";
  }
}

function getRoomNumber(value: string) {
  const match = value.match(/M(\d{3})/i);
  return match ? Number(match[1]) : null;
}

function isRightWingRoom(value: string) {
  const roomNumber = getRoomNumber(value);
  return roomNumber !== null && roomNumber >= 217 && roomNumber <= 230;
}

function getLegendSections(floor: Floor, places: Place[]): DirectorySection[] {
  const placeNames = new Set(places.map((place) => place.name));

  if (floor.id === "M_2F") {
    return [
      {
        title: "西翼教室區",
        accent: "#93c5fd",
        items: ["M251", "M245", "M243", "M242", "M240"],
      },
      {
        title: "核心節點",
        accent: "#fcd34d",
        items: ["M145", "2F 電梯", "2F 樓梯", "2F 廁所"],
      },
      {
        title: "北翼教室區",
        accent: "#fca5a5",
        items: ["M217", "M218", "M220", "M222", "M230"],
      },
    ]
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => placeNames.has(item)),
      }))
      .filter((section) => section.items.length > 0);
  }

  const classrooms = places
    .filter((place) => place.type === "classroom")
    .map((place) => place.name)
    .sort((left, right) => left.localeCompare(right, "zh-Hant"));
  const facilities = places
    .filter((place) => place.type !== "classroom")
    .map((place) => place.name);

  return [
    classrooms.length > 0
      ? { title: "教室", accent: "#bef264", items: classrooms }
      : null,
    facilities.length > 0
      ? { title: "設施", accent: "#67e8f9", items: facilities }
      : null,
  ].filter((section): section is DirectorySection => section !== null);
}

function getZonePanels(
  floor: Floor,
  layoutStats: LayoutStats,
  places: Place[],
): ZonePanel[] {
  const placeNames = new Set(places.map((place) => place.name));

  if (floor.id !== "M_2F") {
    return [];
  }

  return [
    {
      title: "西翼教室",
      lines: ["M251", "M245 / M243", "M242 / M240"],
      x: layoutStats.boardLeft + 34,
      y: layoutStats.boardTop + 428,
      width: 170,
      height: 118,
      stroke: "#60a5fa",
    },
    {
      title: "M145 導航區",
      lines: ["品牌管理", "教學核心"],
      x: layoutStats.boardLeft + 280,
      y: layoutStats.boardTop + 494,
      width: 112,
      height: 92,
      stroke: "#fdba74",
    },
    {
      title: "北翼教室",
      lines: ["M217 / M218", "M220 / M222", "M230"],
      x: layoutStats.boardLeft + 360,
      y: layoutStats.boardTop + 72,
      width: 184,
      height: 154,
      stroke: "#fca5a5",
    },
  ].filter((panel) =>
    panel.lines.some((line) =>
      line.split("/").some((item) => placeNames.has(item.trim())),
    ),
  );
}

function getLayoutStats(floor: Floor, nodes: NavigationNode[], places: Place[]): LayoutStats {
  const sourceXs = [...nodes.map((node) => node.x), ...places.map((place) => place.x)];
  const minSourceX = sourceXs.length > 0 ? Math.min(...sourceXs) : 0;
  const maxSourceX = sourceXs.length > 0 ? Math.max(...sourceXs) : floor.width;

  return {
    minSourceX,
    maxSourceX: maxSourceX === minSourceX ? minSourceX + 1 : maxSourceX,
    boardLeft: 88,
    boardTop: 52,
    boardWidth: floor.width - 176,
    boardHeight: floor.height - 104,
    top: 138,
    bottom: floor.height - 120,
    corridorX: floor.width * 0.59,
    legendX: floor.width - 278,
    legendWidth: 216,
  };
}

function projectSourceToBoardY(sourceX: number, layoutStats: LayoutStats) {
  const normalized =
    (sourceX - layoutStats.minSourceX) /
    (layoutStats.maxSourceX - layoutStats.minSourceX);

  return layoutStats.bottom - normalized * (layoutStats.bottom - layoutStats.top);
}

function getProjectedNodePosition(
  node: NavigationNode,
  layoutStats: LayoutStats,
): MapPoint {
  const baseY = projectSourceToBoardY(node.x, layoutStats);

  if (node.type === "room") {
    return {
      x: isRightWingRoom(node.label)
        ? layoutStats.corridorX + 164
        : layoutStats.corridorX - 190,
      y: baseY,
    };
  }

  if (node.type === "entrance") {
    return { x: layoutStats.corridorX + 130, y: baseY + 18 };
  }

  if (node.type === "elevator") {
    return { x: layoutStats.corridorX - 22, y: baseY - 14 };
  }

  if (node.type === "stairs") {
    return { x: layoutStats.corridorX + 30, y: baseY - 8 };
  }

  if (node.type === "restroom") {
    return { x: layoutStats.corridorX + 152, y: baseY - 6 };
  }

  if (node.label.includes("西側")) {
    return { x: layoutStats.corridorX - 92, y: baseY };
  }

  if (node.label.includes("中央")) {
    return { x: layoutStats.corridorX - 8, y: baseY - 4 };
  }

  return { x: layoutStats.corridorX + 52, y: baseY };
}

function getMarkerPosition(place: Place, anchor: MapPoint, corridorX: number): MapPoint {
  switch (place.type) {
    case "classroom":
      return anchor.x > corridorX
        ? { x: anchor.x + 20, y: anchor.y - 20 }
        : { x: anchor.x - 20, y: anchor.y - 32 };
    case "entrance":
      return { x: anchor.x + 10, y: anchor.y + 24 };
    case "elevator":
      return { x: anchor.x - 8, y: anchor.y - 72 };
    case "stairs":
      return { x: anchor.x - 44, y: anchor.y - 76 };
    case "restroom":
      return { x: anchor.x + 54, y: anchor.y - 74 };
    default:
      return { x: anchor.x, y: anchor.y - 48 };
  }
}

function getShortNodeLabel(node: NavigationNode) {
  return node.label.replace(/^\dF\s*/, "").replace(/\s*節點$/, "");
}

function renderPlaceShape(place: Place, x: number, y: number) {
  const palette = getPalette(place.type);

  switch (place.type) {
    case "classroom":
      return (
        <rect
          x={x - 52}
          y={y - 26}
          width={104}
          height={52}
          rx={10}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={6}
        />
      );
    case "entrance":
      return (
        <rect
          x={x - 23}
          y={y - 23}
          width={46}
          height={46}
          rx={8}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={6}
          transform={`rotate(14 ${x} ${y})`}
        />
      );
    case "elevator":
      return (
        <rect
          x={x - 24}
          y={y - 24}
          width={48}
          height={48}
          rx={8}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={6}
        />
      );
    case "stairs":
      return (
        <rect
          x={x - 28}
          y={y - 18}
          width={56}
          height={36}
          rx={8}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={6}
        />
      );
    case "restroom":
      return (
        <rect
          x={x - 28}
          y={y - 20}
          width={56}
          height={40}
          rx={10}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={6}
        />
      );
    default:
      return (
        <rect
          x={x - 24}
          y={y - 24}
          width={48}
          height={48}
          rx={8}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={6}
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
  const seenEdges = new Set<string>();
  const visibleEdges = edges.filter((edge) => {
    const pairKey = [edge.from, edge.to].sort().join(":");

    if (seenEdges.has(pairKey)) {
      return false;
    }

    seenEdges.add(pairKey);
    return true;
  });

  const layoutStats = getLayoutStats(floor, nodes, places);
  const projectedNodePositions = new Map(
    nodes.map((node) => [node.id, getProjectedNodePosition(node, layoutStats)]),
  );
  const linkedPlaceIds = new Set(places.map((place) => place.nearestNodeId));
  const zonePanels = getZonePanels(floor, layoutStats, places);
  const legendSections = getLegendSections(floor, places);
  const legendSectionLayouts = legendSections.reduce<
    Array<DirectorySection & { y: number; height: number }>
  >((items, section) => {
    const previous = items.at(-1);
    const y = previous ? previous.y + previous.height + 14 : layoutStats.boardTop + 156;
    const height = 42 + section.items.length * 19;

    items.push({
      ...section,
      y,
      height,
    });
    return items;
  }, []);

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
            Signboard Navigation Map
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{floor.name}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            這張圖改成更接近實體樓層告示牌的導航視覺：深色底板、側邊索引、彩框房號與紅色導引線都直接放在同一張圖裡。點擊地圖上的地點可依序設定起點與終點。
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px] font-medium text-slate-600 sm:text-xs">
          <span className="rounded-full bg-lime-100 px-3 py-1 text-lime-800">教室</span>
          <span className="rounded-full bg-pink-100 px-3 py-1 text-pink-800">入口</span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">電梯</span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">樓梯</span>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-cyan-800">廁所</span>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(30,41,59,0.96))]">
        <div className="w-full min-h-[320px] sm:min-h-[360px] lg:min-h-[420px]" style={{ aspectRatio: `${floor.width} / ${floor.height}` }}>
          <svg
            viewBox={`0 0 ${floor.width} ${floor.height}`}
            className="h-full w-full"
            role="img"
            aria-label={`${floor.name} 室內地圖`}
          >
            <defs>
              <pattern id="signboard-dots" width="26" height="26" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1.6" fill="rgba(148,163,184,0.22)" />
              </pattern>
              <marker
                id="route-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="7"
                refY="5"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>

            <rect
              x="0"
              y="0"
              width={floor.width}
              height={floor.height}
              fill="#0f172a"
              pointerEvents="none"
            />
            <rect
              x={layoutStats.boardLeft}
              y={layoutStats.boardTop}
              width={layoutStats.boardWidth}
              height={layoutStats.boardHeight}
              rx="30"
              fill="#111827"
              stroke="#475569"
              strokeWidth="4"
              pointerEvents="none"
            />
            <rect
              x={layoutStats.boardLeft + 26}
              y={layoutStats.boardTop + 26}
              width={layoutStats.boardWidth - 52}
              height={layoutStats.boardHeight - 52}
              rx="26"
              fill="url(#signboard-dots)"
              opacity="0.68"
              pointerEvents="none"
            />
            <rect
              x={layoutStats.legendX}
              y={layoutStats.boardTop + 26}
              width={layoutStats.legendWidth}
              height={layoutStats.boardHeight - 52}
              rx="24"
              fill="#1f2937"
              stroke="#334155"
              strokeWidth="3"
              pointerEvents="none"
            />

            <text
              x={layoutStats.boardLeft + 38}
              y={layoutStats.boardTop + 124}
              fontSize="150"
              fontWeight="800"
              fill="#fde047"
              pointerEvents="none"
            >
              {floor.level}
            </text>
            <text
              x={layoutStats.boardLeft + 170}
              y={layoutStats.boardTop + 66}
              fontSize="28"
              fontWeight="700"
              fill="#e2e8f0"
              letterSpacing="3"
              pointerEvents="none"
            >
              {floor.name}
            </text>
            <text
              x={layoutStats.boardLeft + 170}
              y={layoutStats.boardTop + 98}
              fontSize="16"
              fontWeight="600"
              fill="#94a3b8"
              letterSpacing="2"
              pointerEvents="none"
            >
              SIGNBOARD ROUTE OVERVIEW
            </text>

            <g pointerEvents="none" opacity="0.98">
              {zonePanels.map((panel) => (
                <g key={panel.title}>
                  <rect
                    x={panel.x}
                    y={panel.y}
                    width={panel.width}
                    height={panel.height}
                    rx="14"
                    fill="none"
                    stroke={panel.stroke}
                    strokeWidth="4"
                  />
                  <text
                    x={panel.x + 14}
                    y={panel.y + 24}
                    fontSize="14"
                    fontWeight="800"
                    fill={panel.stroke}
                  >
                    {panel.title}
                  </text>
                  {panel.lines.map((line, index) => (
                    <text
                      key={`${panel.title}-${line}`}
                      x={panel.x + 14}
                      y={panel.y + 48 + index * 18}
                      fontSize="13"
                      fontWeight="700"
                      fill="#e2e8f0"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              ))}
            </g>

            <g opacity="0.95" pointerEvents="none">
              {visibleEdges.map((edge) => {
                const fromNode = projectedNodePositions.get(edge.from);
                const toNode = projectedNodePositions.get(edge.to);

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
                    stroke="#4b5563"
                    strokeWidth="28"
                    strokeLinecap="round"
                    opacity="0.96"
                  />
                );
              })}
            </g>

            <g pointerEvents="none">
              {routeSegments.map(([fromNode, toNode], index) => {
                const fromPoint = projectedNodePositions.get(fromNode.id);
                const toPoint = projectedNodePositions.get(toNode.id);

                if (!fromPoint || !toPoint) {
                  return null;
                }

                const isLastSegment = index === routeSegments.length - 1;

                return (
                  <g key={`${fromNode.id}-${toNode.id}-${index}`}>
                    <line
                      x1={fromPoint.x}
                      y1={fromPoint.y}
                      x2={toPoint.x}
                      y2={toPoint.y}
                      stroke="#ffe7d6"
                      strokeWidth="24"
                      strokeLinecap="round"
                      opacity="0.96"
                    />
                    <line
                      x1={fromPoint.x}
                      y1={fromPoint.y}
                      x2={toPoint.x}
                      y2={toPoint.y}
                      stroke="#ef4444"
                      strokeWidth="12"
                      strokeLinecap="round"
                      opacity="0.98"
                      markerEnd={isLastSegment ? "url(#route-arrow)" : undefined}
                    />
                  </g>
                );
              })}
            </g>

            <g pointerEvents="none">
              {nodes.map((node) => (
                <g key={node.id}>
                  {projectedNodePositions.get(node.id) ? null : null}
                  {routeNodeIds.has(node.id) ? (
                    <circle
                      cx={projectedNodePositions.get(node.id)?.x}
                      cy={projectedNodePositions.get(node.id)?.y}
                      r="22"
                      fill="#fca5a5"
                      opacity="0.18"
                    />
                  ) : null}
                  {routeNodeIds.has(node.id) ? (
                    <circle
                      cx={projectedNodePositions.get(node.id)?.x}
                      cy={projectedNodePositions.get(node.id)?.y}
                      r="14"
                      fill="#ef4444"
                      stroke="#ffe7d6"
                      strokeWidth="4"
                    />
                  ) : null}
                  {!routeNodeIds.has(node.id) ? (
                    <circle
                      cx={projectedNodePositions.get(node.id)?.x}
                      cy={projectedNodePositions.get(node.id)?.y}
                      r="10"
                      fill="#cbd5e1"
                      opacity="0.9"
                    />
                  ) : null}

                  {!linkedPlaceIds.has(node.id) ? (
                    <g>
                      <rect
                        x={(projectedNodePositions.get(node.id)?.x ?? 0) - 70}
                        y={(projectedNodePositions.get(node.id)?.y ?? 0) - 46}
                        width="140"
                        height="28"
                        rx="14"
                        fill="#0b1220"
                        stroke="#475569"
                        strokeWidth="2"
                      />
                      <text
                        x={projectedNodePositions.get(node.id)?.x}
                        y={(projectedNodePositions.get(node.id)?.y ?? 0) - 28}
                        fontSize="14"
                        fontWeight="700"
                        fill="#e2e8f0"
                        textAnchor="middle"
                      >
                        {getShortNodeLabel(node)}
                      </text>
                    </g>
                  ) : null}
                </g>
              ))}
            </g>

            <g>
              {places.map((place) => {
                const palette = getPalette(place.type);
                const anchor = projectedNodePositions.get(place.nearestNodeId) ?? {
                  x: layoutStats.corridorX,
                  y: projectSourceToBoardY(place.x, layoutStats),
                };
                const marker = getMarkerPosition(place, anchor, layoutStats.corridorX);
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
                      x1={anchor.x}
                      y1={anchor.y}
                      x2={marker.x}
                      y2={marker.y}
                      stroke="#94a3b8"
                      strokeWidth="3"
                      strokeDasharray="8 8"
                      opacity="0.82"
                      pointerEvents="none"
                    />

                    <circle
                      cx={marker.x}
                      cy={marker.y}
                      r="46"
                      fill={palette.glow}
                      opacity={isStart || isEnd ? 0.95 : 0.42}
                      pointerEvents="none"
                    />

                    {isStart ? (
                      <circle
                        cx={marker.x}
                        cy={marker.y}
                        r="54"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="6"
                        opacity="0.7"
                        pointerEvents="none"
                      />
                    ) : null}
                    {isEnd ? (
                      <circle
                        cx={marker.x}
                        cy={marker.y}
                        r="60"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="6"
                        opacity="0.68"
                        pointerEvents="none"
                      />
                    ) : null}

                    <line
                      x1={marker.x - 20}
                      y1={marker.y + 34}
                      x2={marker.x + 20}
                      y2={marker.y + 34}
                      stroke={palette.stroke}
                      strokeWidth="4"
                      pointerEvents="none"
                    />

                    {renderPlaceShape(place, marker.x, marker.y)}

                    <text
                      x={marker.x}
                      y={marker.y + 8}
                      fontSize={place.type === "classroom" ? "24" : "15"}
                      fontWeight="800"
                      fill={palette.text}
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {place.type === "classroom"
                        ? place.name
                        : getPlaceTypeLabel(place.type)}
                    </text>

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
                      y={marker.y + 64}
                      fontSize="18"
                      fontWeight="700"
                      fill="#f8fafc"
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {place.type === "classroom" ? "" : place.name}
                    </text>
                  </g>
                );
              })}
            </g>

            <g pointerEvents="none">
              <text
                x={layoutStats.legendX + 24}
                y={layoutStats.boardTop + 68}
                fontSize="18"
                fontWeight="700"
                fill="#e2e8f0"
              >
                樓層索引
              </text>
              <text
                x={layoutStats.legendX + 24}
                y={layoutStats.boardTop + 102}
                fontSize="13"
                fontWeight="600"
                fill="#94a3b8"
              >
                起點：{currentFloorStart?.name ?? "尚未選擇"}
              </text>
              <text
                x={layoutStats.legendX + 24}
                y={layoutStats.boardTop + 124}
                fontSize="13"
                fontWeight="600"
                fill="#94a3b8"
              >
                終點：{currentFloorEnd?.name ?? "尚未選擇"}
              </text>

              {legendSectionLayouts.map((section) => (
                <g key={`legend-${section.title}`}>
                  <rect
                    x={layoutStats.legendX + 18}
                    y={section.y}
                    width={layoutStats.legendWidth - 36}
                    height={section.height}
                    rx="18"
                    fill="#0f172a"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  <rect
                    x={layoutStats.legendX + 30}
                    y={section.y + 16}
                    width="16"
                    height="16"
                    rx="4"
                    fill={section.accent}
                  />
                  <text
                    x={layoutStats.legendX + 58}
                    y={section.y + 29}
                    fontSize="14"
                    fontWeight="800"
                    fill="#f8fafc"
                  >
                    {section.title}
                  </text>
                  {section.items.map((item, index) => (
                    <text
                      key={`${section.title}-${item}`}
                      x={layoutStats.legendX + 30}
                      y={section.y + 56 + index * 18}
                      fontSize="13"
                      fontWeight="700"
                      fill="#cbd5e1"
                    >
                      {item}
                    </text>
                  ))}
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        當前地圖顯示的是 {floor.name} 的告示牌式導航圖：可見節點、設施與路線片段已經整合到同一張視覺索引裡；完整導航摘要仍可搭配左側面板與逐步導航一起閱讀。
      </p>
    </section>
  );
}
