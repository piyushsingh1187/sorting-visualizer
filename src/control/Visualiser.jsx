import React from "react";
import "./Visualiser.css";
function Visualiser({ array }) {
  console.log(array);
  return (
    <div className="array-container">
      {array.map((item, index) => (
        <div key={index} className="bar" style={{ height: `${item}px` }}>
          {item}
        </div>
      ))}
    </div>
  );
}
export default Visualiser;
