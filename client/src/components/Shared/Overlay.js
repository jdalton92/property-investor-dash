import React from "react";
import { OverlayOutsideAlerter } from "../../helpers/hooks";

const Overlay = () => {
  return (
    <OverlayOutsideAlerter>
      <div className="overlay fade-in" />
    </OverlayOutsideAlerter>
  );
};

export default Overlay;
