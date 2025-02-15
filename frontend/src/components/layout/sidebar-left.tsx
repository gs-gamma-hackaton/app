import { LayoutNode } from "@/lib/editor/node";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useMemo } from "react";
import { useActiveSlideId, useGlobalStore } from "../context/store";
import { ScrollArea } from "../ui/scroll-area";

export default function SidebarLeft({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const activeSlideId = useActiveSlideId();
  const slidesRegistry = useGlobalStore((state) => state.slidesRegistry);
  const slides = useMemo(
    () => [...slidesRegistry.values()].sort((a, b) => a.index - b.index),
    [slidesRegistry]
  );

  const slideIndex = useMemo(() => {
    if (!activeSlideId) return 0;
    const slide = slidesRegistry.get(activeSlideId);
    if (!slide) return 0;
    return slide.index;
  }, [activeSlideId, slidesRegistry]);

  return (
    <div className={cn("relative z-10", className)} {...props}>
      <nav className="fixed flex h-[calc(100vh-48px)] w-48 flex-col items-center justify-start border-r border-primary bg-background-overlay p-2">
        <ScrollArea className="h-full w-full py-2">
          <ul className="w-full space-y-2">
            {slides.map((s) => (
              <li key={s.id}>
                <SlidePreview node={s} active={slideIndex === s.index} />
              </li>
            ))}
          </ul>
        </ScrollArea>
      </nav>
    </div>
  );
}

function SlidePreview({
  node,
  active,
}: {
  node: LayoutNode<any>;
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        "flex aspect-video w-full items-center justify-center rounded border-2 border-transparent bg-gray-600 hover:bg-gray-500",
        active && "border-blue-400"
      )}
      onClick={() => node.focus()}
    >
      Слайд {node.index + 1}
    </button>
  );
}
