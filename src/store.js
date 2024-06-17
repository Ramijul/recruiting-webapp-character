import { create } from "zustand";
import { ATTRIBUTE_LIST, SKILL_LIST } from "./consts";
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
 * default skills
 * @returns
 */
function INIT_SKILLS() {
  const skills = {};
  for (let skill of SKILL_LIST) {
    skills[skill.name] = {
      points: 0,
      total: 0,
    };
  }
  return skills;
}

/**
 * default character
 * @returns
 */
function getDefaultCharacter() {
  return {
    attributes: INIT_ATTRIBUTES(),
    skills: INIT_SKILLS(),
    usedSkillPoints: 0,
    availableSkillPoints: calcAvailableSkillPoints(0),
  };
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

/**
 * Calcualte spendable points on skills based on Intelligence Modifier
 * @param {*} intelligenceModifier
 * @returns
 */
function calcAvailableSkillPoints(intelligenceModifier) {
  return intelligenceModifier < -2 ? 0 : 10 + intelligenceModifier * 4;
}

/**
 * Update skill total for all skills whose attributeModifier has been updated
 * @param {*} character
 * @param {*} modifier
 * @param {*} attributeModifier
 */
function updateSkillTotal(character, modifier, attributeModifier) {
  const skillsToUpdate = SKILL_LIST.filter(
    (s) => s.attributeModifier === attributeModifier
  ).map((s) => s.name);

  for (let s of skillsToUpdate) {
    character["skills"][s]["total"] =
      character["skills"][s]["points"] + modifier;
  }
}

/**
 * Attribute total cap
 */
const ATTRIBUTE_TOTAL_CAP = 70;

/**
 * interface character {
 *  attributes: { [attributeName] : {points: number; modifier: number} },
 *  skills: { [skillName]: {points: number; total: number} }
 * }
 *
 * TODO: move create to context so that state can be initialized when
 * app loads and data is fetched from rest api
 */
export const useStore = create((set) => ({
  characters: [getDefaultCharacter()],

  addNewCharacter: () =>
    set(
      produce((state) => {
        state.characters.push(getDefaultCharacter());
      })
    ),

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

        //update attribute
        attributes[attributeName] = {
          points,
          modifier,
        };

        // update skill points to spend
        if (attributeName === "Intelligence") {
          character.availableSkillPoints = calcAvailableSkillPoints(modifier);
        }

        //update skill total of all skills that has the current attribute as its modifier
        updateSkillTotal(character, modifier, attributeName);
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

        //update skill points to spend
        if (attributeName === "Intelligence") {
          const availablePoints = calcAvailableSkillPoints(modifier);

          // decreasing intelligence will result in a lower availableSkillPoints
          // availableSkillPoints can't be lower than the already used up points
          if (availablePoints < character.usedSkillPoints) {
            throw new Error(
              "You must undo some of the distributed skill points before you decreasing Intelligence."
            );
          }

          // its ok to update the availableSkillPoints otherwise
          character.availableSkillPoints = availablePoints;
        }

        attributes[attributeName] = {
          points,
          modifier,
        };

        //update skill total of all skills that has the current attribute as its attributeModifier
        updateSkillTotal(character, modifier, attributeName);
      })
    ),

  incrementSkills: (characterInd, skillName, attributeModifier) =>
    set(
      produce((state) => {
        const character = state.characters[characterInd];

        // do not allow distributing more points than allocated
        if (character.usedSkillPoints + 1 > character.availableSkillPoints) {
          throw new Error("No more points available to spend");
        }

        const skills = character["skills"];

        const points = skills[skillName]["points"] + 1;
        const total =
          character["attributes"][attributeModifier]["modifier"] + points;

        skills[skillName] = { points, total };

        // update used skill points
        character.usedSkillPoints++;
      })
    ),

  decrementSkills: (characterInd, skillName, attributeModifier) =>
    set(
      produce((state) => {
        const character = state.characters[characterInd];
        const skills = character["skills"];

        const points = skills[skillName]["points"] - 1;

        // neither skills points nor usedSkillPoints can go below 0
        // checking points will suffice
        if (points < 0) {
          throw new Error("Skill points can't be below 0");
        }

        const total =
          character["attributes"][attributeModifier]["modifier"] + points;

        skills[skillName] = { points, total };

        // update used skill points
        character.usedSkillPoints--;
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
