import React from "react";
import { ReactSVG } from "react-svg";

const Icon = ({ className, icon }) => {
  return (
    <ReactSVG
      className={className}
      src={require(`../../styles/svg/${icon}.svg`).default}
    />
  );
};

export default Icon;
