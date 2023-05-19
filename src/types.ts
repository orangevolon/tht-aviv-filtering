export type Size = "small" | "medium" | "large";

export type Color = "red" | "blue" | "green" | "yellow" | "black" | "white";

export interface Filters {
  size?: Size;
  minPrice?: number;
  maxPrice?: number;
  color?: Color;
}
