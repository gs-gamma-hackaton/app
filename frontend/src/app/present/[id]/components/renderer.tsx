import { hotkeyPresentation } from "@/components/editor/hotkey";
import { NodeRootRenderer } from "@/components/editor/renderer";
import { LayoutNode } from "@/lib/editor/node";
import { GlobalHotKeys } from "react-hotkeys";

function NodePresentationKeys() {
  return (
    <GlobalHotKeys
      keyMap={hotkeyPresentation.keymap}
      handlers={hotkeyPresentation.handlers}
    />
  );
}

export default function NodePresentationRootRenderer({
  node,
}: {
  node: LayoutNode<any>;
}) {
  return (
    <>
      <NodeRootRenderer node={node} />
      <NodePresentationKeys />
    </>
  );
}
