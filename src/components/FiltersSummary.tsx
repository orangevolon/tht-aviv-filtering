import { FC } from "react";
import { Filters } from "../types";
import { useFilters } from "../contexts/FiltersProvider";

const LABELS: Record<keyof Filters, string> = {
  size: "Size",
  color: "Color",
  minPrice: "Min Price",
  maxPrice: "Max Price",
};

export const FiltersSummary: FC = () => {
  const { filters } = useFilters();

  const fields = Object.entries(filters)
    .filter(([_key, value]) => value !== undefined)
    .map(([key, value]) => `${LABELS[key as keyof Filters]}: ${value}`);

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
