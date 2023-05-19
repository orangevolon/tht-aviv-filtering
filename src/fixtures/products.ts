import { Color, Product, Size } from "../types";

const sizeOptions: Size[] = ["small", "medium", "large"];
const colorOptions: Color[] = ["red", "blue", "green"];

export const buildProduct = (override: Partial<Product> = {}) => {
  const base: Product = {
    id: 1,
    name: "Test Product",
    size: sizeOptions[Math.floor(Math.random() * 3)],
    price: Math.round(Math.random() * 200),
    color: colorOptions[Math.floor(Math.random() * 3)],
  };

  return {
    ...base,
    ...override,
  };
};

export const buildProducts = (count: number) => {
  return Array.from({ length: count }, (_, index) => {
    return buildProduct({ id: index, name: `Product - ${index}` });
  });
};
