import React from "react";

const HelperMessage = ({ title, body }) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("helper clicked");
  };

  return (
    <div className="r w100 p8 bg-1 bs-2">
      <h1>{title}</h1>
      <div>{body}</div>
      <button className="form-button-p font-white" onClick={handleClick}>
        Ok
      </button>
    </div>
  );
};

export default HelperMessage;
