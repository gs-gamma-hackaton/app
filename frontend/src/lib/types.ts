import { Dispatch, SetStateAction } from "react";

export type StateWithDispatcher<T> = [T, Dispatch<SetStateAction<T>>];
