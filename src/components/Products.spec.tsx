import { render, screen } from "@testing-library/react";
import {
  FILTERS_CONTEXT_DEFAULT_VALUE,
  FiltersContext,
} from "../contexts/FiltersProvider";
import { Products } from "./Products";
import { buildProduct } from "../fixtures/products";
import { useFakeProducts } from "../hooks/useFakeProducts";

// this is to override the random fixture generation
jest.mock("../hooks/useFakeProducts");

describe(`${Products.name}`, () => {
  describe("when size filter exists", () => {
    it("should render the filtered products", () => {
      const products = [
        buildProduct({ id: 1, name: "product 1", size: "small" }),
        buildProduct({ id: 2, name: "product 2", size: "large" }),
      ];

      jest.mocked(useFakeProducts).mockReturnValue(products);

      render(
        <FiltersContext.Provider
          value={{
            ...FILTERS_CONTEXT_DEFAULT_VALUE,
            filters: { size: "small" },
          }}
        >
          <Products />
        </FiltersContext.Provider>
      );

      expect(screen.getByText("product 1")).toBeInTheDocument();
      expect(screen.queryByText("product 2")).not.toBeInTheDocument();
    });
  });

  describe("when color filter exists", () => {
    it("should render the filtered products", () => {
      const products = [
        buildProduct({ id: 1, name: "product 1", color: "red" }),
        buildProduct({ id: 2, name: "product 2", color: "blue" }),
      ];

      jest.mocked(useFakeProducts).mockReturnValue(products);

      render(
        <FiltersContext.Provider
          value={{
            ...FILTERS_CONTEXT_DEFAULT_VALUE,
            filters: { color: "red" },
          }}
        >
          <Products />
        </FiltersContext.Provider>
      );

      expect(screen.getByText("product 1")).toBeInTheDocument();
      expect(screen.queryByText("product 2")).not.toBeInTheDocument();
    });
  });

  describe("when minPrice filter exists", () => {
    it("should render the filtered products", () => {
      const products = [
        buildProduct({ id: 1, name: "product 1", price: 50 }),
        buildProduct({ id: 2, name: "product 2", price: 150 }),
      ];

      jest.mocked(useFakeProducts).mockReturnValue(products);

      render(
        <FiltersContext.Provider
          value={{
            ...FILTERS_CONTEXT_DEFAULT_VALUE,
            filters: { minPrice: 100 },
          }}
        >
          <Products />
        </FiltersContext.Provider>
      );

      expect(screen.getByText("product 2")).toBeInTheDocument();
      expect(screen.queryByText("product 1")).not.toBeInTheDocument();
    });
  });

  describe("when maxPrice filter exists", () => {
    it("should render the filtered products", () => {
      const products = [
        buildProduct({ id: 1, name: "product 1", price: 50 }),
        buildProduct({ id: 2, name: "product 2", price: 150 }),
      ];

      jest.mocked(useFakeProducts).mockReturnValue(products);

      render(
        <FiltersContext.Provider
          value={{
            ...FILTERS_CONTEXT_DEFAULT_VALUE,
            filters: { maxPrice: 100 },
          }}
        >
          <Products />
        </FiltersContext.Provider>
      );

      expect(screen.getByText("product 1")).toBeInTheDocument();
      expect(screen.queryByText("product 2")).not.toBeInTheDocument();
    });
  });

  describe("when multiple filters exist", () => {
    it("should render the filtered products", () => {
      const products = [
        buildProduct({ id: 1, name: "product 1", size: "small", color: "red" }),
        buildProduct({
          id: 2,
          name: "product 2",
          size: "large",
          color: "blue",
        }),
        buildProduct({ id: 3, name: "product 3", size: "large", color: "red" }),
        buildProduct({
          id: 4,
          name: "product 4",
          size: "small",
          color: "blue",
        }),
      ];

      jest.mocked(useFakeProducts).mockReturnValue(products);

      render(
        <FiltersContext.Provider
          value={{
            ...FILTERS_CONTEXT_DEFAULT_VALUE,
            filters: { size: "small", color: "red" },
          }}
        >
          <Products />
        </FiltersContext.Provider>
      );

      expect(screen.getByText("product 1")).toBeInTheDocument();
      expect(screen.queryByText("product 2")).not.toBeInTheDocument();
      expect(screen.queryByText("product 3")).not.toBeInTheDocument();
      expect(screen.queryByText("product 4")).not.toBeInTheDocument();
    });
  });

  describe("when no filters exist", () => {
    it("should render all products", () => {
      const products = [
        buildProduct({ id: 1, name: "product 1", size: "small", color: "red" }),
        buildProduct({
          id: 2,
          name: "product 2",
          size: "large",
          color: "blue",
        }),
        buildProduct({ id: 3, name: "product 3", size: "large", color: "red" }),
        buildProduct({
          id: 4,
          name: "product 4",
          size: "small",
          color: "blue",
        }),
      ];

      jest.mocked(useFakeProducts).mockReturnValue(products);

      render(
        <FiltersContext.Provider
          value={{
            ...FILTERS_CONTEXT_DEFAULT_VALUE,
            filters: {},
          }}
        >
          <Products />
        </FiltersContext.Provider>
      );

      expect(screen.getByText("product 1")).toBeInTheDocument();
      expect(screen.getByText("product 2")).toBeInTheDocument();
      expect(screen.getByText("product 3")).toBeInTheDocument();
      expect(screen.getByText("product 4")).toBeInTheDocument();
    });
  });
});
