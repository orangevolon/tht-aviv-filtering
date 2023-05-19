export type Size = "small" | "medium" | "large";

export type Color = "red" | "blue" | "green";

export interface Filters {
  size?: Size;
  minPrice?: number;
  maxPrice?: number;
  color?: Color;
}
