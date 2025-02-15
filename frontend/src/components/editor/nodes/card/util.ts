import { LayoutNode } from "@/lib/editor/node";
import { CSSProperties } from "react";
import { CardAttributes } from ".";
import { useTheme } from "../../theme/provider";
import { StyleRegistry } from "../../util/types";

export type CardSimpleColor = keyof typeof cardSimpleColorRegistry;

export const cardTypeRegistry: StyleRegistry = {
  simple: {
    title: "Простая",
    style: {},
  },
  bullet: {
    title: "Пули",
    style: {},
  },
};

export const cardSimpleColorRegistry: StyleRegistry = {
  black: {
    title: "Черный",
    style: { backgroundColor: "#000000" },
    selectStyle: { color: "#000000" },
  },
  white: {
    title: "Белый",
    style: { backgroundColor: "#ffffff" },
    selectStyle: { color: "#ffffff" },
  },
  gray: {
    title: "Серый",
    style: { backgroundColor: "#808080" },
    selectStyle: { color: "#808080" },
  },
  red: {
    title: "Красный",
    style: { backgroundColor: "#f44444" },
    selectStyle: { color: "#f44444" },
  },
  green: {
    title: "Зеленый",
    style: { backgroundColor: "#5cc97b" },
    selectStyle: { color: "#5cc97b" },
  },
  blue: {
    title: "Синий",
    style: { backgroundColor: "#5e98f1" },
    selectStyle: { color: "#5e98f1" },
  },
  yellow: {
    title: "Желтый",
    style: { backgroundColor: "#f9d933" },
    selectStyle: { color: "#f9d933" },
  },
  orange: {
    title: "Оранжевый",
    style: { backgroundColor: "#ffa44f" },
    selectStyle: { color: "#ffa44f" },
  },
  purple: {
    title: "Фиолетовый",
    style: { backgroundColor: "#b05ef1" },
    selectStyle: { color: "#b05ef1" },
  },
};

export function buildStyle(node: LayoutNode<CardAttributes>): CSSProperties {
  // Вызывается только внутри компонента React, а значит хук вызывать можно
  const theme = useTheme();
  const color = node.attributes.color ?? "blue";

  if (node.attributes.type == "simple") {
    return {
      ...cardSimpleColorRegistry[color].style,
    };
  }
  return {};
}
