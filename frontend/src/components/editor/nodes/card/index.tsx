import { useGlobalStore } from "@/components/context/store";
import useAttribute from "@/hooks/use-attribute";
import useNodeWithSnapshots from "@/hooks/use-node-with-snapshots";
import { LayoutNode } from "@/lib/editor/node";
import { LayoutNodeComponent } from "@/lib/editor/types";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { NodeRenderer } from "../../renderer";
import { useTheme } from "../../theme/provider";
import { buildStyle, CardSimpleColor } from "./util";

export interface CardAttributes {
  type: "simple" | "bullet";
  color?: CardSimpleColor;
  ordered?: boolean;
  orderValue?: number;
}

const CardNode: LayoutNodeComponent<CardAttributes> = ({ node }) => {
  const type = node.attributes.type;
  const theme = useTheme();
  const editable = useGlobalStore((state) => state.isEditable);
  const [index, setIndex] = useAttribute(node, "orderValue");
  const sNode = useNodeWithSnapshots(node);

  useEffect(() => {
    if (index != null) return;
    const total = node.parent!.children.filter(
      (c: LayoutNode<any>) =>
        c.type == "card" &&
        c.attributes.type == "bullet" &&
        c.index <= sNode.index
    ).length;
    setIndex(total > 0 ? total : 1);
  });

  const handleBlur = (event: React.FormEvent<HTMLParagraphElement>) => {
    const newText = event.currentTarget.textContent || "";
    if (index == parseInt(newText)) return;
    sNode.setAttribute("orderValue", parseInt(newText));
  };

  return (
    <section
      className={cn(
        "flex-node flex w-full items-center gap-2 rounded-lg p-4",
        type == "bullet" && "border border-gray-400"
      )}
      style={buildStyle(node)}
    >
      {type == "bullet" && (
        <div
          className="mr-2 flex aspect-square size-12 items-center justify-center rounded font-bold text-white"
          style={{
            backgroundColor: theme.colors.primary,
          }}
          onBlur={handleBlur}
          contentEditable={editable && node.attributes.ordered}
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{
            __html: node.attributes.ordered ? (index ?? "") : "",
          }}
        ></div>
      )}
      {node.children.map((child) => (
        <NodeRenderer node={child} key={child.id} />
      ))}
    </section>
  );
};

export default CardNode;
