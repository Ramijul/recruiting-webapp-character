import { create } from "zustand";
import { ATTRIBUTE_LIST } from "./consts";
import { produce } from "immer";

/**
 * default attributes
 * @returns
 */
function INIT_ATTRIBUTES() {
  const attributes = {};
  for (let attr of ATTRIBUTE_LIST) {
    attributes[attr] = {
      points: 10,
      modifier: 0, // 0 for 10
    };
  }
  return attributes;
}

/**
 * calculate attribute modifier based on points
 * @param {*} points
 * @returns
 */
function calcModifier(points) {
  const diff = points - 10;
  return diff > 0 ? Math.floor(diff / 2) : diff;
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

        // calculate modifier
        const modifier = calcModifier(points);

        character["attributes"][attributeName] = {
          points,
          modifier,
        };
      })
    ),

  decrementAttribute: (characterInd, attributeName) =>
    set(
      produce((state) => {
        const character = state.characters[characterInd];
        const points = character["attributes"][attributeName]["points"] - 1;

        // calculate modifier
        const modifier = calcModifier(points);

        character["attributes"][attributeName] = {
          points,
          modifier,
        };
      })
    ),
}));
