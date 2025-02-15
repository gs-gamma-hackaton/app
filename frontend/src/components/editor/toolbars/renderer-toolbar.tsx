import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useEventEmitter from "@/hooks/use-event";
import { createSelectNode, createSlideNode } from "@/lib/editor/helpers";
import { LayoutNode } from "@/lib/editor/node";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { MouseEvent } from "react";

export type LayoutDragClickDetail = { id: string };
export const LayoutDragClickEvent = "layoutDragClick";

export interface RendererToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  node: LayoutNode<any>;
}

export default function RendererToolbar({
  node,
  className,
  ...props
}: RendererToolbarProps) {
  const { publishEvent } =
    useEventEmitter<LayoutDragClickDetail>(LayoutDragClickEvent);

  const handlePlusClick = (e: MouseEvent) => {
    const index = e.altKey ? node.index : node.index + 1;
    const newNode = node.depth > 1 ? createSelectNode() : createSlideNode();
    setTimeout(() => newNode.focus(), 0);
    node.parent!.insert(index, newNode);
  };
  const handleDragClick = (e: MouseEvent) => {
    publishEvent({ id: node.id });
  };

  return (
    <div
      className={cn("node-handle h-full space-x-1 px-4", className)}
      {...props}
    >
      {node.parent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="secondary" onClick={handlePlusClick}>
                <Plus size={12} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-muted-foreground">
              <p>
                <span className="font-bold text-primary-foreground">
                  Нажмите,{" "}
                </span>
                чтобы добавить элемент ниже
              </p>
              <p>
                <span className="font-bold text-primary-foreground">
                  Alt+Нажмите,{" "}
                </span>
                чтобы добавить элемент выше
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
