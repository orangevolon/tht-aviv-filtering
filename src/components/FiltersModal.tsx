import { FC, useEffect, useState } from "react";
import { Modal } from "./Modal";
import { Color, Filters, Size } from "../types";
import { useFilters } from "../contexts/FiltersProvider";
import { ComboBox } from "./ComboBox";

export interface FiltersModalProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const FiltersModal: FC<FiltersModalProps> = ({
  isVisible,
  onDismiss,
}) => {
  const { filters, applyFilters, clearFilters } = useFilters();

  const [fields, setFields] = useState<Filters>({
    size: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    color: undefined,
  });

  useEffect(() => {
    setFields(filters);
  }, [filters]);

  const setField = <T extends keyof Filters>(key: T, value: Filters[T]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyFilters(fields);
    onDismiss();
  };

  const handleClear = () => {
    clearFilters();
    onDismiss();
  };

  return (
    <Modal title="Filters" isVisible={isVisible} onDismiss={onDismiss}>
      <form
        className="Filters_Modal-form"
        onSubmit={handleSubmit}
        aria-label="filters"
      >
        <label htmlFor="size">Size</label>
        <ComboBox
          id="size"
          value={fields.size}
          onChange={(value) => setField("size", value)}
          options={{
            small: "Small",
            medium: "Medium",
            large: "Large",
          }}
        />

        <label htmlFor="min-price">Min Price</label>
        <input
          id="min-price"
          value={fields.minPrice ?? ""}
          type="number"
          onChange={({ target }) => setField("minPrice", Number(target.value))}
        />

        <label htmlFor="max-price">Max Price</label>
        <input
          id="max-price"
          value={fields.maxPrice ?? ""}
          type="number"
          onChange={({ target }) =>
            setField(
              "maxPrice",
              target.value !== "" ? Number(target.value) : undefined
            )
          }
        />

        <label htmlFor="color">Color</label>
        <ComboBox
          id="color"
          value={fields.color}
          onChange={(value) => setField("color", value)}
          options={{
            red: "red",
            blue: "blue",
            green: "green",
          }}
        />

        <div className="Filters_Modal_Buttons">
          <button type="submit">Apply</button>
          <button type="button" onClick={handleClear}>
            Clear All
          </button>
          <button type="button" onClick={onDismiss}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
