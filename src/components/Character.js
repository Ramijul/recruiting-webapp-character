import { Attributes } from "./Attributes";

export function Character({ characterIndex }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <h3>Attributes</h3>
            <Attributes characterIndex={characterIndex} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
