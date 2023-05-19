import { render, screen } from "@testing-library/react";
import { FiltersSummary } from "./FiltersSummary";
import {
  FILTERS_CONTEXT_DEFAULT_VALUE,
  FiltersContext,
} from "../contexts/FiltersProvider";
import { Filters } from "../types";
import userEvent from "@testing-library/user-event";

describe(`${FiltersSummary.name}`, () => {
  describe("when no filters are selected", () => {
    it('should render "No filters selected!"', () => {
      render(<FiltersSummary onOpenFilters={() => {}} />);

      expect(screen.getByText("No filters selected!")).toBeInTheDocument();
    });
  });

  describe("when filters are selected", () => {
    it("should render the title", () => {
      const filters: Filters = {
        size: "small",
      };

      render(
        <FiltersContext.Provider
          value={{ ...FILTERS_CONTEXT_DEFAULT_VALUE, filters }}
        >
          <FiltersSummary onOpenFilters={() => {}} />
        </FiltersContext.Provider>
      );

      expect(screen.getByText("Filters:")).toBeInTheDocument();
    });

    it("should render the filters", () => {
      const filters: Filters = {
        size: "small",
        color: "red",
        minPrice: 0,
        maxPrice: 100,
      };

      render(
        <FiltersContext.Provider
          value={{ ...FILTERS_CONTEXT_DEFAULT_VALUE, filters }}
        >
          <FiltersSummary onOpenFilters={() => {}} />
        </FiltersContext.Provider>
      );

      expect(screen.getByText("Size: small")).toBeInTheDocument();
      expect(screen.getByText("Color: red")).toBeInTheDocument();
      expect(screen.getByText("Min Price: 0")).toBeInTheDocument();
      expect(screen.getByText("Max Price: 100")).toBeInTheDocument();
    });
  });

  describe("when some filters have empty values", () => {
    it("should only render filters with values", () => {
      const filters: Filters = {
        // Should not render these
        maxPrice: undefined,

        // Should render these
        minPrice: 0,
        size: "small",
        color: "red",
      };

      render(
        <FiltersContext.Provider
          value={{ ...FILTERS_CONTEXT_DEFAULT_VALUE, filters }}
        >
          <FiltersSummary onOpenFilters={() => {}} />
        </FiltersContext.Provider>
      );

      expect(screen.getByText("Size: small")).toBeInTheDocument();
      expect(screen.getByText("Color: red")).toBeInTheDocument();
      expect(screen.getByText("Min Price: 0")).toBeInTheDocument();
      expect(screen.queryByText("Max Price:")).not.toBeInTheDocument();
    });
  });

  describe("when user clicks on a filter", () => {
    it("should remove the filter", () => {
      const filters: Filters = {
        size: "small",
        color: "red",
      };
      const removeFilter = jest.fn();

      render(
        <FiltersContext.Provider
          value={{ ...FILTERS_CONTEXT_DEFAULT_VALUE, filters, removeFilter }}
        >
          <FiltersSummary onOpenFilters={() => {}} />
        </FiltersContext.Provider>
      );

      const sizeFilter = screen.getByText("Size: small");
      const colorFilter = screen.getByText("Color: red");

      expect(sizeFilter).toBeInTheDocument();
      expect(colorFilter).toBeInTheDocument();

      // Remove the filters
      userEvent.click(sizeFilter);

      expect(removeFilter).toHaveBeenCalledTimes(1);
      expect(removeFilter).toHaveBeenCalledWith("size");
    });
  });
});
