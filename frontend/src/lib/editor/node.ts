import { v4 as uuidv4 } from "uuid";
import { EventDispatcher, EventEmitter } from "../event";
import { containerNodes, fwNodes } from "./registry";
import { LayoutNodeAttributes, LayoutNodeSerialized } from "./types";

export const TreeUpdateEvent = "nodeTreeUpdate";
export const FocusEvent = "nodeFocus";
export const BlurEvent = "nodeBlur";

export type NodeEvent = "nodeTreeUpdate" | "nodeFocus" | "nodeBlur";

interface LayoutNodeOptions {
  selectable: boolean;
  destroyOnEmpty: boolean;
  canHaveChildren: boolean;
  fullWidth: boolean;
}

export class LayoutNode<T extends LayoutNodeAttributes>
  implements LayoutNodeOptions
{
  parent: LayoutNode<unknown> | null = null;

  children: LayoutNode<unknown>[] = [];
  selectable: boolean = true;
  destroyOnEmpty: boolean = false;
  canHaveChildren: boolean = false;
  fullWidth: boolean = false;

  private _id: string;
  private _dispatcher = new EventEmitter();
  private _attributes: T = {} as T;
  private _index: number = -1;
  private _depth: number = 0;

  get id() {
    return this._id;
  }

  get index() {
    return this._index;
  }

  get depth() {
    return this._depth;
  }

  get event() {
    return this._dispatcher as EventDispatcher;
  }

  get attributes(): Readonly<T> {
    return this._attributes;
  }

  constructor(
    public type: string,
    attributes: Partial<T> = {},
    options: Partial<LayoutNodeOptions> = {}
  ) {
    this._id = uuidv4();
    this.set(attributes);
    Object.assign(this, options);
  }

  static from(serialized: LayoutNodeSerialized) {
    const node = new LayoutNode(serialized.type, serialized.attributes);
    node.canHaveChildren = containerNodes.includes(serialized.type);
    node.fullWidth = fwNodes.includes(serialized.type);
    node.children = serialized.children.map((c) => {
      const child = LayoutNode.from(c);
      child.parent = node;
      return child;
    });
    node.recalculateChildrenIndex();
    node.recalculateDepth();
    return node;
  }

  append(child: LayoutNode<unknown>) {
    if (!this.canHaveChildren) throw new Error("Element cannot have children");
    this.configureChild(child, this.children.length);
    this.children = [...this.children, child];
    this.forceUpdate();
  }

  insert(index: number, child: LayoutNode<unknown>) {
    if (!this.canHaveChildren) throw new Error("Element cannot have children");
    this.configureChild(child, index);

    this.children.slice(index).forEach((c) => c._index++);
    this.children = [
      ...this.children.slice(0, index),
      child,
      ...this.children.slice(index),
    ];
    this.recalculateChildrenIndex();
    this.forceUpdate();
  }

  remove(index: number) {
    if (!this.canHaveChildren) throw new Error("Element cannot have children");
    const child = this.children[index];
    this.resetChild(child);

    this.children = [
      ...this.children.slice(0, index),
      ...this.children.slice(index + 1),
    ];
    this.children.forEach((c, i) => (c._index = i));
    this.forceUpdate();

    if (this.children.length == 0 && this.destroyOnEmpty) {
      this.removeSelf();
    }
  }

  removeSelf() {
    if (!this.parent) throw new Error("Element has no parent");
    return this.parent?.remove(this.index);
  }

  moveTo(parent: LayoutNode<any>, index: number) {
    this.removeSelf();
    parent.insert(index, this);
  }

  forceUpdate() {
    const event = new CustomEvent(TreeUpdateEvent, {
      detail: { id: this._id },
    });
    this._dispatcher.dispatchEvent(event);
  }

  setAttribute(key: keyof T, value: any) {
    if (this._attributes[key] === value) return;
    this._attributes[key] = value;
    this.forceUpdate();
  }

  set(attributes: Partial<T>) {
    // @ts-expect-error проблема с типами
    Object.assign(this._attributes, attributes);
    this.forceUpdate();
  }

  focus() {
    const event = new CustomEvent(FocusEvent, {
      detail: { id: this._id },
    });
    this._dispatcher.dispatchEvent(event);
  }

  blur() {
    const event = new CustomEvent(BlurEvent, {
      detail: { id: this._id },
    });
    this._dispatcher.dispatchEvent(event);
  }

  clone() {
    const clone = new LayoutNode<T>(this.type, this._attributes, {
      selectable: this.selectable,
      destroyOnEmpty: this.destroyOnEmpty,
      canHaveChildren: this.canHaveChildren,
    });
    clone.children = this.children.map((c) => {
      const cclone = c.clone();
      cclone.parent = clone;
      return cclone;
    });
    clone.recalculateChildrenIndex();
    return clone;
  }

  serialize(): LayoutNodeSerialized {
    return {
      type: this.type,
      attributes: this._attributes as Record<string, any>,
      children: this.children.map((c) => c.serialize()),
    };
  }

  private configureChild(node: LayoutNode<any>, index: number) {
    node.parent = this;
    node._index = index;
    node.recalculateDepth();
  }

  private resetChild(node: LayoutNode<any>) {
    node.parent = null;
    node._index = -1;
    node.recalculateDepth();
  }

  private recalculateChildrenIndex() {
    this.children.forEach((c, i) => (c._index = i));
  }

  private recalculateDepth() {
    this._depth = this.parent ? this.parent._depth + 1 : 0;
    this.children.forEach((c) => c.recalculateDepth());
  }
}
