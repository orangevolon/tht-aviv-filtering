import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { Filters } from "../types";

export interface FiltersContextType {
  filters: Filters;
  applyFilters: (filters: Filters) => void;
  clearFilters: () => void;
  removeFilter: (key: keyof Filters) => void;
}

export const FILTERS_CONTEXT_DEFAULT_VALUE: FiltersContextType = {
  filters: {},
  applyFilters: () => {},
  clearFilters: () => {},
  removeFilter: () => {},
};

export const FiltersContext = createContext<FiltersContextType>(
  FILTERS_CONTEXT_DEFAULT_VALUE
);

export const FiltersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filters, setFilters] = useState<Partial<Filters>>({});

  const applyFilters = (fields: Filters) => {
    setFilters(fields);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const removeFilter = (key: keyof Filters) => {
    setFilters((filters) => ({
      ...filters,
      [key]: undefined,
    }));
  };

  const value = { filters, applyFilters, clearFilters, removeFilter };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
