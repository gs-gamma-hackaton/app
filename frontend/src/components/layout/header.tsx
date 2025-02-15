import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Download,
  Ellipsis,
  Home,
  Play,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HTMLAttributes, useMemo } from "react";
import { useActiveSlide, useGlobalStore } from "../context/store";
import SnapshotButtons from "../snapshot-buttons";
import { Button } from "../ui/button";

function SlidesBlock() {
  const slides = useGlobalStore((state) => state.slidesRegistry);
  const slide = useActiveSlide();

  const totalSlides = useMemo(() => slides.size, [slides]);
  const slideIndex = useMemo(() => {
    return slide?.index ?? 0;
  }, [slide]);

  const hasPrev = useMemo(() => slideIndex > 0, [slideIndex]);
  const hasNext = useMemo(
    () => slideIndex < totalSlides - 1,
    [slideIndex, totalSlides]
  );

  const focus = (delta: number = 0) => {
    if (!slide) return;
    const parent = slide.parent!;
    parent.children[slide.index + delta].focus();
  };

  return (
    <div className="flex items-center justify-center gap-2 tabular-nums">
      <Button
        variant="ghost"
        className="size-8"
        disabled={!hasPrev}
        onClick={() => focus(-1)}
      >
        <ArrowLeft />
      </Button>
      Слайд {slideIndex + 1}/{totalSlides}
      <Button
        variant="ghost"
        className="size-8"
        disabled={!hasNext}
        onClick={() => focus(1)}
      >
        <ArrowRight />
      </Button>
    </div>
  );
}

export default function Header({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { id } = useParams();

  return (
    <div className={cn("relative z-10", className)} {...props}>
      <header className="fixed grid h-12 w-full grid-cols-3 border-b border-primary bg-background-overlay px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Home className="size-4 text-primary-foreground/50 hover:text-primary-foreground" />
            </Link>
            <ChevronRight className="hidden size-4 text-primary-foreground/50 lg:block" />
            <p className="hidden lg:block">Презентация без названия</p>
          </div>
          <SnapshotButtons className="hidden md:block" />
        </div>
        <SlidesBlock />
        <div className="flex items-center justify-end gap-2">
          <Button className="bg-blue-500 hover:bg-blue-400" asChild>
            <a href={`/present/${id}`} target="_blank">
              <Play />
              Презентация
            </a>
          </Button>
          <Button variant="ghost" className="size-8" asChild>
            <a href={`/render/${id}`} target="_blank">
              <Download />
            </a>
          </Button>
          <Button variant="ghost" className="size-8">
            <Ellipsis />
          </Button>
        </div>
      </header>
    </div>
  );
}
