import { CSSProperties } from "react";

export type StyleRegistry<T extends string = string> = Record<
  T,
  StyleRegistryValue
>;
interface StyleRegistryValue {
  title: string;
  style: CSSProperties;
  selectStyle?: CSSProperties;
}
