import { CSSProperties } from "react";
import { ImageAttributes } from ".";
import { StyleRegistry } from "../../util/types";

export const imageSizeRegistry: StyleRegistry = {
  fill: {
    title: "Растянуть",
    style: {},
  },
  cover: {
    title: "Заполнить",
    style: {},
  },
  contain: {
    title: "Вписать",
    style: {},
  },
};

export function buildStyle(attributes: ImageAttributes): CSSProperties {
  return {
    objectFit: attributes.size ?? "fill",
  };
}
