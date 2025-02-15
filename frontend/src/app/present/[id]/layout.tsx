"use client";

import { useGlobalStore } from "@/components/context/store";
import { LayoutThemeProvider } from "@/components/editor/theme/provider";
import { useEffect, useMemo, useRef } from "react";
import Toolbar from "./components/toolbar";
import useScaleFactorWithResize from "./hooks/use-scale-factor-with-resize";

export default function Layout({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const index = useGlobalStore((state) => state.selectedSlide);
  const slides = useGlobalStore((state) => state.slidesRegistry);
  const activeSlide = useMemo(() => {
    if (index < 0 || index >= slides.size) return null;
    return slides.values().find((s) => s.index == index);
  }, [slides, index]);

  const scaleFactor = useScaleFactorWithResize();
  useEffect(() => {
    document.documentElement.style.fontSize = 10 * scaleFactor + "px";
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [scaleFactor]);

  useEffect(() => {
    if (!activeSlide) return;
    if (!containerRef.current) return;
    containerRef.current.scroll(0, index * (document.body.clientHeight + 3));
  }, [activeSlide, index]);

  return (
    <LayoutThemeProvider>
      <main
        className="flex h-screen w-full flex-col items-center overflow-hidden bg-background"
        ref={containerRef}
      >
        {children}
        <Toolbar className="absolute bottom-0 left-0 opacity-0 transition hover:opacity-100" />
      </main>
    </LayoutThemeProvider>
  );
}
