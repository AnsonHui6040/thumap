export type PlaceType =
  | "classroom"
  | "entrance"
  | "elevator"
  | "stairs"
  | "restroom";

export type NavigationNodeType =
  | "corridor"
  | "room"
  | "entrance"
  | "elevator"
  | "stairs"
  | "restroom";

export type EdgeType = "corridor" | "stairs" | "elevator";

export type RouteInstructionType =
  | "start"
  | "walk"
  | "stairs"
  | "elevator"
  | "arrive";

export interface Building {
  id: string;
  name: string;
  description: string;
  floors: string[];
}

export interface Floor {
  id: string;
  buildingId: string;
  level: number;
  name: string;
  width: number;
  height: number;
}

export interface Place {
  id: string;
  name: string;
  buildingId: string;
  floorId: string;
  type: PlaceType;
  x: number;
  y: number;
  nearestNodeId: string;
  keywords: string[];
}

export type NavigationSelectionSource = "manual" | "qr";

export interface PlaceStartSelection {
  kind: "place";
  id: string;
  name: string;
  floorId: string;
  nearestNodeId: string;
  source: NavigationSelectionSource;
  place: Place;
}

export interface NavigationNode {
  id: string;
  buildingId: string;
  floorId: string;
  type: NavigationNodeType;
  x: number;
  y: number;
  label: string;
}

export interface NodeStartSelection {
  kind: "node";
  id: string;
  name: string;
  floorId: string;
  nearestNodeId: string;
  source: "qr";
  node: NavigationNode;
}

export type NavigationStartSelection = PlaceStartSelection | NodeStartSelection;

export type RoutePoint = NavigationStartSelection;

export type QRStartHintState =
  | {
      kind: "applied";
      label: string;
    }
  | {
      kind: "invalid";
    }
  | null;

export interface Edge {
  id: string;
  from: string;
  to: string;
  weight: number;
  type: EdgeType;
  instruction: string;
}

export interface RouteResult {
  success: boolean;
  nodeIds: string[];
  edgeIds: string[];
  totalWeight: number;
  errorMessage?: string;
}

export interface RouteInstruction {
  floorId: string;
  text: string;
  type: RouteInstructionType;
}
