import React, { useState } from "react";
import { connect } from "react-redux";

const Tooltip = ({ message, extraClass }) => {
  const [show, setShow] = useState(false);

  let timer;
  const handleMousEvent = (view) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(
      () => {
        setShow(view);
      },
      view ? 250 : 500
    );
  };

  return (
    <div className={`tooltip-container ml8 mb8 ${extraClass}`}>
      {show && (
        <div
          className="tooltip-msg absolute bg-black r p8 font-white white text-center fade-in"
          onMouseEnter={() => handleMousEvent(true)}
          onMouseLeave={() => handleMousEvent(false)}
        >
          {message}
        </div>
      )}
      <button
        type="button"
        className="tooltip-btn bs-2 flex-row align-c"
        onClick={() => handleMousEvent(true)}
        onMouseEnter={() => handleMousEvent(true)}
        onMouseLeave={() => handleMousEvent(false)}
      >
        <span className="f10">?</span>
      </button>
    </div>
  );
};

export default connect(null, null)(Tooltip);
