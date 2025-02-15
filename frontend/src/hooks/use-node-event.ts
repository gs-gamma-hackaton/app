import { LayoutNode, NodeEvent } from "@/lib/editor/node";
import { useEffect } from "react";

export default function useNodeEvent(
  node: LayoutNode<any>,
  event: NodeEvent,
  callback: () => void
) {
  useEffect(() => {
    node.event.addEventListener(event, callback);
    return () => {
      node.event.removeEventListener(event, callback);
    };
  }, []);
}
