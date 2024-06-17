import { ATTRIBUTE_LIST } from "../consts";
import { useStore } from "../store";

export function Attributes({ characterIndex }) {
  const state = useStore((state) => state);

  return (
    <>
      {ATTRIBUTE_LIST.map((attributeName) => (
        <div key={attributeName}>
          {attributeName}:{" "}
          {
            state.characters[characterIndex]["attributes"][attributeName][
              "points"
            ]
          }
          &nbsp;
          <button
            onClick={() =>
              state.incrementAttribute(characterIndex, attributeName)
            }
          >
            +
          </button>
          <button
            onClick={() =>
              state.decrementAttribute(characterIndex, attributeName)
            }
          >
            -
          </button>
        </div>
      ))}
    </>
  );
}
