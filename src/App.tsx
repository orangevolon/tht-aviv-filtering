import { useState } from "react";
import "./App.css";
import { FiltersModal } from "./components/FiltersModal";
import { Filters } from "./types";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const handleApply = (filters: Partial<Filters>) => {
    console.log(filters);
    setIsVisible(false);
  };

  return (
    <div className="App">
      <FiltersModal
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        onApply={handleApply}
      />
      <header className="App-header">Aviv group - Take home assignment</header>
      <main className="App-main">
        <button onClick={() => setIsVisible(true)}>Open filters</button>
      </main>
    </div>
  );
}

export default App;
