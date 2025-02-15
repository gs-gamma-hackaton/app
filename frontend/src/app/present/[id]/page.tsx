"use client";

import { LayoutNode } from "@/lib/editor/node";
import NodePresentationRootRenderer from "./components/renderer";

export default function Home() {
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
    ],
  });

  return <NodePresentationRootRenderer node={root} />;
}
