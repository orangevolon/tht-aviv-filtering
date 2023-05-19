import { buildProducts } from "../fixtures/products";

const testProducts = buildProducts(10);

export const useFakeProducts = () => testProducts;
