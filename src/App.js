import { errorHandlerWrap, useStore } from "./store.js";
import "./App.css";
import { Character } from "./components/Character.js";
import { useEffect } from "react";

function App() {
  const state = useStore((state) => state);

  // will execute twice in dev mode
  useEffect(() => {
    (async () => {
      await state.initializeState();
    })();
    // eslint-disable-next-line
  }, []);

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
