import { createStore, StateCreator } from "zustand/vanilla";
import * as slides from "./slides";
import * as snapshot from "./snapshot";
import * as util from "./util";

export type StoreSliceCreator<T, K extends T> = (
  initState: T
) => StateCreator<K>;

export type Store = snapshot.SnapshotStore &
  slides.SlidesStore &
  util.UtilStore;
export type StoreState = snapshot.SnapshotState &
  slides.SlidesState &
  util.UtilState;

export const defaultInitState: StoreState = {
  ...snapshot.defaultInitState,
  ...slides.defaultInitState,
  ...util.defaultInitState,
};

export const initGlobalStore = (): StoreState => {
  return {
    ...snapshot.initSnapshotStore(),
    ...slides.initSlidesStore(),
    ...util.initUtilStore(),
  };
};

export const createGlobalStore = (initState: StoreState = defaultInitState) => {
  return createStore<Store>()((...a) => ({
    ...snapshot.createSnapshotSlice(initState)(...a),
    ...slides.createSlidesSlice(initState)(...a),
    ...util.createUtilSlice(initState)(...a),
  }));
};
