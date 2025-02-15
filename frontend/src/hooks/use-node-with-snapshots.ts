import { useGlobalStore } from "@/components/context/store";
import { LayoutNode } from "@/lib/editor/node";
import {
  insert,
  move,
  remove,
  setAttribute,
  setAttributes,
  Snapshot,
} from "@/lib/snapshot";
import { useMemo } from "react";

export default function useNodeWithSnapshots<T>(
  node: LayoutNode<T>
): LayoutNode<T> {
  const push = useGlobalStore((state) => state.push);
  const sNode = useMemo(() => wrapNodeWithSnapshots(node, push), [node]);
  return sNode;
}

export function wrapNodeWithSnapshots<T>(
  node: LayoutNode<T>,
  push: (s: Snapshot) => void
) {
  return new Proxy(node, nodeProxyHandler(push));
}

const nodeProxyHandler = <T>(push: (snapshot: Snapshot) => void) => ({
  get: (target: any, prop: string, receiver: any) => {
    switch (prop) {
      case "setAttribute": {
        return (key: keyof T, value: any) => {
          const snapshot = setAttribute(target, key, value);
          push(snapshot);
        };
      }
      case "set": {
        return (attributes: Partial<T[keyof T]>) => {
          const snapshot = setAttributes(target, attributes);
          push(snapshot);
        };
      }
      case "insert": {
        return (index: number, node: LayoutNode<any>) => {
          const snapshot = insert(target, node, index);
          push(snapshot);
        };
      }
      case "remove": {
        return (index: number) => {
          const snapshot = remove(target, index);
          push(snapshot);
        };
      }
      case "removeSelf": {
        return () => {
          const snapshot = remove(target.parent, target.index);
          push(snapshot);
        };
      }
      case "moveTo": {
        return (parent: LayoutNode<any>, index: number) => {
          const snapshot = move(target.parent, target.index, parent, index);
          push(snapshot);
        };
      }
      // case "append": {
      //   return (node: LayoutNode<any>) => {
      //     const snapshot = append(target, node);
      //     push(snapshot);
      //   };
      // }
    }
    return Reflect.get(target, prop, receiver);
  },
});
