import { useState } from "react";
import "./App.css";
import { FiltersModal } from "./components/FiltersModal";
import { FiltersSummary } from "./components/FiltersSummary";
import { FiltersProvider } from "./contexts/FiltersProvider";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="App">
      <FiltersProvider>
        <FiltersModal
          isVisible={isVisible}
          onDismiss={() => setIsVisible(false)}
        />
        <header className="App-header">
          Aviv group - Take home assignment
        </header>
        <main className="App-main">
          <button onClick={() => setIsVisible(true)}>Open filters</button>
          <FiltersSummary />
        </main>
      </FiltersProvider>
    </div>
  );
}

export default App;
