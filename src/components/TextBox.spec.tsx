import { render, screen } from "@testing-library/react";
import { TextBox } from "./TextBox";
import userEvent from "@testing-library/user-event";

describe(`${TextBox.name}`, () => {
  describe('when "type" is "text"', () => {
    it('renders the value when "value" is provided', () => {
      const value = "TextBox value";

      render(<TextBox value={value} onChange={() => {}} type="text" />);

      expect(screen.getByRole("textbox")).toHaveValue(value);
    });

    it("calls onChange with the new value when the value changes", () => {
      const onChange = jest.fn();

      render(<TextBox value={undefined} onChange={onChange} type="text" />);
      const input = screen.getByRole("textbox");
      userEvent.type(input, "new value");

      for (const char of "new value") {
        expect(onChange).toHaveBeenCalledWith(char);
      }
    });

    it("calls onChange with undefined when the value is empty", () => {
      const onChange = jest.fn();

      render(<TextBox value="t" onChange={onChange} type="text" />);
      const input = screen.getByRole("textbox");
      userEvent.type(input, "{backspace}");

      expect(onChange).toHaveBeenCalledWith(undefined);
    });
  });

  describe('when "type" is "number"', () => {
    it('renders the value when "value" is provided', () => {
      const value = 123;

      render(<TextBox value={value} onChange={() => {}} type="number" />);

      expect(screen.getByRole("spinbutton")).toHaveValue(value);
    });

    it("calls onChange with the new value when the value changes", () => {
      const onChange = jest.fn();

      render(<TextBox value={undefined} onChange={onChange} type="number" />);
      const input = screen.getByRole("spinbutton");
      userEvent.type(input, "123");

      expect(onChange).toHaveBeenCalledWith(123);
    });

    it("calls onChange with undefined when the value is empty", () => {
      const onChange = jest.fn();

      render(<TextBox value={1} onChange={onChange} type="number" />);
      const input = screen.getByRole("spinbutton");
      userEvent.type(input, "{backspace}");

      expect(onChange).toHaveBeenCalledWith(undefined);
    });
  });
});
