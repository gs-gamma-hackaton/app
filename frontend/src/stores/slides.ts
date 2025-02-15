import { SlideAttributes } from "@/components/editor/nodes/slide";
import { LayoutNode } from "@/lib/editor/node";
import { StoreSliceCreator } from ".";

export type SlidesState = {
  visibilityRegistry: Map<string, number>;
  slidesRegistry: Map<string, LayoutNode<SlideAttributes>>;
};

export type SlidesActions = {
  slidesSet: (id: string, value: number) => void;
  slidesRegister: (node: LayoutNode<SlideAttributes>) => void;
  slidesUnregister: (id: string) => void;
};

export type SlidesStore = SlidesState & SlidesActions;

export const defaultInitState: SlidesState = {
  visibilityRegistry: new Map(),
  slidesRegistry: new Map(),
};

export const initSlidesStore = (): SlidesState => {
  return {
    visibilityRegistry: new Map(),
    slidesRegistry: new Map(),
  };
};

export const createSlidesSlice: StoreSliceCreator<SlidesState, SlidesStore> = (
  initState = defaultInitState
) => {
  return (set) => ({
    ...initState,
    slidesSet: (id, value) => {
      set((state) => ({
        visibilityRegistry: new Map(state.visibilityRegistry).set(id, value),
      }));
    },
    slidesRegister: (node) => {
      set((state) => ({
        slidesRegistry: new Map(state.slidesRegistry).set(node.id, node),
      }));
    },
    slidesUnregister: (id) => {
      set((state) => {
        const map = new Map(state.slidesRegistry);
        map.delete(id);
        return {
          slidesRegistry: map,
        };
      });
    },
  });
};
