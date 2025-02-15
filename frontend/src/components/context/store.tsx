"use client";

import { createGlobalStore, initGlobalStore, Store } from "@/stores";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useStore } from "zustand";

export type StoreApi = ReturnType<typeof createGlobalStore>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface StoreProviderProps {
  children: ReactNode;
}

export let globalStore: StoreApi;

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store] = useState(() => createGlobalStore(initGlobalStore()));
  useEffect(() => {
    globalStore = store;
  }, []);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useGlobalStore = <T,>(selector: (store: Store) => T): T => {
  const storeContext = useContext(StoreContext);
  if (!storeContext) {
    throw new Error(`useGlobalStore must be used within StoreProvider`);
  }
  return useStore(storeContext, selector);
};

export const useSnapshotBounds = () => {
  const state = useGlobalStore((state) => state.state);
  const index = useGlobalStore((state) => state.index);

  const canUndo = useMemo(() => index >= 0, [index]);
  const canRedo = useMemo(() => index < state.length - 1, [state, index]);

  return { canUndo, canRedo };
};

export const useActiveSlideId = () => {
  const registry = useGlobalStore((state) => state.visibilityRegistry);

  const maxSlideId = useMemo(() => {
    if (registry.size == 0) return null;
    return registry
      .keys()
      .reduce((a, b) => (registry.get(a)! > registry.get(b)! ? a : b));
  }, [registry]);
  return maxSlideId;
};

export const useActiveSlide = () => {
  const activeSlideId = useActiveSlideId();
  const slides = useGlobalStore((s) => s.slidesRegistry);
  const slide = useMemo(() => {
    if (!activeSlideId) return null;
    return slides.get(activeSlideId);
  }, [activeSlideId, slides]);
  return slide;
};
