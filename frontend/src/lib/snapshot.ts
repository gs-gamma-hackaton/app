import { LayoutNode } from "./editor/node";

export interface SnapshotBase {
  type: string;
  node: LayoutNode<any>;
}

export interface SnapshotAttribute extends SnapshotBase {
  type: "attribute";
  name: string;
  prev: any;
  current: any;
}

export interface SnapshotChildMove extends SnapshotBase {
  type: "child_move";
  fromParent: LayoutNode<any>;
  toParent: LayoutNode<any>;
  fromIndex: number;
  toIndex: number;
}

export interface SnapshotChildNew extends SnapshotBase {
  type: "child_new";
  parent: LayoutNode<any>;
  index: number;
}

export interface SnapshotChildRemove extends SnapshotBase {
  type: "child_remove";
  parent: LayoutNode<any>;
  index: number;
}

export interface SnapshotComplex extends SnapshotBase {
  type: "complex";
  children: Snapshot[];
}

export type Snapshot =
  | SnapshotAttribute
  | SnapshotChildMove
  | SnapshotChildNew
  | SnapshotChildRemove
  | SnapshotComplex;

export function setAttribute<T>(
  node: LayoutNode<T>,
  name: keyof T,
  value: T[keyof T]
): SnapshotAttribute {
  const prev = node.attributes[name];
  node.setAttribute(name, value);
  return {
    type: "attribute",
    node,
    name: name as string,
    prev: prev,
    current: value,
  };
}

export function setAttributes<T>(node: LayoutNode<T>, attributes: Partial<T>) {
  const snapshots = Object.entries(attributes).map(([name, value]) =>
    setAttribute(node, name as keyof T, value as any)
  );
  return merge(node, ...snapshots);
}

export function insert<T, K>(
  parent: LayoutNode<T>,
  node: LayoutNode<K>,
  index: number
): SnapshotChildNew {
  parent.insert(index, node);
  return {
    type: "child_new",
    parent,
    node,
    index,
  };
}

export function remove<T>(
  parent: LayoutNode<T>,
  index: number
): SnapshotChildRemove {
  const node = parent.children[index];
  parent.remove(index);
  return {
    type: "child_remove",
    parent,
    node,
    index,
  };
}

export function move<T, K>(
  fromParent: LayoutNode<T>,
  fromIndex: number,
  toParent: LayoutNode<K>,
  toIndex: number
): SnapshotChildMove {
  const node = fromParent.children[fromIndex];
  fromParent.remove(fromIndex);
  toParent.insert(toIndex, node);
  return {
    type: "child_move",
    node,
    fromParent,
    toParent,
    fromIndex,
    toIndex,
  };
}

export function apply(snapshot: Snapshot, redo: boolean = false) {
  const node = snapshot.node;
  switch (snapshot.type) {
    case "attribute": {
      node.setAttribute(snapshot.name, redo ? snapshot.current : snapshot.prev);
      return;
    }
    case "complex": {
      snapshot.children.forEach((child) => apply(child, redo));
      return;
    }
    case "child_new": {
      const sn = snapshot as SnapshotChildNew;
      const parent = sn.parent;
      if (redo) {
        parent.insert(sn.index, node);
      } else {
        parent.remove(sn.index);
      }
      return;
    }
    case "child_remove": {
      const sn = snapshot as SnapshotChildRemove;
      const parent = sn.parent;
      if (redo) {
        parent.remove(sn.index);
      } else {
        parent.insert(sn.index, node);
      }
      return;
    }
    case "child_move": {
      const sn = snapshot as SnapshotChildMove;
      const fromParent = sn.fromParent;
      const toParent = sn.toParent;
      if (redo) {
        fromParent.remove(sn.fromIndex);
        toParent.insert(sn.toIndex, node);
      } else {
        toParent.remove(sn.toIndex);
        fromParent.insert(sn.fromIndex, node);
      }
      return;
    }
  }
}

function merge(node: LayoutNode<any>, ...snapshots: Snapshot[]): Snapshot {
  return {
    type: "complex",
    node,
    children: snapshots,
  };
}
