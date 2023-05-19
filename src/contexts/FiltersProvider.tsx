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
}

export const FILTERS_CONTEXT_DEFAULT_VALUE: FiltersContextType = {
  filters: {},
  applyFilters: () => {},
  clearFilters: () => {},
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

  const value = { filters, applyFilters, clearFilters };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
