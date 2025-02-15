import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Info, LucideProps } from "lucide-react";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export interface HintProps extends LucideProps {
  text: string;
}

const Hint = React.forwardRef<HTMLButtonElement, HintProps>(
  ({ text, className, ...props }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info
              className={cn(
                "inline size-4 align-middle text-muted-foreground",
                className
              )}
              {...props}
            />
          </TooltipTrigger>
          <TooltipContent>{text}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);
Hint.displayName = "Hint";

export { Hint };
