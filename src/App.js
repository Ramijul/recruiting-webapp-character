import { useStore } from "./store.js";
import "./App.css";
import { Character } from "./components/Character.js";

function App() {
  const state = useStore((state) => state);
  console.log(state.characters);
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        {state.characters.map((val, index) => (
          <Character
            key={"character-" + index}
            data={val}
            characterIndex={index}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
