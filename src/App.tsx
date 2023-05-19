import { useState } from "react";
import "./App.css";
import { FiltersModal } from "./components/FiltersModal";
import { Filters } from "./types";
import { FiltersSummary } from "./components/FiltersSummary";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [filters, setFilters] = useState<Partial<Filters>>({});

  return (
    <div className="App">
      <FiltersModal
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        onApply={setFilters}
      />
      <header className="App-header">Aviv group - Take home assignment</header>
      <main className="App-main">
        <button onClick={() => setIsVisible(true)}>Open filters</button>
        <FiltersSummary filters={filters} />
      </main>
    </div>
  );
}

export default App;
