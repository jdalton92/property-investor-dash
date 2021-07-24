import React from "react";
import { OverlayOutsideAlerter } from "../../utils/hooks";

const Overlay = ({ hideWhenDesktop = true }) => {
  return (
    <OverlayOutsideAlerter>
      <div
        className={`fixed z-10 ${
          hideWhenDesktop ? "lg:hidden" : ""
        } w-screen h-screen animate-fade-in left-0 top-0 z-0 bg-gray-800 bg-opacity-70 flex justify-center items-center`}
      ></div>
    </OverlayOutsideAlerter>
  );
};

export default Overlay;
