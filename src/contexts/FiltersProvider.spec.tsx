import { render, screen } from "@testing-library/react";
import { FiltersProvider, useFilters } from "./FiltersProvider";
import { Filters } from "../types";
import { FC } from "react";
import userEvent from "@testing-library/user-event";

interface TestConsumerProps {
  testFilters?: Partial<Filters>;
}

const TestConsumer: FC<TestConsumerProps> = ({ testFilters = {} }) => {
  const { filters, applyFilters, clearFilters } = useFilters();

  return (
    <>
      <div data-testid="filters-value">{JSON.stringify(filters)}</div>
      <button onClick={() => applyFilters(testFilters)}>Set Filters</button>
      <button onClick={() => clearFilters()}>Clear Filters</button>
    </>
  );
};

describe(`${FiltersProvider.name}`, () => {
  it("should render the children", () => {
    const children = "FiltersProvider children";

    render(
      <FiltersProvider>
        <div>{children}</div>
      </FiltersProvider>
    );

    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('should provide "filters" with default value to the children', () => {
    render(
      <FiltersProvider>
        <TestConsumer />
      </FiltersProvider>
    );

    expect(screen.getByTestId("filters-value")).toHaveTextContent("{}");
  });

  it('should apply filters when "applyFilters" is called', () => {
    const testFilters: Filters = {
      color: "red",
      maxPrice: 100,
      minPrice: 0,
      size: "small",
    };

    // 1. render with default filters
    render(
      <FiltersProvider>
        <TestConsumer testFilters={testFilters} />
      </FiltersProvider>
    );
    expect(screen.getByTestId("filters-value")).toHaveTextContent("{}");

    // 2. set filters
    const setFiltersButton = screen.getByRole("button", {
      name: "Set Filters",
    });
    userEvent.click(setFiltersButton);
    expect(screen.getByTestId("filters-value")).toHaveTextContent(
      JSON.stringify(testFilters)
    );
  });

  it('should clear filters when "clearFilters" is called', () => {
    const testFilters: Filters = {
      color: "red",
      maxPrice: 100,
      minPrice: 0,
      size: "small",
    };

    // 1. render with default filters
    render(
      <FiltersProvider>
        <TestConsumer testFilters={testFilters} />
      </FiltersProvider>
    );
    expect(screen.getByTestId("filters-value")).toHaveTextContent("{}");

    // 2. set filters
    const setFiltersButton = screen.getByRole("button", {
      name: "Set Filters",
    });
    userEvent.click(setFiltersButton);
    expect(screen.getByTestId("filters-value")).toHaveTextContent(
      JSON.stringify(testFilters)
    );

    // 3. clear filters
    const clearFiltersButton = screen.getByRole("button", {
      name: "Clear Filters",
    });
    userEvent.click(clearFiltersButton);
    expect(screen.getByTestId("filters-value")).toHaveTextContent("{}");
  });
});
