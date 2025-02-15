import { StoreSliceCreator } from ".";

export type UtilState = {
  isEditable: boolean;
  scaleFactor: number;
  selectedSlide: number;
};

export type UtilActions = {
  setEditable: (value: boolean) => void;
  setScaleFactor: (value: number) => void;
  setSelectedSlide: (value: number) => void;
};

export type UtilStore = UtilState & UtilActions;

export const defaultInitState: UtilState = {
  isEditable: false,
  scaleFactor: 1,
  selectedSlide: 0,
};

export const initUtilStore = (): UtilState => {
  return {
    isEditable: false,
    scaleFactor: 1,
    selectedSlide: 0,
  };
};

export const createUtilSlice: StoreSliceCreator<UtilState, UtilStore> = (
  initState = defaultInitState
) => {
  return (set) => ({
    ...initState,
    setEditable: (value) => {
      set((state) => ({
        isEditable: value,
      }));
    },
    setScaleFactor: (value) => {
      set((state) => ({
        scaleFactor: value,
      }));
    },
    setSelectedSlide: (value) => {
      set((state) => ({
        selectedSlide: value,
      }));
    },
  });
};
