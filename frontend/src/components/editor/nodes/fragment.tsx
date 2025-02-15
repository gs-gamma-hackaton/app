import { LayoutNodeComponent } from "@/lib/editor/types";
import { NodeRenderer } from "../renderer";

export interface FragmentAttributes {}

const FragmentComponent: LayoutNodeComponent<FragmentAttributes> = ({
  node,
}) => {
  return (
    <>
      {node.children.map((child) => (
        <NodeRenderer node={child} key={child.id} />
      ))}
    </>
  );
};

export default FragmentComponent;
