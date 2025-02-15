import { emitEvent, useEvent } from "@/hooks/use-event";
import useForceUpdateOnTreeChange from "@/hooks/use-force-update-on-tree-change";
import useOutsideClick from "@/hooks/use-outside-click";
import { createSelectNode } from "@/lib/editor/helpers";
import { LayoutNode } from "@/lib/editor/node";
import { registry } from "@/lib/editor/registry";
import {
  LayoutNodeComponent,
  LayoutNodeProps,
  NodeHotkeys,
  RegistryEntry,
  RegistryEntryInfo,
} from "@/lib/editor/types";
import { cn } from "@/lib/utils";
import {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { GlobalHotKeys } from "react-hotkeys";
import {
  hotkeysCommon,
  hotkeysGlobal,
  mapHotkeysToLib,
  mergeHotkeys,
} from "./hotkey";
import RendererContextMenu from "./toolbars/renderer-context";
import RendererToolbar from "./toolbars/renderer-toolbar";

import useAttribute from "@/hooks/use-attribute";
import { useActiveSlideId, useGlobalStore } from "../context/store";
import "./nodes.css";
import "./renderer.css";

interface NodeWrapperProps extends PropsWithChildren {
  node: LayoutNode<any>;
  componentInfo: RegistryEntry<any>;
}

interface NodeRootRendererProps extends LayoutNodeProps<any> {
  editable?: boolean;
}

interface NodeSlideWrapperProps extends HTMLAttributes<HTMLDivElement> {
  node: LayoutNode<any>;
}

function isRegistryEntryInfo<T>(
  entry: RegistryEntry<T>
): entry is RegistryEntryInfo<T> {
  return Object.hasOwn(entry, "node");
}
function getNodeComponent<T>(entry: RegistryEntry<T>): LayoutNodeComponent<T> {
  return isRegistryEntryInfo(entry) ? entry.node : entry;
}

function wrapInObserver(callback: IntersectionObserverCallback) {
  return new IntersectionObserver(callback, {
    threshold: Array.from({ length: 11 }, (_, i) => i * 0.1),
  });
}

function NodeWrapper({ node, children, componentInfo }: NodeWrapperProps) {
  const [focused, setFocused] = useState(false);
  const editable = useGlobalStore((state) => state.isEditable);

  const ref = useOutsideClick<HTMLDivElement>(() => {
    if (!editable) return;
    setFocused(false);
    node.blur();
    emitEvent("nodeKeymap", null);
  });

  const Toolbar = isRegistryEntryInfo(componentInfo)
    ? componentInfo.toolbar
    : null;
  const hotkeysCurrent = isRegistryEntryInfo(componentInfo)
    ? componentInfo.keys
    : null;
  const hotkeys = mergeHotkeys(hotkeysCommon, hotkeysCurrent);

  const handleFocus = (e: any) => {
    if (!editable) return;
    e.stopPropagation();
    setFocused(true);

    if (hotkeys) emitEvent("nodeKeymap", mapHotkeysToLib(hotkeys, node));
  };
  const handleDoubleClick = (e: any) => {
    if (!editable) return;
    e.stopPropagation();
    if (!node.canHaveChildren) return;
    const select = createSelectNode();
    setTimeout(() => select.focus(), 0);
    node.append(select);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "node-wrapper relative border-2 border-transparent",
        editable && "hover:border-border",
        focused && "border-blue-500"
      )}
      onClick={handleFocus}
      onFocus={handleFocus}
      onDoubleClick={handleDoubleClick}
      tabIndex={-1}
    >
      {Toolbar && editable && focused && (
        <div className="absolute left-0 top-0 z-10 -mt-2 -translate-y-full">
          <div className="flex items-stretch gap-1 rounded bg-popover p-2 text-sm text-popover-foreground">
            <Toolbar node={node} />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

const NodeRootRenderer = ({ node, editable }: NodeRootRendererProps) => {
  const setEditable = useGlobalStore((state) => state.setEditable);
  useEffect(() => {
    setEditable(editable ?? false);
  }, [editable]);

  return (
    <>
      <NodeKeys />
      <NodeRenderer node={node} />
    </>
  );
};

const NodeKeys = () => {
  const [handlers, setHandlers] = useState<any>();
  const eventData = useEvent<NodeHotkeys | null>("nodeKeymap", null);
  const editable = useGlobalStore((state) => state.isEditable);

  useEffect(() => {
    const target = eventData ?? { handlers: {}, keymap: {} };
    const merged = mergeHotkeys(hotkeysGlobal, target);
    setHandlers(merged);
  }, [eventData]);

  if (!editable) return <></>;
  return (
    <GlobalHotKeys
      keyMap={handlers?.keymap ?? {}}
      handlers={handlers?.handlers ?? {}}
      allowChanges
    />
  );
};

const NodeRenderer: LayoutNodeComponent<any> = ({ node }) => {
  useForceUpdateOnTreeChange(node);
  const editable = useGlobalStore((state) => state.isEditable);

  const componentInfo = registry[node.type];
  if (!componentInfo) {
    return (
      <div className="font-mono text-red-500">
        Unknown node type: {node.type}
      </div>
    );
  }

  const Component = getNodeComponent(componentInfo);
  if (node.type == "fragment") return <Component node={node} />;

  const Element = node.type == "slide" ? NodeSlideWrapper : "div";
  const ContextMenu = editable ? RendererContextMenu : "div";
  return (
    <ContextMenu node={node} className={node.depth <= 1000 ? "w-full" : ""}>
      <Element
        node={node}
        className={cn(
          "node-container relative box-content",
          node.fullWidth && "w-full"
        )}
      >
        {node.selectable && editable && (
          <RendererToolbar
            node={node}
            className="absolute left-0 top-0 -translate-x-full"
          />
        )}
        <NodeWrapper componentInfo={componentInfo} node={node}>
          <Component node={node} />
        </NodeWrapper>
      </Element>
    </ContextMenu>
  );
};

const NodeSlideWrapper: LayoutNodeComponent<any> = ({
  node,
  ...props
}: NodeSlideWrapperProps) => {
  const ref = useRef(null);
  const [active, setActive] = useAttribute(node, "active");
  const activeId = useActiveSlideId();
  const registerSlide = useGlobalStore((state) => state.slidesRegister);
  const unregisterSlide = useGlobalStore((state) => state.slidesUnregister);
  const setSlideVisibility = useGlobalStore((state) => state.slidesSet);

  useEffect(() => {
    setActive(activeId == node.id);
  }, [activeId]);

  useEffect(() => {
    const observer = wrapInObserver(([entry]) => {
      setSlideVisibility(node.id, entry.intersectionRatio);
    });
    if (ref.current) observer.observe(ref.current);

    registerSlide(node);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      unregisterSlide(node.id);
    };
  }, []);

  return <div ref={ref} {...props}></div>;
};

export { NodeRenderer, NodeRootRenderer };
