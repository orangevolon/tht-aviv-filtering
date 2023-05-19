import { render, screen, within } from "@testing-library/react";
import { FiltersModal } from "./FiltersModal";
import userEvent from "@testing-library/user-event";

const DEFAULT_PROPS = {
  isVisible: true,
  onDismiss: () => {},
  onApply: () => {},
};

describe(`${FiltersModal.name}`, () => {
  it("should render the modal", () => {
    render(<FiltersModal {...DEFAULT_PROPS} />);

    expect(screen.getByRole("dialog")).toHaveClass(
      "Modal_Container-div--visible"
    );
  });

  it("should render modal title", () => {
    render(<FiltersModal {...DEFAULT_PROPS} />);

    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  describe("when form is submitted", () => {
    it('should call "onApply" with the selected filters', () => {
      const onApply = jest.fn();
      const filters = {
        size: "small",
        minPrice: "0",
        maxPrice: "100",
        color: "red",
      };

      render(<FiltersModal {...DEFAULT_PROPS} onApply={onApply} />);
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

      expect(onApply).toHaveBeenCalledWith(filters);
    });

    it("should call onApply with ONLY the selected filters", () => {
      const onApply = jest.fn();
      const filters = {
        size: "small",
        minPrice: "0",
      };

      render(<FiltersModal {...DEFAULT_PROPS} onApply={onApply} />);
      const form = screen.getByRole("form");
      const sizeInput = within(form).getByLabelText("Size");
      const minPriceInput = within(form).getByLabelText("Min Price");
      const submitButton = within(form).getByRole("button", { name: "Apply" });

      userEvent.selectOptions(sizeInput, filters.size);
      userEvent.type(minPriceInput, filters.minPrice);
      userEvent.click(submitButton);

      expect(onApply).toHaveBeenCalledWith(
        expect.not.objectContaining({
          maxPrice: expect.anything(),
          color: expect.anything(),
        })
      );
    });
  });

  describe("when form is cleared", () => {
    it('should call "onApply" with an empty object', () => {
      const onApply = jest.fn();

      render(<FiltersModal {...DEFAULT_PROPS} onApply={onApply} />);
      const form = screen.getByRole("form");
      const sizeInput = within(form).getByLabelText("Size");
      const clearButton = within(form).getByRole("button", {
        name: "Clear All",
      });

      userEvent.selectOptions(sizeInput, "small");
      userEvent.click(clearButton);

      expect(onApply).toHaveBeenCalledWith({});
    });
  });
});
