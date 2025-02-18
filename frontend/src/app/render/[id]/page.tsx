"use client";

import { get } from "@/api/presentation";
import { useGoogleFonts } from "@/components/context/fonts";
import { NodeRootRenderer } from "@/components/editor/renderer";
import { useThemeContext } from "@/components/editor/theme/provider";
import { createFragmentNode } from "@/lib/editor/helpers";
import { LayoutNode } from "@/lib/editor/node";
import { useQuery } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { CheckCircle, CircleX, LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [finished, setFinished] = useState(false);

  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["presentation", id],
    queryFn: () => get(parseInt(id as string)),
  });
  const { addFont } = useGoogleFonts();
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
    addFont(data.data.theme.fonts.heading);
    addFont(data.data.theme.fonts.text);
  }, [data]);

  useEffect(() => {
    async function doRender() {
      const total = root.children.length;
      const pdf = new jsPDF({
        orientation: "l",
        format: [1530, 742],
        unit: "px",
        hotfixes: ["px_scalin"],
      });

      for (let i = 0; i < total; i++) {
        const slide = document.getElementById(`slide-${i}`);
        const canvas = await html2canvas(slide!, {
          width: 1920,
          height: 1080,
          windowWidth: 1920,
          windowHeight: 1080,
        });
        const imgData = canvas.toDataURL("image/png");

        if (i !== 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, 1920, 1080);
      }
      await pdf.save("document.pdf", { returnPromise: true });
      setFinished(true);
    }
    if (isSuccess) setTimeout(doRender, 100);
  }, [isSuccess]);

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

  return (
    <>
      <div className="fixed left-0 top-0 z-40 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background">
        {finished ? <CheckCircle /> : <LoaderCircle className="animate-spin" />}
        {finished ? (
          <p>Экспорт завершен. Эту страницу можно закрыть.</p>
        ) : (
          <p>Экспорт...</p>
        )}
      </div>
      <NodeRootRenderer node={root} />
    </>
  );
}
