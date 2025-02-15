import { useGlobalStore } from "@/components/context/store";
import useAttribute from "@/hooks/use-attribute";
import useNodeEvent from "@/hooks/use-node-event";
import useNodeWithSnapshots from "@/hooks/use-node-with-snapshots";
import { FocusEvent } from "@/lib/editor/node";
import { LayoutNodeComponent } from "@/lib/editor/types";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { buildStyle, FontColor, FontSize } from "./util";

export interface TextAttributes {
  text: string;
  color?: FontColor;
  fontSize?: FontSize;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  quote?: boolean;
}

const TextNode: LayoutNodeComponent<TextAttributes> = ({ node }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const sNode = useNodeWithSnapshots(node);
  const [text] = useAttribute(node, "text");
  const handleBlur = (event: React.FormEvent<HTMLParagraphElement>) => {
    const newText = event.currentTarget.textContent || "";
    if (text == newText) return;
    sNode.setAttribute("text", newText);
  };
  const editable = useGlobalStore((state) => state.isEditable);
  useNodeEvent(node, FocusEvent, () => ref.current?.focus());

  return (
    <p
      ref={ref}
      className={cn(
        "min-w-0.5 whitespace-pre-wrap",
        node.attributes.quote && "border-l-2 py-2 pl-4"
      )}
      style={buildStyle(node)}
      onBlur={handleBlur}
      contentEditable={editable}
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{ __html: text }}
    ></p>
  );
};

export default TextNode;
