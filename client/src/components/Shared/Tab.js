import React from "react";
import { NavLink } from "react-router-dom";
import { ReactSVG as Icon } from "react-svg";

const Tab = ({ title, to, options = {} }) => {
  const onClick = options?.onClick;
  const icon = options?.icon;
  return (
    <NavLink
      className="flex flex-row w-1/2 justify-center items-center
      text-gray-600 py-4 px-6 block hover:text-blue-500
      focus:outline-none hover:bg-gray-50 rounded-t-lg"
      activeClassName="text-blue-500 border-b-2 font-medium
      border-blue-500 bg-gray-50"
      to={to}
      onClick={onClick}
    >
      <Icon className="h-6 w-6" src={`./svg/${icon}.svg`} />
      <span className={`${icon ? "ml-4" : ""}`}>{title}</span>
    </NavLink>
  );
};

export default Tab;
