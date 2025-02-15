"use client";

import { NodeRootRenderer } from "@/components/editor/renderer";
import { LayoutNode } from "@/lib/editor/node";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [finished, setFinished] = useState(false);
  const root = LayoutNode.from({
    type: "fragment",
    attributes: {},
    children: [
      {
        type: "slide",
        attributes: {},
        children: [
          {
            type: "text",
            attributes: {
              text: "Привет, мир 1!",
              fontSize: "h1",
              bold: true,
            },
            children: [],
          },
          {
            type: "text",
            attributes: {
              text: "Это пример текста для слайда",
            },
            children: [],
          },
          {
            type: "flex",
            attributes: {
              direction: "row",
            },
            children: [
              {
                type: "image",
                attributes: {
                  url: "/img.webp",
                  width: 256,
                  height: 256,
                },
                children: [],
              },
              {
                type: "text",
                attributes: {
                  text: "Lorem Ipsum...",
                },
                children: [],
              },
            ],
          },
        ],
      },
      {
        type: "slide",
        attributes: {},
        children: [
          {
            type: "text",
            attributes: {
              text: "Привет, мир 2!",
              fontSize: "h1",
              bold: true,
            },
            children: [],
          },
          {
            type: "text",
            attributes: {
              text: "Это пример текста для слайда",
            },
            children: [],
          },
          {
            type: "flex",
            attributes: {
              direction: "row",
            },
            children: [
              {
                type: "image",
                attributes: {
                  url: "https://ir-3.ozone.ru/s3/multimedia-x/wc1000/6761494617.jpg",
                  width: 256,
                  height: 256,
                },
                children: [],
              },
              {
                type: "text",
                attributes: {
                  text: "Lorem Ipsum...",
                },
                children: [],
              },
            ],
          },
        ],
      },

      {
        type: "slide",
        attributes: {},
        children: [
          {
            type: "text",
            attributes: {
              text: "Привет, мир 3!",
              fontSize: "h1",
              bold: true,
            },
            children: [],
          },
          {
            type: "text",
            attributes: {
              text: "Это пример текста для слайда",
            },
            children: [],
          },
          {
            type: "flex",
            attributes: {
              direction: "row",
            },
            children: [
              {
                type: "image",
                attributes: {
                  url: "/img.webp",
                  width: 256,
                  height: 256,
                },
                children: [],
              },
              {
                type: "text",
                attributes: {
                  text: "Lorem Ipsum...",
                },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  });

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
    setTimeout(doRender, 100);
  }, []);

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
