import { LayoutNodeComponent } from "@/lib/editor/types";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";
import { NodeRenderer } from "../../renderer";

export interface FlexAttributes {
  direction: "row" | "column";
  justify?: "start" | "end" | "center" | "space-between";
  align?: "start" | "end" | "center";
}

function buildStyle(attributes: FlexAttributes): CSSProperties {
  return {
    flexDirection: attributes.direction,
    justifyContent: attributes.justify ?? "start",
    alignItems: attributes.align ?? "start",
  };
}

const FlexNode: LayoutNodeComponent<FlexAttributes> = ({ node }) => {
  return (
    <section
      className={cn("flex-node flex w-full gap-2 py-2")}
      style={buildStyle(node.attributes)}
    >
      {node.children.map((child) => (
        <NodeRenderer node={child} key={child.id} />
      ))}
    </section>
  );
};

export default FlexNode;
