import { FC } from "react";
import { Filters } from "../types";
import { useFilters } from "../contexts/FiltersProvider";

const LABELS: Record<keyof Filters, string> = {
  size: "Size",
  color: "Color",
  minPrice: "Min Price",
  maxPrice: "Max Price",
};

export interface FiltersSummaryProps {
  onOpenFilters: () => void;
}

export const FiltersSummary: FC<FiltersSummaryProps> = ({ onOpenFilters }) => {
  const { filters, clearFilters, removeFilter } = useFilters();

  const fields = Object.entries(filters)
    .filter(([_key, value]) => value !== undefined)
    .map(([key, value]) => ({
      key: key as keyof Filters,
      label: LABELS[key as keyof Filters],
      value,
    }));

  const getContent = () => {
    if (!fields.length) {
      return <h2>No filters selected!</h2>;
    }

    return (
      <>
        <h2>Filters:</h2>
        <ul className="Filters_Summary-ul">
          {fields.map(({ key, value, label }) => (
            <li aria-label="filter" key={key}>
              <button onClick={() => removeFilter(key)}>
                {`${label}: ${value}`}
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <section className="Filters_Summary-section">
      <div className="Filters_Summary_Content-div">{getContent()}</div>
      <button onClick={onOpenFilters}>Open filters</button>
      <button onClick={clearFilters}>Clear filters</button>
    </section>
  );
};
