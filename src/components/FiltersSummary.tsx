import { FC } from "react";
import { Filters } from "../types";

export interface FiltersSummaryProps {
  filters: Partial<Filters>;
}

const LABELS: Record<keyof Filters, string> = {
  size: "Size",
  color: "Color",
  minPrice: "Min Price",
  maxPrice: "Max Price",
};

export const FiltersSummary: FC<FiltersSummaryProps> = ({ filters }) => {
  const fields = Object.entries(filters)
    .filter(([_key, value]) => Boolean(value))
    .map(([key, value]) => `${LABELS[key]}: ${value}`);

  if (!fields.length) {
    return <h2>No filters selected!</h2>;
  }

  return (
    <section>
      <h2>Filters:</h2>
      <ul>
        {fields.map((field) => (
          <li aria-label="filter" key={field}>
            {field}
          </li>
        ))}
      </ul>
    </section>
  );
};
