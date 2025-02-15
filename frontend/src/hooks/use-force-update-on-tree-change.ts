import { LayoutNode, TreeUpdateEvent } from "@/lib/editor/node";
import { useCallback, useEffect, useReducer } from "react";

export default function useForceUpdateOnTreeChange(node: LayoutNode<any>) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const handler = useCallback(() => {
    forceUpdate();
  }, [node]);

  useEffect(() => {
    node.event.addEventListener(TreeUpdateEvent, handler);
    return () => node.event.removeEventListener(TreeUpdateEvent, handler);
  }, [node, handler]);
}
