import React from "react";
import { ReactSVG } from "react-svg";

const Icon = ({ className, icon }) => {
  return <ReactSVG className={className} src={`./svg/${icon}.svg`} />;
};

export default Icon;
