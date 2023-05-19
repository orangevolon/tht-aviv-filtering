import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe(`${App.name}`, () => {
  describe("when the app is opened", () => {
    it("should render the app", () => {
      render(<App />);
      const linkElement = screen.getByText(
        /Aviv group - Take home assignment/i
      );
      const button = screen.getByRole("button", { name: "Open filters" });

      expect(linkElement).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });

  describe("when user uses the filters", () => {
    it("should open the filters dialog and show the result", () => {
      render(<App />);
      const button = screen.getByRole("button", { name: "Open filters" });

      userEvent.click(button);

      const modal = screen.getByRole("dialog");
      const sizeInput = within(modal).getByLabelText("Size");
      const minPriceInput = within(modal).getByLabelText("Min Price");
      const maxPriceInput = within(modal).getByLabelText("Max Price");
      const colorInput = within(modal).getByLabelText("Color");
      const submitButton = within(modal).getByRole("button", { name: "Apply" });

      userEvent.selectOptions(sizeInput, "small");
      userEvent.type(minPriceInput, "0");
      userEvent.type(maxPriceInput, "100");
      userEvent.selectOptions(colorInput, "red");
      userEvent.click(submitButton);

      expect(modal).not.toHaveClass("Modal_Container-div--visible");

      expect(screen.getByText("Filters:")).toBeInTheDocument();
      expect(screen.getByText("Size: small")).toBeInTheDocument();
      expect(screen.getByText("Min Price: 0")).toBeInTheDocument();
      expect(screen.getByText("Max Price: 100")).toBeInTheDocument();
      expect(screen.getByText("Color: red")).toBeInTheDocument();
    });
  });

  describe("when user clears the filters", () => {
    it('should render "No filters selected!"', () => {
      render(<App />);
      const openFiltersButton = screen.getByRole("button", {
        name: "Open filters",
      });

      // 1. Open the modal and select some filters
      userEvent.click(openFiltersButton);

      const modal = screen.getByRole("dialog");
      const sizeInput = within(modal).getByLabelText("Size");
      userEvent.selectOptions(sizeInput, "small");

      const applyButton = within(modal).getByRole("button", { name: "Apply" });
      userEvent.click(applyButton);

      expect(modal).not.toHaveClass("Modal_Container-div--visible");
      expect(screen.getByText("Size: small")).toBeInTheDocument();

      // 2. Open the modal again and clear the filters
      userEvent.click(openFiltersButton);

      const clearButton = within(modal).getByRole("button", {
        name: "Clear All",
      });
      userEvent.click(clearButton);

      expect(modal).not.toHaveClass("Modal_Container-div--visible");
      expect(screen.getByText("No filters selected!")).toBeInTheDocument();
    });
  });
});
