import { LayoutNodeComponent } from "@/lib/editor/types";
import { CSSProperties } from "react";
import { NodeRenderer } from "../../renderer";

export interface GridAttributes {
  columns: number;
  justify?: "start" | "end" | "center" | "stretch";
  align?: "start" | "end" | "center";
}

function buildStyle(attributes: GridAttributes): CSSProperties {
  const justifyContent = attributes.justify ?? "start";

  let justifyContentStyle = justifyContent;
  if (justifyContent == "stretch") {
    justifyContentStyle = "start";
  }

  return {
    justifyContent: justifyContentStyle,
    alignItems: attributes.align ?? "start",
  };
}

function buildItemStyle(
  attributes: GridAttributes,
  itemIndex: number,
  totalItems: number
): CSSProperties {
  const columns = attributes.columns;
  const itemWidth = `calc(${100 / columns}%)`;
  const rowIndex = Math.floor(itemIndex / columns);
  const isLastRow = rowIndex == Math.ceil(totalItems / columns) - 1;

  if (isLastRow && attributes.justify == "stretch") {
    return {
      flexGrow: 1,
    };
  }
  return {
    flex: `1 1 ${itemWidth}`,
    maxWidth: itemWidth,
  };
}

const GridNode: LayoutNodeComponent<GridAttributes> = ({ node }) => {
  return (
    <section
      className="flex min-h-2 w-full flex-wrap items-center justify-start"
      style={buildStyle(node.attributes)}
    >
      {node.children.map((child, index) => {
        return (
          <div
            key={child.id}
            className="p-1"
            style={buildItemStyle(node.attributes, index, node.children.length)}
          >
            <NodeRenderer node={child} />
          </div>
        );
      })}
    </section>
  );
};

export default GridNode;
