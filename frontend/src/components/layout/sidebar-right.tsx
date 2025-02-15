import { cn } from "@/lib/utils";
import { Palette, Sparkle, SquareMousePointer } from "lucide-react";
import { HTMLAttributes } from "react";
import { Button, ButtonProps } from "../ui/button";
import ElementSelect from "./sheet/element-select";
import TemplateSelect from "./sheet/template-select";
import ThemeSelect from "./sheet/theme-select";

export default function SidebarRight({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative z-10", className)} {...props}>
      <nav className="fixed flex h-full w-20 flex-col items-center justify-start border-l border-primary bg-background-overlay p-2">
        <ThemeSelect>
          <SidebarButton id="tutorial-theme">
            <Palette />
            Тема
          </SidebarButton>
        </ThemeSelect>
        <SidebarDivider />
        <ElementSelect>
          <SidebarButton>
            <SquareMousePointer />
            Элементы
          </SidebarButton>
        </ElementSelect>
        <TemplateSelect>
          <SidebarButton id="tutorial-templates">
            <Sparkle />
            Шаблоны
          </SidebarButton>
        </TemplateSelect>
      </nav>
    </div>
  );
}

function SidebarButton(props: ButtonProps) {
  return (
    <Button
      className="flex aspect-square size-auto w-full flex-col items-center justify-center text-xs"
      variant="ghost"
      {...props}
    ></Button>
  );
}

function SidebarDivider() {
  return <div className="my-2 h-0.5 w-full bg-primary"></div>;
}
