import { CLASS_LIST } from "../consts";
import { Attributes } from "./Attributes";
import { ClassDisplay } from "./ClassDisplay";
import { Skills } from "./Skills";

export function Character({ data, characterIndex }) {
  return (
    <div
      style={{
        border: "white",
        borderStyle: "solid",
        borderWidth: "thin",
        margin: "0.1em",
      }}
    >
      <h2>Character - {characterIndex + 1}</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <h3>Attributes</h3>
              <Attributes characterIndex={characterIndex} />
            </td>
            <td>
              <h3>Classes</h3>
              {Object.keys(CLASS_LIST).map((className) => (
                <ClassDisplay
                  key={className}
                  className={className}
                  attributes={data.attributes}
                />
              ))}
            </td>
            <td>
              <h3>Skills</h3>
              <Skills characterIndex={characterIndex} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
