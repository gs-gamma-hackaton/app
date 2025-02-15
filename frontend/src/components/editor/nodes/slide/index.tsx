import { useGlobalStore } from "@/components/context/store";
import TemplateSelect from "@/components/layout/sheet/template-select";
import { Button } from "@/components/ui/button";
import Confirm from "@/components/ui/confirm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAttribute from "@/hooks/use-attribute";
import useNodeEvent from "@/hooks/use-node-event";
import { FocusEvent } from "@/lib/editor/node";
import { LayoutNodeComponent } from "@/lib/editor/types";
import { cn } from "@/lib/utils";
import { Copy, Plus, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { performAction } from "../../action";
import { NodeRenderer } from "../../renderer";
import { useTheme } from "../../theme/provider";

export interface SlideAttributes {
  active?: boolean;
  layout?: "default" | "left" | "right" | "full";
}

const SlideComponentToolbar: LayoutNodeComponent<SlideAttributes> = ({
  node,
}) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  return (
    <div className="absolute -right-4 top-1/2 flex -translate-y-1/2 translate-x-full flex-col gap-2">
      <Confirm
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={() => performAction(node, "delete")}
      >
        Вы действительно хотите удалить слайд?
      </Confirm>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <TemplateSelect>
              <Button className="size-8" variant="secondary">
                <Plus />
              </Button>
            </TemplateSelect>
          </TooltipTrigger>
          <TooltipContent side="left">Создать слайд</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-8"
              variant="ghost"
              onClick={() => performAction(node, "duplicate")}
            >
              <Copy />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Дублировать слайд</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-8 hover:bg-destructive hover:text-destructive-foreground"
              variant="ghost"
              onClick={() => setDeleteConfirmOpen(true)}
            >
              <Trash />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Удалить слайд</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const buildClasses = (node: any) => {
  const layout = node.attributes.layout ?? "default";
  if (layout == "default" || layout == "full") return "";
  return layout == "left"
    ? "grid grid-cols-[100px_1fr]"
    : "grid grid-cols-[1fr_100px]";
};

const SlideComponent: LayoutNodeComponent<SlideAttributes> = ({ node }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useAttribute(node, "active");
  const theme = useTheme();
  const editable = useGlobalStore((state) => state.isEditable);

  const layout = node.attributes.layout ?? "default";
  const hasLayoutPart = layout != "full" && layout != "default";
  const shouldLayoutReorder = layout == "right";

  useNodeEvent(node, FocusEvent, () => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });

  return (
    <section
      ref={ref}
      className={cn(
        "relative w-full min-w-[768px] border-2 border-transparent p-6",
        active && editable && "border-blue-500",
        editable ? "aspect-video w-[768px]" : "h-screen",
        buildClasses(node)
      )}
      style={{
        backgroundColor:
          node.attributes.layout == "full"
            ? theme.colors.background
            : theme.colors.foreground,
        backgroundImage:
          node.attributes.layout == "full"
            ? `url(${theme.colors.backgroundImage})`
            : undefined,
        backgroundSize: "cover",
      }}
    >
      {hasLayoutPart && (
        <div className={cn(shouldLayoutReorder ? "order-2" : "order-1")}>
          <div
            className={cn(
              "absolute top-0 h-full w-[100px]",
              shouldLayoutReorder ? "right-0" : "left-0"
            )}
            style={{
              backgroundColor: theme.colors.background,
              backgroundImage: `url(${theme.colors.backgroundImage})`,
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      )}
      <ul className={cn(shouldLayoutReorder ? "order-1" : "order-2")}>
        {node.children.map((child) => (
          <NodeRenderer node={child} key={child.id} />
        ))}
      </ul>
      {active && <SlideComponentToolbar node={node} />}
    </section>
  );
};

export default SlideComponent;
