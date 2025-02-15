import { LayoutNode } from "@/lib/editor/node";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export interface NodeContextDetail<T> {
  node?: LayoutNode<T>;
  setNode: (value: LayoutNode<T> | undefined) => void;
}

const NodeContext = createContext<NodeContextDetail<any>>({
  setNode: () => {},
});

export const NodeContextProvider = ({ children }: PropsWithChildren) => {
  const [node, setNode] = useState<LayoutNode<any>>();

  return (
    <NodeContext.Provider
      value={{
        node,
        setNode,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

export const useNodeContext = () => {
  return useContext(NodeContext);
};
