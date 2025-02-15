import { LayoutNodeComponent } from "@/lib/editor/types";
import { NodeRenderer } from "../../renderer";
import {
  alertIconRegistry,
  AlertType,
  buildIconStyle,
  buildStyle,
} from "./util";

export interface AlertAttributes {
  type: AlertType;
}

const AlertNode: LayoutNodeComponent<AlertAttributes> = ({ node }) => {
  const Icon = alertIconRegistry[node.attributes.type];

  return (
    <div
      className="flex items-center gap-4 rounded p-4"
      style={buildStyle(node)}
    >
      <Icon style={buildIconStyle(node)} />
      {node.children.map((child) => (
        <NodeRenderer node={child} key={child.id} />
      ))}
    </div>
  );
};

export default AlertNode;
