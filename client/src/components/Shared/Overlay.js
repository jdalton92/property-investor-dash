import React from "react";
import { OverlayOutsideAlerter } from "../../utils/hooks";

const Overlay = (props) => {
  return (
    <OverlayOutsideAlerter>
      <div className="w-screen h-screen animate-fade-in fixed left-0 top-0 z-40 bg-gray-800 bg-opacity-70 flex justify-center items-center">
        {props.children}
      </div>
    </OverlayOutsideAlerter>
  );
};

export default Overlay;
