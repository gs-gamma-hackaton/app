import { Snapshot } from "@/lib/snapshot";
import { StoreSliceCreator } from ".";

const MAX_SNAPSHOTS = 32;

export type SnapshotState = {
  state: Snapshot[];
  index: number;
};

export type SnapshotActions = {
  push: (snapshot: Snapshot) => void;
  undo: () => Snapshot;
  redo: () => Snapshot;
  reset: () => void;
};

export type SnapshotStore = SnapshotState & SnapshotActions;

export const defaultInitState: SnapshotState = {
  state: [],
  index: -1,
};

export const initSnapshotStore = (): SnapshotState => {
  return { state: [], index: -1 };
};

export const createSnapshotSlice: StoreSliceCreator<
  SnapshotState,
  SnapshotStore
> = (initState = defaultInitState) => {
  return (set) => ({
    ...initState,
    undo: () => {
      let snapshot: Snapshot;
      set((state) => {
        if (state.index < 0) throw new Error("Nothing to undo");
        snapshot = state.state[state.index];
        return { index: state.index - 1 };
      });
      return snapshot!;
    },
    redo: () => {
      let snapshot: Snapshot;
      set((state) => {
        if (state.index >= state.state.length - 1)
          throw new Error("Nothing to redo");
        snapshot = state.state[state.index + 1];
        return { index: state.index + 1 };
      });
      return snapshot!;
    },
    push: (snapshot) =>
      set((state) => {
        let sstate = state.state;
        let targetIndex = state.index + 1;
        sstate.length = state.index + 1;
        sstate.push(snapshot);

        if (sstate.length > MAX_SNAPSHOTS) {
          const needToRemove = sstate.length - MAX_SNAPSHOTS;
          sstate.splice(0, needToRemove);
          targetIndex = state.index;
        }

        return { state: sstate, index: targetIndex };
      }),
    reset: () =>
      set((state) => {
        // Не удалять строку - вызовет утечку памяти (node не будут уничтожаться)
        state.state.length = 0;
        return { state: [], index: -1 };
      }),
  });
};
