import { SKILL_LIST } from "../consts";
import { errorHandlerWrap, useStore } from "../store";

export function Skills({ characterIndex }) {
  const state = useStore((state) => state);

  return (
    <>
      <div>
        Available points to spend:{" "}
        {state.availableSkillPoints -
          state.usedSkillPoints +
          " of " +
          state.availableSkillPoints}
      </div>
      <hr />
      {SKILL_LIST.map((skill) => (
        <div key={skill.name.replace(" ", "_")}>
          {skill.name} - points:{" "}
          {state.characters[characterIndex].skills[skill.name].points} &nbsp;
          <button
            onClick={() =>
              errorHandlerWrap(state.incrementSkills, [
                characterIndex,
                skill.name,
                skill.attributeModifier,
              ])
            }
          >
            +
          </button>
          <button
            onClick={() =>
              errorHandlerWrap(state.decrementSkills, [
                characterIndex,
                skill.name,
                skill.attributeModifier,
              ])
            }
          >
            -
          </button>
          &nbsp; modifier ({skill.attributeModifier}):{" "}
          {
            state.characters[characterIndex].attributes[skill.attributeModifier]
              .modifier
          }{" "}
          total: {state.characters[characterIndex].skills[skill.name]["total"]}
        </div>
      ))}
    </>
  );
}
