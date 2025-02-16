import { LayoutTheme } from "@/components/editor/theme/provider";
import { LucideIcon } from "lucide-react";
import { ComponentType } from "react";
import { KeyMap } from "react-hotkeys";
import { LayoutNode } from "./node";

export interface GlobalHotkeys {
  keymap: KeyMap;
  handlers: {
    [key: string]: (keyEvent?: KeyboardEvent | undefined) => void;
  };
}

export interface NodeHotkeys {
  keymap: KeyMap;
  handlers: {
    [key: string]: (
      node: LayoutNode<any>,
      keyEvent?: KeyboardEvent | undefined
    ) => void;
  };
}

export interface RegistryEntryInfo<T> {
  node: LayoutNodeComponent<T>;
  toolbar?: LayoutNodeToolbarComponent<T>;
  context?: LayoutNodeContextComponent<T>;
  keys?: NodeHotkeys;
}
export type RegistryEntry<T> = RegistryEntryInfo<T> | LayoutNodeComponent<T>;
export type Registry = Record<string, RegistryEntry<any>>;

export interface MenuRegistryEntry {
  generator: () => LayoutNode<any>;
  title: string;
  icon: LucideIcon;
  category: string;
  description?: string;
}
export type MenuRegistry = MenuRegistryEntry[];

export type LayoutNodeAttributes = Record<string, any> | unknown;
export interface LayoutNodeProps<T> {
  node: LayoutNode<T>;
}
export interface LayoutNodeToolbarProps<T> {
  node: LayoutNode<T>;
}
export interface LayoutNodeContextProps<T> {
  node: LayoutNode<T>;
}

export type LayoutNodeComponent<T> = ComponentType<LayoutNodeProps<T>>;
export type LayoutNodeToolbarComponent<T> = ComponentType<
  LayoutNodeToolbarProps<T>
>;
export type LayoutNodeContextComponent<T> = ComponentType<
  LayoutNodeContextProps<T>
>;

export interface LayoutNodeSerialized {
  type: string;
  attributes: Record<string, any>;
  children: LayoutNodeSerialized[];
}

export interface Presentation {
  name: string;
  theme: LayoutTheme;
  content: LayoutNodeSerialized[];
}
