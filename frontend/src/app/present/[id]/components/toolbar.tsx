import { useGlobalStore } from "@/components/context/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

export default function Toolbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const index = useGlobalStore((store) => store.selectedSlide);
  const setSlide = useGlobalStore((store) => store.setSelectedSlide);
  const slides = useGlobalStore((store) => store.slidesRegistry);

  const hasPrev = useMemo(() => index > 0, [index]);
  const hasNext = useMemo(() => index < slides.size - 1, [index, slides]);
  const handleGoToSlide = (delta: number) => {
    setSlide(index + delta);
  };

  return (
    <div
      className={cn("flex h-16 w-full items-center justify-center", className)}
      {...props}
    >
      <div className="flex items-center gap-4 rounded bg-primary px-2 py-1">
        <Button
          variant="ghost"
          className="size-6"
          onClick={() => handleGoToSlide(-1)}
          disabled={!hasPrev}
        >
          <ChevronLeft />
        </Button>
        <p className="text-xs tabular-nums">
          Слайд {index + 1}/{slides.size}
        </p>
        <Button
          variant="ghost"
          className="size-6"
          onClick={() => handleGoToSlide(1)}
          disabled={!hasNext}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
