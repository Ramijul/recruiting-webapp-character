import { errorHandlerWrap, useStore } from "./store.js";
import "./App.css";
import { Character } from "./components/Character.js";

function App() {
  const state = useStore((state) => state);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div style={{ marginBottom: "10px" }}>
          <button onClick={() => errorHandlerWrap(state.addNewCharacter, [])}>
            Add Character
          </button>
        </div>

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
