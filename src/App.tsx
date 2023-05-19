import { useState } from "react";
import "./App.css";
import { FiltersModal } from "./components/FiltersModal";
import { FiltersSummary } from "./components/FiltersSummary";
import { FiltersProvider } from "./contexts/FiltersProvider";
import { Products } from "./components/Products";

function App() {
  // this preferrably should move into a context
  // so that it's accessbile from everywhere
  // and opening a second modal closes the first one
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="App">
      <FiltersProvider>
        <FiltersModal
          isVisible={isVisible}
          onDismiss={() => setIsVisible(false)}
        />
        <header className="App-header">
          <h1>Aviv group - Take home assignment</h1>
          <FiltersSummary onOpenFilters={() => setIsVisible(true)} />
        </header>
        <main className="App-main">
          <Products />
        </main>
      </FiltersProvider>
    </div>
  );
}

export default App;
