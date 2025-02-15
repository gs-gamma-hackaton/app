import { LayoutNode } from "@/lib/editor/node";
import { GlobalHotkeys, NodeHotkeys } from "@/lib/editor/types";
import { apply } from "@/lib/snapshot";
import { globalStore } from "../context/store";
import { performAction, tryPerformAction } from "./action";

export const hotkeysGlobal: GlobalHotkeys = {
  keymap: {
    undo: {
      name: "Отменить",
      description: "Ctrl+Z",
      action: "keydown",
      sequence: "ctrl+z",
    },
    redo: {
      name: "Вернуть",
      description: "Ctrl+Y",
      action: "keydown",
      sequence: "ctrl+y",
    },
  },
  handlers: {
    undo: () => {
      const state = globalStore.getState();
      const canUndo = state.index >= 0;
      if (!canUndo) return;
      const snapshot = state.undo();
      apply(snapshot);
    },
    redo: () => {
      const state = globalStore.getState();
      const canRedo = state.index < state.state.length - 1;
      if (!canRedo) return;
      const snapshot = state.redo();
      apply(snapshot, true);
    },
  },
};

export const hotkeyPresentation: GlobalHotkeys = {
  keymap: {
    prev: ["left"],
    next: ["right", "space"],
  },
  handlers: {
    prev: () => {
      const state = globalStore.getState();
      const canPrev = state.selectedSlide >= 0;
      if (!canPrev) return;
      state.setSelectedSlide(state.selectedSlide - 1);
    },
    next: () => {
      const state = globalStore.getState();
      const canNext = state.selectedSlide < state.slidesRegistry.size - 1;
      if (!canNext) return;
      state.setSelectedSlide(state.selectedSlide + 1);
    },
  },
};

export const hotkeysCommon: NodeHotkeys = {
  keymap: {
    new: {
      name: "Создать элемент",
      description: "⇧A",
      action: "keydown",
      sequence: "shift+a",
    },
    duplicate: {
      name: "Дублировать",
      description: "⇧D",
      action: "keydown",
      sequence: "shift+d",
    },
    delete: {
      name: "Удалить",
      description: "Del",
      action: "keydown",
      sequence: "del",
    },
    moveUp: {
      name: "Переместить выше/ниже",
      description: "↑↓",
      action: "keydown",
      sequence: "up",
    },
    moveInto: {
      name: "На уровень выше/ниже",
      description: "←→",
      action: "keydown",
      sequence: "right",
    },
    moveDown: "down",
    moveOut: "left",
  },
  handlers: {
    new: (node) => performAction(node, "createInOrNear"),
    duplicate: (node) => performAction(node, "duplicate"),
    delete: (node) => performAction(node, "delete"),
    moveUp: (node) => tryPerformAction(node, "moveUp"),
    moveDown: (node) => tryPerformAction(node, "moveDown"),
    moveInto: (node) => tryPerformAction(node, "moveInsideDown"),
    moveOut: (node) => tryPerformAction(node, "moveOutside"),
  },
};

export const mergeHotkeys = (
  ...hotkeys: (NodeHotkeys | GlobalHotkeys | null | undefined)[]
): any => {
  // @ts-expect-error проблемы с типами для GlobalHotkeys
  return hotkeys.reduce((acc, hotkey) => {
    if (acc == null) {
      acc = {
        keymap: {},
        handlers: {},
      };
    }
    if (hotkey == null) return acc;
    return {
      keymap: { ...acc.keymap, ...hotkey.keymap },
      handlers: { ...acc.handlers, ...hotkey.handlers },
    };
  });
};

export const mapHotkeysToLib = (
  hotkeys: NodeHotkeys,
  node: LayoutNode<any>
) => {
  return {
    keymap: hotkeys.keymap,
    handlers: objectMap(
      hotkeys.handlers,
      (cb: NodeHotkeys["handlers"][0]) => (e: any) => cb(node, e)
    ),
  };
};

function objectMap(object: any, mapFn: any) {
  return Object.keys(object).reduce(function (result, key) {
    // @ts-expect-error проблемы с типами
    result[key] = mapFn(object[key]);
    return result;
  }, {});
}
