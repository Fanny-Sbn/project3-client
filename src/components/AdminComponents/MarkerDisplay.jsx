import React from "react";
/* import "../../styles/pdvDisplay.css";
 */
const pdvDisplay = ({ pdv, handleClose }) => {
  console.log(pdv)
  return (
    <div className="pdv-container">
      <p onClick={handleClose} className="close-link">
        Close
      </p>
      <h2 className="title">{pdv.name}</h2>
      <p className="location">{pdv.location.formattedAddress}</p>
    </div>
  );
};

export default pdvDisplay;
