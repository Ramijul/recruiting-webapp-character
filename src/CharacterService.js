import { ATTRIBUTE_LIST, SKILL_LIST } from "./consts";

const API_URL = process.env.REACT_APP_API_URL;

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
export function getDefaultCharacter() {
  return {
    attributes: INIT_ATTRIBUTES(),
    skills: INIT_SKILLS(),
    usedSkillPoints: 0,
    availableSkillPoints: 10,
  };
}

export async function fetchCharacters() {
  try {
    const resp = await fetch(API_URL);
    const characters = (await resp.json()).body;

    return Array.isArray(characters) && characters.length
      ? characters
      : [getDefaultCharacter()];
  } catch (e) {
    console.log(e);
    return [getDefaultCharacter()];
  }
}

export async function saveCharacters(characters) {
  try {
    console.log("saving", characters);
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characters),
    });
  } catch (e) {
    console.log("Error saving characters", characters, e);
  }
}
