import { AlertAttributes } from "@/components/editor/nodes/alert";
import { CardAttributes } from "@/components/editor/nodes/card";
import { FlexAttributes } from "@/components/editor/nodes/flex";
import { GridAttributes } from "@/components/editor/nodes/grid";
import { ImageAttributes } from "@/components/editor/nodes/image";
import { NodeSelectAttributes } from "@/components/editor/nodes/node-select";
import { SlideAttributes } from "@/components/editor/nodes/slide";
import { TextAttributes } from "@/components/editor/nodes/text";
import { LayoutNode } from "./node";

export const createFragmentNode = () =>
  new LayoutNode<FragmentDirective>("fragment", {}, { canHaveChildren: true });

export const createTextNode = (
  text: string = "",
  attributes: Partial<TextAttributes> = {}
) => new LayoutNode<TextAttributes>("text", { text, ...attributes });

export const createSlideNode = () =>
  new LayoutNode<SlideAttributes>("slide", {}, { canHaveChildren: true });

export const createSelectNode = (depth: number = 0) =>
  new LayoutNode<NodeSelectAttributes>("select", { destroyDepth: depth });

export const createFlexNode = (direction: FlexAttributes["direction"]) =>
  new LayoutNode<FlexAttributes>(
    "flex",
    { direction },
    { canHaveChildren: true }
  );

export const createImageNode = (url: string) =>
  new LayoutNode<ImageAttributes>("image", { url, width: 256, height: 256 });

export const createAlertNode = (type: AlertAttributes["type"]) =>
  new LayoutNode<AlertAttributes>("alert", { type }, { canHaveChildren: true });

export const createGridNode = () =>
  new LayoutNode<GridAttributes>(
    "grid",
    { columns: 2 },
    { canHaveChildren: true }
  );

export const createCardNode = (type: CardAttributes["type"]) =>
  new LayoutNode<CardAttributes>("card", { type }, { canHaveChildren: true });

// == additional helpers ==

export const createFlexWithNodeSelect = (
  direction: FlexAttributes["direction"]
) => {
  const node = createFlexNode(direction);
  const child = createSelectNode(0);
  setTimeout(() => child.focus(), 0);
  node.append(child);
  return node;
};

export const createGridWithNodeSelect = () => {
  const node = createGridNode();
  const child = createSelectNode(0);
  setTimeout(() => child.focus(), 0);
  node.append(child);
  return node;
};

export const createCardWithNodeSelect = (type: CardAttributes["type"]) => {
  const node = createCardNode(type);
  const child = createSelectNode(0);
  setTimeout(() => child.focus(), 0);
  node.append(child);
  return node;
};

export const createFlexWithImage = (url: string) => {
  const image = new LayoutNode<ImageAttributes>("image", { url });
  const container = createFlexNode("row");
  container.append(image);
  setTimeout(() => image.focus(), 0);
  return container;
};

export const createAlertWithText = (type: AlertAttributes["type"]) => {
  const node = createAlertNode(type);
  const container = createFlexNode("column");
  container.selectable = false;

  const child = createTextNode("");
  setTimeout(() => child.focus(), 0);
  container.append(child);
  node.append(container);
  return node;
};
