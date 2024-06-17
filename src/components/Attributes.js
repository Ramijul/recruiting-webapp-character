import { ATTRIBUTE_LIST } from "../consts";
import { errorHandlerWrap } from "../store";
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
          }{" "}
          (modifier:{" "}
          {
            state.characters[characterIndex]["attributes"][attributeName][
              "modifier"
            ]
          }
          ) &nbsp;
          <button
            onClick={() =>
              errorHandlerWrap(state.incrementAttribute, [
                characterIndex,
                attributeName,
              ])
            }
          >
            +
          </button>
          <button
            onClick={() =>
              errorHandlerWrap(state.decrementAttribute, [
                characterIndex,
                attributeName,
              ])
            }
          >
            -
          </button>
        </div>
      ))}
    </>
  );
}
