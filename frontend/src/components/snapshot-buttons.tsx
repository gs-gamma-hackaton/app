"use client";

import { apply } from "@/lib/snapshot";
import { cn } from "@/lib/utils";
import { Redo, Undo } from "lucide-react";
import { HTMLAttributes } from "react";
import { useGlobalStore, useSnapshotBounds } from "./context/store";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function SnapshotButtons({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { canUndo, canRedo } = useSnapshotBounds();
  const { undo, redo } = useGlobalStore((state) => state);

  const handleUndo = () => {
    const snapshot = undo();
    apply(snapshot);
  };
  const handleRedo = () => {
    const snapshot = redo();
    apply(snapshot, true);
  };

  return (
    <div className={cn("px-4", className)} {...props}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="size-8"
              disabled={!canUndo}
              onClick={handleUndo}
            >
              <Undo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Отменить{" "}
            <span className="rounded bg-muted p-0.5 text-xs tracking-widest text-muted-foreground">
              Ctrl+Z
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="size-8"
              disabled={!canRedo}
              onClick={handleRedo}
            >
              <Redo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Повторить{" "}
            <span className="rounded bg-muted p-0.5 text-xs tracking-widest text-muted-foreground">
              Ctrl+Y
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
