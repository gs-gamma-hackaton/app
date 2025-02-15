import { LayoutNode } from "@/lib/editor/node";
import {
  CheckCircle,
  CircleAlert,
  CircleHelp,
  CircleX,
  Info,
  LucideIcon,
} from "lucide-react";
import { CSSProperties } from "react";
import { AlertAttributes } from ".";
import { useTheme } from "../../theme/provider";
import { StyleRegistry } from "../../util/types";

export type AlertType = "info" | "success" | "warning" | "error" | "question";

export const alertIconRegistry: Record<AlertType, LucideIcon> = {
  error: CircleX,
  info: Info,
  success: CheckCircle,
  warning: CircleAlert,
  question: CircleHelp,
};

export const alertColorRegistry: StyleRegistry<AlertType> = {
  error: {
    title: "Ошибка",
    style: { backgroundColor: "#ffb3b3" },
    selectStyle: { color: "#ffb3b3" },
  },
  info: {
    title: "Информация",
    style: { backgroundColor: "#b6d6fc" },
    selectStyle: { color: "#b6d6fc" },
  },
  success: {
    title: "Успех",
    style: { backgroundColor: "#b5fcb8" },
    selectStyle: { color: "#b5fcb8" },
  },
  warning: {
    title: "Предупреждение",
    style: { backgroundColor: "#fcf2b5" },
    selectStyle: { color: "#fcf2b5" },
  },
  question: {
    title: "Вопрос",
    style: { backgroundColor: "#d9d9d9" },
    selectStyle: { color: "#d9d9d9" },
  },
};

export const iconColorRegistry: Record<AlertType, string> = {
  error: "#eb0505",
  info: "#006ed6",
  success: "#34a666",
  warning: "#ba9f13",
  question: "#9a9a9a",
};

export function buildStyle(node: LayoutNode<AlertAttributes>): CSSProperties {
  // Вызывается только внутри компонента React, а значит хук вызывать можно
  const theme = useTheme();

  return {
    ...alertColorRegistry[node.attributes.type].style,
  };
}

export function buildIconStyle(
  node: LayoutNode<AlertAttributes>
): CSSProperties {
  return {
    color: iconColorRegistry[node.attributes.type],
  };
}
