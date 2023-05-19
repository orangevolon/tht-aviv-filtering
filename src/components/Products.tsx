import { useMemo } from "react";
import { useFilters } from "../contexts/FiltersProvider";
import { ProductList } from "./ProductList";
import { useFakeProducts } from "../hooks/useFakeProducts";

export const Products = () => {
  const products = useFakeProducts();
  const { filters } = useFilters();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.size && product.size !== filters.size) {
        return false;
      }

      if (filters.color && product.color !== filters.color) {
        return false;
      }

      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }

      return true;
    });
  }, [filters, products]);

  return <ProductList products={filteredProducts} />;
};
