import { create } from "zustand";
import { ATTRIBUTE_LIST } from "./consts";
import { produce } from "immer";

function INIT_ATTRIBUTES() {
  const attributes = {};
  for (let attr of ATTRIBUTE_LIST) {
    attributes[attr] = {
      points: 10,
    };
  }
  return attributes;
}

/**
 * interface character {
 *  attributes: { [attributeName] : {points: number; modifier: number} },
 *  skills: { [skillName]: {points: number; total: number} }
 * }
 */
export const useStore = create((set) => ({
  characters: [
    {
      attributes: INIT_ATTRIBUTES(),
    },
  ],
  incrementAttribute: (characterInd, attributeName) =>
    set(
      produce((state) => {
        const character = state.characters[characterInd];
        const points = character["attributes"][attributeName]["points"] + 1;

        character["attributes"][attributeName] = {
          points,
          // TODO: add modifier
        };
      })
    ),

  decrementAttribute: (characterInd, attributeName) =>
    set(
      produce((state) => {
        const character = state.characters[characterInd];
        const points = character["attributes"][attributeName]["points"] - 1;
        character["attributes"][attributeName] = {
          points,
          // TODO: add modifier
        };
      })
    ),
}));
