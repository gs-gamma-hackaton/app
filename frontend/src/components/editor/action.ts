import { wrapNodeWithSnapshots } from "@/hooks/use-node-with-snapshots";
import { createSelectNode } from "@/lib/editor/helpers";
import { LayoutNode } from "@/lib/editor/node";
import { Snapshot } from "@/lib/snapshot";
import { globalStore } from "../context/store";

type ActionRegistryEntry = (node: LayoutNode<any>) => void;

const actionRegistry = {
  create: doCreate,
  createInOrNear: doCreateInOrNear,
  delete: doDelete,
  duplicate: doDuplicate,
  moveUp: (node) => doMove(node, -1),
  moveDown: (node) => doMove(node, 1),
  moveInsideUp: (node) => doMoveInside(node, -1),
  moveInsideDown: (node) => doMoveInside(node, 1),
  moveOutside: doMoveOutside,
} satisfies Record<string, ActionRegistryEntry>;

export function tryPerformAction(
  node: LayoutNode<any>,
  action: keyof typeof actionRegistry
) {
  try {
    performAction(node, action);
  } catch (_) {}
}

export function performAction(
  node: LayoutNode<any>,
  action: keyof typeof actionRegistry
) {
  
  const callback = actionRegistry[action];
  callback(node);
  
}

function doCreate(node: LayoutNode<any>) {
  const child = createSelectNode(0);
  setTimeout(() => child.focus(), 0);
  node.append(child);
}

function doCreateInOrNear(node: LayoutNode<any>) {
  const child = createSelectNode(0);
  setTimeout(() => child.focus(), 0);

  if (node.canHaveChildren) node.append(child);
  else node.parent!.append(child);
}

function doDelete(node: LayoutNode<any>) {
  const sNode = wrapNodeWithSnapshots(node, snapshotPush);
  sNode.removeSelf();
}

function doDuplicate(node: LayoutNode<any>) {
  const parent = wrapNodeWithSnapshots(node.parent!, snapshotPush);
  const index = node.index;
  parent.insert(index, node.clone());
}

function doMove(node: LayoutNode<any>, delta: number) {
  const sNode = wrapNodeWithSnapshots(node, snapshotPush);
  const targetIndex = node.index + delta;
  if (targetIndex < 0 || targetIndex >= node.parent!.children.length)
    throw new Error("Cannot move");

  const parent = node.parent!;
  sNode.moveTo(parent, targetIndex);
}

function doMoveInside(node: LayoutNode<any>, delta: number) {
  const parent = node.parent!;
  const targetIndex = node.index + delta;
  if (targetIndex < 0 || targetIndex >= parent.children.length)
    throw new Error("Cannot move");

  const container = parent.children[targetIndex];
  if (!container.canHaveChildren) throw new Error("Cannot move");

  const sNode = wrapNodeWithSnapshots(node, snapshotPush);
  sNode.moveTo(container, container.children.length);
}

function doMoveOutside(node: LayoutNode<any>) {
  const container = node.parent!;
  const index = container.index;
  const parent = container.parent!;

  if (parent.depth < 1) throw new Error("Cannot move");
  const sNode = wrapNodeWithSnapshots(node, snapshotPush);
  sNode.moveTo(parent, index + 1);
}

function snapshotPush(snapshot: Snapshot) {
  const state = globalStore.getState();
  state.push(snapshot);
}
