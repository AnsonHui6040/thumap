"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import FloorTabs from "@/components/FloorTabs";
import IndoorMap from "@/components/IndoorMap";
import QRStartHint from "@/components/QRStartHint";
import RoutePanel from "@/components/RoutePanel";
import SearchBox from "@/components/SearchBox";
import { generateRouteInstructions } from "@/lib/routeInstructions";
import { findShortestPath, getRouteFloorIds, isCrossFloorRoute } from "@/lib/routing";
import type {
  Building,
  Edge,
  Floor,
  NavigationNode,
  NavigationStartSelection,
  Place,
  QRStartHintState,
} from "@/types/navigation";

type BuildingMapWorkspaceProps = {
  building: Building;
  floors: Floor[];
  places: Place[];
  nodes: NavigationNode[];
  edges: Edge[];
  defaultFloorId?: string;
  initialStartParam?: string;
};

function createPlaceStartSelection(
  place: Place,
  source: "manual" | "qr",
): NavigationStartSelection {
  return {
    kind: "place",
    id: place.id,
    name: place.name,
    floorId: place.floorId,
    nearestNodeId: place.nearestNodeId,
    source,
    place,
  };
}

function createNodeStartSelection(node: NavigationNode): NavigationStartSelection {
  return {
    kind: "node",
    id: node.id,
    name: node.label,
    floorId: node.floorId,
    nearestNodeId: node.id,
    source: "qr",
    node,
  };
}

function resolveQrStart(
  startParam: string,
  places: Place[],
  nodes: NavigationNode[],
): {
  selection: NavigationStartSelection | null;
  hint: QRStartHintState;
} {
  const normalizedStart = startParam.trim().toLowerCase();

  if (!normalizedStart) {
    return { selection: null, hint: null };
  }

  const matchedPlace = places.find((place) => place.id.toLowerCase() === normalizedStart);

  if (matchedPlace) {
    return {
      selection: createPlaceStartSelection(matchedPlace, "qr"),
      hint: { kind: "applied", label: matchedPlace.name },
    };
  }

  const matchedNode = nodes.find((node) => node.id.toLowerCase() === normalizedStart);

  if (!matchedNode) {
    return {
      selection: null,
      hint: { kind: "invalid" },
    };
  }

  const placeByNearestNode = places.find(
    (place) => place.nearestNodeId.toLowerCase() === normalizedStart,
  );

  if (placeByNearestNode) {
    return {
      selection: createPlaceStartSelection(placeByNearestNode, "qr"),
      hint: { kind: "applied", label: placeByNearestNode.name },
    };
  }

  return {
    selection: createNodeStartSelection(matchedNode),
    hint: { kind: "applied", label: matchedNode.label },
  };
}

function BuildingMapWorkspaceContent({
  building,
  floors,
  places,
  nodes,
  edges,
  defaultFloorId,
  initialStartParam,
}: BuildingMapWorkspaceProps) {
  const initialFloorId = defaultFloorId ?? floors[0]?.id ?? "";
  const initialResolvedStart = initialStartParam
    ? resolveQrStart(initialStartParam, places, nodes)
    : { selection: null, hint: null };
  const [activeFloorId, setActiveFloorId] = useState(
    initialResolvedStart.selection?.floorId ?? initialFloorId,
  );
  const [selectedStart, setSelectedStart] = useState<NavigationStartSelection | null>(
    initialResolvedStart.selection,
  );
  const [selectedEndPlace, setSelectedEndPlace] = useState<Place | null>(null);
  const [qrStartHint, setQrStartHint] = useState<QRStartHintState>(initialResolvedStart.hint);

  const activeFloor = floors.find((floor) => floor.id === activeFloorId) ?? floors[0];

  if (!activeFloor) {
    return null;
  }

  const visibleNodes = nodes.filter((node) => node.floorId === activeFloor.id);
  const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));
  const visiblePlaces = places.filter((place) => place.floorId === activeFloor.id);
  const visibleEdges = edges.filter(
    (edge) => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to),
  );
  const routeResult = selectedStart && selectedEndPlace
    ? findShortestPath({
        startNodeId: selectedStart.nearestNodeId,
        endNodeId: selectedEndPlace.nearestNodeId,
        nodes,
        edges,
      })
    : null;
  const routeFloorIds = routeResult?.success ? getRouteFloorIds(routeResult, nodes) : [];
  const routeCrossFloor = routeResult?.success ? isCrossFloorRoute(routeResult, nodes) : false;
  const routeInstructions = selectedStart && selectedEndPlace && routeResult?.success
    ? generateRouteInstructions({
        routeResult,
        nodes,
        edges,
        places,
        startSelection: selectedStart,
        endPlace: selectedEndPlace,
        floors,
      })
    : [];

  function focusFloor(floorId: string) {
    setActiveFloorId(floorId);
  }

  function handleSelectStart(place: Place) {
    setSelectedStart(createPlaceStartSelection(place, "manual"));
    setQrStartHint(null);
    focusFloor(place.floorId);
  }

  function handleSelectEnd(place: Place) {
    setSelectedEndPlace(place);
    focusFloor(place.floorId);
  }

  function handlePlaceClick(place: Place) {
    if (!selectedStart) {
      handleSelectStart(place);
      return;
    }

    if (!selectedEndPlace) {
      if (selectedStart.nearestNodeId !== place.nearestNodeId) {
        handleSelectEnd(place);
      }

      return;
    }

    handleSelectEnd(place);
  }

  return (
    <div className="space-y-6">
      <FloorTabs
        floors={floors}
        activeFloorId={activeFloor.id}
        defaultFloorId={initialFloorId}
        onChange={setActiveFloorId}
      />

      <div className="grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="space-y-6 lg:order-1">
          <section className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Indoor Navigation Workspace
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{building.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              這個工作區整合地點搜尋、QR-style 起點帶入、路線計算與逐步導航，適合作為室內導航產品原型的互動驗證介面。
            </p>
          </section>

          <QRStartHint hint={qrStartHint} />

          <SearchBox
            places={places}
            floors={floors}
            onSelectStart={handleSelectStart}
            onSelectEnd={handleSelectEnd}
          />

          <RoutePanel
            startSelection={selectedStart}
            endPlace={selectedEndPlace}
            floors={floors}
            routeResult={routeResult}
            routeFloorIds={routeFloorIds}
            isCrossFloor={routeCrossFloor}
            instructions={routeInstructions}
            onClearStart={() => {
              setSelectedStart(null);
              setQrStartHint(null);
            }}
            onClearEnd={() => setSelectedEndPlace(null)}
            onClearAll={() => {
              setSelectedStart(null);
              setSelectedEndPlace(null);
              setQrStartHint(null);
            }}
          />
        </aside>

        <div className="min-w-0 lg:order-2">
          <IndoorMap
            floor={activeFloor}
            places={visiblePlaces}
            nodes={visibleNodes}
            edges={visibleEdges}
            selectedStartPlace={selectedStart?.kind === "place" ? selectedStart.place : null}
            selectedEndPlace={selectedEndPlace}
            routeResult={routeResult}
            onPlaceClick={handlePlaceClick}
          />
        </div>
      </div>
    </div>
  );
}

export default function BuildingMapWorkspace(props: BuildingMapWorkspaceProps) {
  const searchParams = useSearchParams();
  const queryStartParam = searchParams.get("start") ?? props.initialStartParam;

  return (
    <BuildingMapWorkspaceContent
      key={queryStartParam ?? "__default_start__"}
      {...props}
      initialStartParam={queryStartParam}
    />
  );
}
