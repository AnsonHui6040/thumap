import { buildings } from "@/data/buildings";
import { edges } from "@/data/edges";
import { floors } from "@/data/floors";
import { navigationNodes } from "@/data/nodes";
import { places } from "@/data/places";

export function getBuildings() {
  return buildings;
}

export function getBuildingById(buildingId: string) {
  return (
    buildings.find(
      (building) => building.id.toLowerCase() === buildingId.toLowerCase(),
    ) ?? null
  );
}

export function getFloorsByBuilding(buildingId: string) {
  return floors
    .filter((floor) => floor.buildingId.toLowerCase() === buildingId.toLowerCase())
    .sort((left, right) => left.level - right.level);
}

export function getPlacesByBuilding(buildingId: string) {
  return places.filter(
    (place) => place.buildingId.toLowerCase() === buildingId.toLowerCase(),
  );
}

export function getNodesByBuilding(buildingId: string) {
  return navigationNodes.filter(
    (node) => node.buildingId.toLowerCase() === buildingId.toLowerCase(),
  );
}

export function getEdgesByBuilding(buildingId: string) {
  const buildingNodeIds = new Set(
    navigationNodes
      .filter((node) => node.buildingId.toLowerCase() === buildingId.toLowerCase())
      .map((node) => node.id),
  );

  return edges.filter(
    (edge) => buildingNodeIds.has(edge.from) && buildingNodeIds.has(edge.to),
  );
}
