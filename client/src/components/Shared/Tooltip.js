import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "./Button";

const Tooltip = ({ message }) => {
  const [show, setShow] = useState(false);

  let timer;
  const handleMouseEvent = (view) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(
      () => {
        setShow(view);
      },
      view ? 250 : 500
    );
  };

  return (
    <div className="relative flex items-center">
      <Button
        label={"?"}
        options={{
          styleType: "secondary",
          buttonClass: "w-4 h-4 rounded-full justify-center",
          onClick: () => handleMouseEvent(true),
          onMouseEnter: () => handleMouseEvent(true),
          onMouseLeave: () => handleMouseEvent(false),
        }}
      />
      {show && (
        <div
          className="right-5 top-0 text-center w-48 z-20 absolute px-2 py-1 rounded-md bg-gray-600 animate-fade-in text-white text-xs"
          onMouseEnter={() => handleMouseEvent(true)}
          onMouseLeave={() => handleMouseEvent(false)}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default connect(null, null)(Tooltip);
