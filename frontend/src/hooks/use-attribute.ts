import { LayoutNode } from "@/lib/editor/node";
import { StateWithDispatcher } from "@/lib/types";
import { useEffect, useState } from "react";

export default function useAttribute<T, K extends keyof T>(
  node: LayoutNode<T>,
  attribute: K,
  unbound: boolean = false
): StateWithDispatcher<T[K]> {
  const [value, setValue] = useState<T[K]>(node.attributes[attribute]);
  const setAttribute = (value: any) => {
    if (!unbound) node.setAttribute(attribute, value);
    setValue(value);
  };

  useEffect(() => {
    setValue(node.attributes[attribute]);
  }, [node.attributes[attribute]]);

  return [value, setAttribute];
}
