import type { Edge, NavigationNode, RouteResult } from "@/types/navigation";

type FindShortestPathParams = {
  startNodeId: string;
  endNodeId: string;
  nodes: NavigationNode[];
  edges: Edge[];
};

type AdjacencyEdge = {
  edgeId: string;
  nodeId: string;
  weight: number;
};

function buildAdjacencyMap(edges: Edge[]) {
  const adjacencyMap = new Map<string, AdjacencyEdge[]>();

  function addDirectedEdge(from: string, to: string, edgeId: string, weight: number) {
    const currentEdges = adjacencyMap.get(from) ?? [];

    currentEdges.push({ edgeId, nodeId: to, weight });
    adjacencyMap.set(from, currentEdges);
  }

  for (const edge of edges) {
    addDirectedEdge(edge.from, edge.to, edge.id, edge.weight);
    addDirectedEdge(edge.to, edge.from, edge.id, edge.weight);
  }

  return adjacencyMap;
}

export function findShortestPath({
  startNodeId,
  endNodeId,
  nodes,
  edges,
}: FindShortestPathParams): RouteResult {
  const nodeIdSet = new Set(nodes.map((node) => node.id));

  if (!nodeIdSet.has(startNodeId)) {
    return {
      success: false,
      nodeIds: [],
      edgeIds: [],
      totalWeight: 0,
      errorMessage: "找不到起點節點。",
    };
  }

  if (!nodeIdSet.has(endNodeId)) {
    return {
      success: false,
      nodeIds: [],
      edgeIds: [],
      totalWeight: 0,
      errorMessage: "找不到終點節點。",
    };
  }

  if (startNodeId === endNodeId) {
    return {
      success: false,
      nodeIds: [startNodeId],
      edgeIds: [],
      totalWeight: 0,
      errorMessage: "起點與終點相同，請重新選擇。",
    };
  }

  const adjacencyMap = buildAdjacencyMap(edges);
  const distances = new Map<string, number>();
  const previousNodeIds = new Map<string, string>();
  const previousEdgeIds = new Map<string, string>();
  const visited = new Set<string>();

  for (const node of nodes) {
    distances.set(node.id, Number.POSITIVE_INFINITY);
  }

  distances.set(startNodeId, 0);

  while (visited.size < nodeIdSet.size) {
    let currentNodeId: string | null = null;
    let currentDistance = Number.POSITIVE_INFINITY;

    for (const nodeId of nodeIdSet) {
      const distance = distances.get(nodeId) ?? Number.POSITIVE_INFINITY;

      if (!visited.has(nodeId) && distance < currentDistance) {
        currentNodeId = nodeId;
        currentDistance = distance;
      }
    }

    if (!currentNodeId || currentDistance === Number.POSITIVE_INFINITY) {
      break;
    }

    if (currentNodeId === endNodeId) {
      break;
    }

    visited.add(currentNodeId);

    for (const adjacencyEdge of adjacencyMap.get(currentNodeId) ?? []) {
      const nextDistance = currentDistance + adjacencyEdge.weight;
      const knownDistance = distances.get(adjacencyEdge.nodeId) ?? Number.POSITIVE_INFINITY;

      if (nextDistance < knownDistance) {
        distances.set(adjacencyEdge.nodeId, nextDistance);
        previousNodeIds.set(adjacencyEdge.nodeId, currentNodeId);
        previousEdgeIds.set(adjacencyEdge.nodeId, adjacencyEdge.edgeId);
      }
    }
  }

  const finalDistance = distances.get(endNodeId) ?? Number.POSITIVE_INFINITY;

  if (!Number.isFinite(finalDistance)) {
    return {
      success: false,
      nodeIds: [],
      edgeIds: [],
      totalWeight: 0,
      errorMessage: "找不到可通行的路線。",
    };
  }

  const nodeIds: string[] = [endNodeId];
  const edgeIds: string[] = [];
  let cursorNodeId = endNodeId;

  while (cursorNodeId !== startNodeId) {
    const previousNodeId = previousNodeIds.get(cursorNodeId);
    const previousEdgeId = previousEdgeIds.get(cursorNodeId);

    if (!previousNodeId || !previousEdgeId) {
      return {
        success: false,
        nodeIds: [],
        edgeIds: [],
        totalWeight: 0,
        errorMessage: "路線資料不完整，無法還原最短路徑。",
      };
    }

    edgeIds.push(previousEdgeId);
    nodeIds.push(previousNodeId);
    cursorNodeId = previousNodeId;
  }

  return {
    success: true,
    nodeIds: nodeIds.reverse(),
    edgeIds: edgeIds.reverse(),
    totalWeight: finalDistance,
  };
}

export function getRouteNodes(routeResult: RouteResult, nodes: NavigationNode[]) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  return routeResult.nodeIds
    .map((nodeId) => nodeMap.get(nodeId))
    .filter((node): node is NavigationNode => Boolean(node));
}

export function getRouteEdges(routeResult: RouteResult, edges: Edge[]) {
  const edgeMap = new Map(edges.map((edge) => [edge.id, edge]));

  return routeResult.edgeIds
    .map((edgeId) => edgeMap.get(edgeId))
    .filter((edge): edge is Edge => Boolean(edge));
}

export function getRouteFloorIds(routeResult: RouteResult, nodes: NavigationNode[]) {
  return [...new Set(getRouteNodes(routeResult, nodes).map((node) => node.floorId))];
}

export function isCrossFloorRoute(routeResult: RouteResult, nodes: NavigationNode[]) {
  return getRouteFloorIds(routeResult, nodes).length > 1;
}

export function getRouteNodesByFloor(
  routeResult: RouteResult,
  nodes: NavigationNode[],
  floorId: string,
) {
  return getRouteNodes(routeResult, nodes).filter((node) => node.floorId === floorId);
}

export function getRouteSegmentsByFloor(
  routeResult: RouteResult,
  nodes: NavigationNode[],
  floorId: string,
) {
  const routeNodes = getRouteNodes(routeResult, nodes);
  const segments: Array<[NavigationNode, NavigationNode]> = [];

  for (let index = 0; index < routeNodes.length - 1; index += 1) {
    const currentNode = routeNodes[index];
    const nextNode = routeNodes[index + 1];

    if (currentNode.floorId === floorId && nextNode.floorId === floorId) {
      segments.push([currentNode, nextNode]);
    }
  }

  return segments;
}