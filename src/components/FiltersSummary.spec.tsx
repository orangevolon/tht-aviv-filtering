import { render, screen } from "@testing-library/react";
import { FiltersSummary } from "./FiltersSummary";

describe(`${FiltersSummary.name}`, () => {
  describe("when no filters are selected", () => {
    it('should render "No filters selected!"', () => {
      render(<FiltersSummary filters={{}} />);

      expect(screen.getByText("No filters selected!")).toBeInTheDocument();
    });
  });

  describe("when filters are selected", () => {
    it("should render the title", () => {
      const filters = {
        size: "small",
      };

      render(<FiltersSummary filters={filters} />);

      expect(screen.getByText("Filters:")).toBeInTheDocument();
    });

    it("should render the filters", () => {
      const filters = {
        size: "small",
        color: "red",
        minPrice: "0",
        maxPrice: "100",
      };

      render(<FiltersSummary filters={filters} />);

      expect(screen.getByText("Size: small")).toBeInTheDocument();
      expect(screen.getByText("Color: red")).toBeInTheDocument();
      expect(screen.getByText("Min Price: 0")).toBeInTheDocument();
      expect(screen.getByText("Max Price: 100")).toBeInTheDocument();
    });
  });

  describe("when some filters have empty values", () => {
    it("should only render filters with values", () => {
      const filters = {
        // Intentionally falsy
        minPrice: "",
        // Selected filters
        size: "small",
        color: "red",
      };

      render(<FiltersSummary filters={filters} />);

      expect(screen.getByText("Size: small")).toBeInTheDocument();
      expect(screen.getByText("Color: red")).toBeInTheDocument();
      expect(screen.queryByText("Min Price:")).not.toBeInTheDocument();
    });
  });
});
