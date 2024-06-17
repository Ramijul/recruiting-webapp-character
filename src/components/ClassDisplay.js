import { useState } from "react";
import { CLASS_LIST } from "../consts";

export function ClassDisplay({ attributes, className }) {
  const [show, setShow] = useState(false);

  /**
   * check if character meets the class minimums
   * @returns true if conditions are met, otherwise false
   */
  const belongsToClass = () => {
    for (let attr in attributes) {
      // if any one of attribute values is lower than the Class Minimum return false
      if (CLASS_LIST[className][attr] > attributes[attr]["points"]) {
        return false;
      }
    }
    // belongs to the class
    return true;
  };

  return (
    <div
      style={{
        border: "white",
        borderStyle: "solid",
        borderWidth: "thin",
        margin: "0.1em",
        ...(belongsToClass() ? { backgroundColor: "green" } : {}),
      }}
      onClick={() => setShow(!show)}
    >
      <span>{className}</span>
      {/* toggle between hide and show of class minimums on click */}
      {show && (
        <div>
          <hr />
          {Object.keys(CLASS_LIST[className]).map((attr) => (
            <div key={className + "-" + attr}>
              {attr}: {CLASS_LIST[className][attr]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
