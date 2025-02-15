import { useGlobalStore } from "@/components/context/store";
import useAttribute from "@/hooks/use-attribute";
import useKeyPress from "@/hooks/use-key-press";
import useNodeWithSnapshots from "@/hooks/use-node-with-snapshots";
import { LayoutNodeComponent } from "@/lib/editor/types";
import { cn } from "@/lib/utils";
import { Grip } from "lucide-react";
import { Resizable, ResizeCallbackData } from "react-resizable";
import { buildStyle } from "./util";

export interface ImageAttributes {
  url: string;
  width: number;
  height: number;
  size?: "cover" | "contain" | "fill";
}

const ImageNode: LayoutNodeComponent<ImageAttributes> = ({ node }) => {
  const [width, setWidth] = useAttribute(node, "width", true);
  const [height, setHeight] = useAttribute(node, "height", true);

  const keepAspect = useKeyPress("Shift");
  const sNode = useNodeWithSnapshots(node);
  const editable = useGlobalStore((state) => state.isEditable);
  const scaleFactor = useGlobalStore((state) => state.scaleFactor);

  const handleResize = (event: any, { size }: ResizeCallbackData) => {
    if (!editable) return;
    setWidth(size.width / scaleFactor);
    setHeight(size.height / scaleFactor);
  };
  const handleResizeEnd = (event: any, { size }: ResizeCallbackData) => {
    if (!editable) return;
    sNode.set({
      width: size.width / scaleFactor,
      height: size.height / scaleFactor,
    });
  };

  return (
    <Resizable
      className={cn(
        "group relative border border-transparent",
        editable && "hover:border-black"
      )}
      width={width * scaleFactor}
      height={height * scaleFactor}
      onResize={handleResize}
      onResizeStop={handleResizeEnd}
      minConstraints={editable ? [16, 16] : undefined}
      maxConstraints={editable ? [512, 512] : undefined}
      lockAspectRatio={keepAspect}
      handle={
        <div>
          {editable && (
            <div
              className="absolute bottom-0 right-0 size-4 opacity-0 group-hover:opacity-100"
              title="Зажмите Shift для сохранения соотношения сторон"
            >
              <Grip className="size-3" />
            </div>
          )}
        </div>
      }
    >
      <div
        className="box"
        style={{
          width: width * scaleFactor + "px",
          height: height * scaleFactor + "px",
        }}
      >
        <img
          src={node.attributes.url}
          className="h-full w-full"
          style={buildStyle(node.attributes)}
        />
      </div>
    </Resizable>
  );
};

export default ImageNode;
