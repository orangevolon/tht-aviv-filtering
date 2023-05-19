import { render, screen, within } from "@testing-library/react";
import { ComboBox } from "./ComboBox";
import userEvent from "@testing-library/user-event";

describe(`${ComboBox.name}`, () => {
  it("renders the options alongside the default option", () => {
    const options = {
      "1": "one",
      "2": "two",
    };

    render(
      <ComboBox options={options} value={undefined} onChange={() => {}} />
    );

    const select = screen.getByRole("combobox");

    expect(
      within(select).getByRole("option", { name: "No preference" })
    ).toBeInTheDocument();
    expect(
      within(select).getByRole("option", { name: "one" })
    ).toBeInTheDocument();
    expect(
      within(select).getByRole("option", { name: "two" })
    ).toBeInTheDocument();
  });

  it("renders the default option as selected when value is undefined", () => {
    const options = {
      "1": "one",
      "2": "two",
    };

    render(
      <ComboBox options={options} value={undefined} onChange={() => {}} />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("");
  });

  it("renders the selected option as selected when value is defined", () => {
    const options = {
      "1": "one",
      "2": "two",
    };

    render(<ComboBox options={options} value="2" onChange={() => {}} />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("2");
  });

  it("calls onChange with undefined when the default option is selected", () => {
    const options = {
      "1": "one",
      "2": "two",
    };
    const onChange = jest.fn();

    render(<ComboBox options={options} value="2" onChange={onChange} />);

    const select = screen.getByRole("combobox");
    userEvent.selectOptions(select, "1");

    expect(onChange).toHaveBeenCalledWith("1");
  });
});
