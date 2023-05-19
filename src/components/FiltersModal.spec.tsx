import { render, screen, within } from "@testing-library/react";
import { FiltersModal } from "./FiltersModal";
import userEvent from "@testing-library/user-event";
import { FiltersContext, FiltersProvider } from "../contexts/FiltersProvider";

const DEFAULT_PROPS = {
  isVisible: true,
  onDismiss: () => {},
};

describe(`${FiltersModal.name}`, () => {
  it("should render the modal", () => {
    render(
      <FiltersProvider>
        <FiltersModal {...DEFAULT_PROPS} />
      </FiltersProvider>
    );

    expect(screen.getByRole("dialog")).toHaveClass(
      "Modal_Container-div--visible"
    );
  });

  it("should render modal title", () => {
    render(<FiltersModal {...DEFAULT_PROPS} />);

    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  describe("when form is submitted", () => {
    it("should update the selected filters", () => {
      const onFiltersChange = jest.fn();
      const filters = {
        size: "small",
        minPrice: "0",
        maxPrice: "100",
        color: "red",
      };

      render(
        <FiltersProvider>
          <FiltersContext.Consumer>
            {({ filters }) => onFiltersChange(filters)}
          </FiltersContext.Consumer>
          <FiltersModal {...DEFAULT_PROPS} />
        </FiltersProvider>
      );
      const form = screen.getByRole("form");
      const sizeInput = within(form).getByLabelText("Size");
      const minPriceInput = within(form).getByLabelText("Min Price");
      const maxPriceInput = within(form).getByLabelText("Max Price");
      const colorInput = within(form).getByLabelText("Color");
      const submitButton = within(form).getByRole("button", { name: "Apply" });

      userEvent.selectOptions(sizeInput, filters.size);
      userEvent.type(minPriceInput, filters.minPrice);
      userEvent.type(maxPriceInput, filters.maxPrice);
      userEvent.selectOptions(colorInput, filters.color);
      userEvent.click(submitButton);

      expect(onFiltersChange).toHaveBeenCalledWith({
        size: "small",
        minPrice: 0,
        maxPrice: 100,
        color: "red",
      });
    });
  });

  describe("when form is cleared", () => {
    it('should call "onApply" with an empty object', () => {
      const onFiltersChange = jest.fn();

      render(
        <FiltersProvider>
          <FiltersContext.Consumer>
            {({ filters }) => onFiltersChange(filters)}
          </FiltersContext.Consumer>
          <FiltersModal {...DEFAULT_PROPS} />
        </FiltersProvider>
      );
      const form = screen.getByRole("form");
      const sizeInput = within(form).getByLabelText("Size");
      const applyButton = within(form).getByRole("button", {
        name: "Apply",
      });
      const clearButton = within(form).getByRole("button", {
        name: "Clear All",
      });

      // 1. Select filter and apply
      userEvent.selectOptions(sizeInput, "small");
      userEvent.click(applyButton);

      // 2. Clear filters
      userEvent.click(clearButton);

      expect(onFiltersChange).toHaveBeenNthCalledWith(3, {});
    });
  });
});
