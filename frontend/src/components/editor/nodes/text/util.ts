import { LayoutNode } from "@/lib/editor/node";
import { CSSProperties } from "react";
import { TextAttributes } from ".";
import { useTheme } from "../../theme/provider";
import { StyleRegistry } from "../../util/types";

export type FontSize = keyof typeof fontSizeRegistry;
export type FontColor = keyof typeof fontColorRegistry;

export const fontSizeRegistry: StyleRegistry = {
  h1: {
    title: "Заголовок 1",
    style: { fontSize: "2.5rem", paddingBottom: ".5rem" },
  },
  h2: {
    title: "Заголовок 2",
    style: { fontSize: "2rem", paddingBottom: ".4rem" },
  },
  h3: {
    title: "Заголовок 3",
    style: { fontSize: "1.5rem", paddingBottom: ".2rem" },
    selectStyle: {
      borderBottom: "1px solid black",
      borderRadius: 0,
    },
  },
  text: {
    title: "Текст",
    style: { fontSize: "1rem" },
  },
  "text-lg": {
    title: "Крупный текст",
    style: { fontSize: "1.4rem" },
  },
  "text-sm": {
    title: "Мелкий текст",
    style: { fontSize: "0.7rem" },
  },
};

export const fontColorRegistry: StyleRegistry = {
  auto: {
    title: "Авто",
    style: {},
    selectStyle: {},
  },
  black: {
    title: "Черный",
    style: { color: "#000000" },
    selectStyle: { color: "#000000" },
  },
  white: {
    title: "Белый",
    style: { color: "#ffffff" },
    selectStyle: { color: "#ffffff" },
  },
  gray: {
    title: "Серый",
    style: { color: "#808080" },
    selectStyle: { color: "#808080" },
  },
  red: {
    title: "Красный",
    style: { color: "#f44444" },
    selectStyle: { color: "#f44444" },
  },
  green: {
    title: "Зеленый",
    style: { color: "#5cc97b" },
    selectStyle: { color: "#5cc97b" },
  },
  blue: {
    title: "Синий",
    style: { color: "#5e98f1" },
    selectStyle: { color: "#5e98f1" },
  },
  yellow: {
    title: "Желтый",
    style: { color: "#f9d933" },
    selectStyle: { color: "#f9d933" },
  },
  orange: {
    title: "Оранжевый",
    style: { color: "#ffa44f" },
    selectStyle: { color: "#ffa44f" },
  },
  purple: {
    title: "Фиолетовый",
    style: { color: "#b05ef1" },
    selectStyle: { color: "#b05ef1" },
  },
};

export function buildStyle(node: LayoutNode<TextAttributes>): CSSProperties {
  // Вызывается только внутри компонента React, а значит хук вызывать можно
  const theme = useTheme();

  const fontSize = node.attributes.fontSize ?? "text";
  const color = node.attributes.color ?? "auto";
  const decoration = [
    node.attributes.underline ? "underline" : "",
    node.attributes.strike ? "line-through" : "",
  ].join(" ");

  const isHeading = fontSize.startsWith("h");
  const themeColor = isHeading ? theme.colors.heading : theme.colors.text;
  const themeFont = isHeading ? theme.fonts.heading : theme.fonts.text;

  return {
    ...fontSizeRegistry[fontSize].style,
    ...fontColorRegistry[color].style,
    fontWeight: node.attributes.bold ? 600 : 400,
    fontStyle: node.attributes.italic ? "italic" : "normal",
    textDecoration: decoration.length > 1 ? decoration : "none",
    fontFamily: themeFont,
    color: color == "auto" ? themeColor : color,
    borderColor: theme.colors.primary,
  };
}
