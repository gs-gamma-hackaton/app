import useEventEmitter from "@/hooks/use-event";
import useNodeEvent from "@/hooks/use-node-event";
import { BlurEvent, FocusEvent, LayoutNode } from "@/lib/editor/node";
import { LayoutNodeComponent } from "@/lib/editor/types";
import { useRef } from "react";
import { NodeSelectSearchEvent } from "./toolbar";

export interface NodeSelectAttributes {
  destroyDepth: number;
}

const NodeSelectNode: LayoutNodeComponent<NodeSelectAttributes> = ({
  node,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const { publishEvent } = useEventEmitter<string>(NodeSelectSearchEvent);

  const destroy = () => {
    let target: LayoutNode<unknown> = node;
    for (let i = 0; i < node.attributes.destroyDepth; i++) {
      if (target.parent != null) target = target.parent;
    }
    target.removeSelf();
  };

  useNodeEvent(node, FocusEvent, () => ref.current?.focus());
  useNodeEvent(node, BlurEvent, () => destroy());

  return (
    <div className="relative">
      <input
        ref={ref}
        onChange={(e) => publishEvent(e.target.value)}
        className="w-full outline-none"
        placeholder="Введите для поиска..."
      />
    </div>
  );
};

export default NodeSelectNode;
