"use client";

import { get, update } from "@/api/presentation";
import { NodeRootRenderer } from "@/components/editor/renderer";
import { useThemeContext } from "@/components/editor/theme/provider";
import { createFragmentNode } from "@/lib/editor/helpers";
import { LayoutNode } from "@/lib/editor/node";
import { Presentation } from "@/lib/editor/types";
import { useQuery } from "@tanstack/react-query";
import { CircleX, LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["presentation", id],
    queryFn: () => get(parseInt(id as string)),
  });
  const { theme, setTheme } = useThemeContext();
  const [presentation, setPresentation] = useState<Presentation | null>(null);

  const root = createFragmentNode();

  useEffect(() => {
    if (!data) return;
    setTheme(data.data.theme);
    setPresentation(data.data);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!presentation) return;
      const updated = {
        ...presentation,
        theme,
        content: root.serialize().children,
      };
      update(parseInt(id as string), updated);
    }, 15000);
    return () => clearInterval(interval);
  }, [presentation, theme]);

  if (isLoading) {
    return (
      <div className="fixed left-0 top-0 z-40 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background">
        <LoaderCircle className="animate-spin" />
        <p>Загрузка...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background">
        <CircleX className="text-destructive" />
        <p>При загрузке произошла ошибка</p>
      </div>
    );
  }

  data!.data.content.forEach((slide) => root.append(LayoutNode.from(slide)));

  return <NodeRootRenderer node={root} editable />;
}
