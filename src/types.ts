export type Size = "small" | "medium" | "large";

export type Color = "red" | "blue" | "green";

export interface Filters {
  size?: Size;
  minPrice?: number;
  maxPrice?: number;
  color?: Color;
}

export interface Product {
  id: number;
  name: string;
  size: Size;
  price: number;
  color: Color;
}
