import { getRouteEdges, getRouteNodes } from "@/lib/routing";
import type {
  Edge,
  Floor,
  NavigationNode,
  NavigationStartSelection,
  Place,
  PlaceType,
  RouteInstruction,
  RouteResult,
} from "@/types/navigation";

type GenerateRouteInstructionsParams = {
  routeResult: RouteResult;
  nodes: NavigationNode[];
  edges: Edge[];
  places: Place[];
  startSelection: NavigationStartSelection;
  endPlace: Place;
  floors: Floor[];
};

function getFloorShortName(floorId: string, floors: Floor[]) {
  const floor = floors.find((item) => item.id === floorId);

  if (!floor) {
    return floorId;
  }

  return `${floor.level}F`;
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

function describePlace(place: Place) {
  return place.type === "classroom"
    ? `${place.name} ${getPlaceTypeLabel(place.type)}`
    : place.name;
}

function getNodeTargetLabel(node: NavigationNode, places: Place[]) {
  const matchedPlace = places.find((place) => place.nearestNodeId === node.id);

  if (matchedPlace) {
    return describePlace(matchedPlace);
  }

  return node.label;
}

export function generateRouteInstructions({
  routeResult,
  nodes,
  edges,
  places,
  startSelection,
  endPlace,
  floors,
}: GenerateRouteInstructionsParams): RouteInstruction[] {
  if (!routeResult.success) {
    return [];
  }

  const routeNodes = getRouteNodes(routeResult, nodes);
  const routeEdges = getRouteEdges(routeResult, edges);
  const instructions: RouteInstruction[] = [
    {
      floorId: startSelection.floorId,
      text: `從 ${startSelection.kind === "place" ? describePlace(startSelection.place) : startSelection.name} 出發`,
      type: "start",
    },
  ];

  for (let index = 0; index < routeEdges.length; index += 1) {
    const edge = routeEdges[index];
    const fromNode = routeNodes[index];
    const toNode = routeNodes[index + 1];

    if (!edge || !fromNode || !toNode) {
      continue;
    }

    if (edge.type === "elevator") {
      instructions.push({
        floorId: fromNode.floorId,
        text: `請搭乘電梯至 ${getFloorShortName(toNode.floorId, floors)}`,
        type: "elevator",
      });
      continue;
    }

    if (edge.type === "stairs") {
      instructions.push({
        floorId: fromNode.floorId,
        text: `請使用樓梯至 ${getFloorShortName(toNode.floorId, floors)}`,
        type: "stairs",
      });
      continue;
    }

    instructions.push({
      floorId: toNode.floorId,
      text: `請步行前往 ${getNodeTargetLabel(toNode, places)}`,
      type: "walk",
    });
  }

  instructions.push({
    floorId: endPlace.floorId,
    text: `抵達目的地：${describePlace(endPlace)}`,
    type: "arrive",
  });

  return instructions;
}
