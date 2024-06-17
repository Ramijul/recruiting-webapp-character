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
 * Calculate the total attribute points
 * @param {*} attributes
 * @returns
 */
function calcAttributeTotal(attributes) {
  let sum = 0;

  for (let key in attributes) {
    sum += attributes[key].points;
  }
  return sum;
}

const ATTRIBUTE_TOTAL_CAP = 70;
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
        const attributes = character["attributes"];
        // cap total attribute value
        if (calcAttributeTotal(attributes) + 1 > ATTRIBUTE_TOTAL_CAP) {
          throw new Error("Can't exceed a total of 70");
        }

        const points = attributes[attributeName]["points"] + 1;

        // calculate modifier
        const modifier = calcModifier(points);

        attributes[attributeName] = {
          points,
          modifier,
        };
      })
    ),

  decrementAttribute: (characterInd, attributeName) =>
    set(
      produce((state) => {
        const character = state.characters[characterInd];
        const attributes = character["attributes"];
        const points = attributes[attributeName]["points"] - 1;

        // disallow negative value so that user can't bypass the total attribute value cap
        if (points < 0) {
          throw new Error("Attribute value must be greater than or equal to 0");
        }

        // calculate modifier
        const modifier = calcModifier(points);

        attributes[attributeName] = {
          points,
          modifier,
        };
      })
    ),
}));

// takes a function and an array of params to pass to it
export const errorHandlerWrap = (func, params) => {
  try {
    func(...params);
  } catch (e) {
    alert(e.message);
  }
};
