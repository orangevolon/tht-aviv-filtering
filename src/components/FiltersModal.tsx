import { FC, useState } from "react";
import { Modal } from "./Modal";
import { Filters } from "../types";

export interface FiltersModalProps {
  isVisible: boolean;
  onDismiss: () => void;
  onApply: (filters: Partial<Filters>) => void;
}

export const FiltersModal: FC<FiltersModalProps> = ({
  isVisible,
  onDismiss,
  onApply,
}) => {
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filters: Partial<Filters> = {};

    if (size) filters.size = size;
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    if (color) filters.color = color;

    onApply(filters);
  };

  return (
    <Modal title="Filters" isVisible={isVisible} onDismiss={onDismiss}>
      <form className="Filters_Modal-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Size</label>
        <select
          id="name"
          onChange={({ target }) => setSize(target.value)}
          value={size}
        >
          <option value="" disabled>
            No preference
          </option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <label htmlFor="min-price">Min Price</label>
        <input
          id="min-price"
          value={minPrice}
          onChange={({ target }) => setMinPrice(target.value)}
        />

        <label htmlFor="max-price">Max Price</label>
        <input
          id="max-price"
          value={maxPrice}
          onChange={({ target }) => setMaxPrice(target.value)}
        />

        <label htmlFor="color">Color</label>
        <select
          id="color"
          onChange={({ target }) => setColor(target.value)}
          value={color}
        >
          <option value="" disabled>
            No preference
          </option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>

        <div className="Filters_Modal_Buttons">
          <button type="submit">Apply</button>
          <button type="button" onClick={onDismiss}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
