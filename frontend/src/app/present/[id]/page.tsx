"use client";

import { get } from "@/api/presentation";
import { useThemeContext } from "@/components/editor/theme/provider";
import { createFragmentNode } from "@/lib/editor/helpers";
import { LayoutNode } from "@/lib/editor/node";
import { useQuery } from "@tanstack/react-query";
import { CircleX, LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import NodePresentationRootRenderer from "./components/renderer";

export default function Home() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["presentation", id],
    queryFn: () => get(parseInt(id as string)),
  });
  const { theme, setTheme } = useThemeContext();

  const root = useMemo(() => {
    const node = createFragmentNode();
    if (!data) return node;
    data!.data.content.forEach((slide) => node.append(LayoutNode.from(slide)));
    return node;
  }, [data]);

  useEffect(() => {
    if (!data) return;
    setTheme(data.data.theme);
  }, [data]);

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
  if (!data) return <></>;

  return <NodePresentationRootRenderer node={root} />;
}
