import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";

const Button = ({ label, type = "button", options = {} }) => {
  const navLink = options?.navLink || false;
  const route = options?.route;
  const ariaLabel = options?.ariaLabel;
  const ariaPosition = options?.ariaPosition;
  const onClick = options?.onClick;
  const icon = options?.icon;
  const buttonClass = options?.buttonClass;
  const iconClass = options?.iconClass;
  const labelClass = options?.labelClass;
  const styleType = options?.styleType;
  const isDisabled = options?.isDisabled;

  let className = `${buttonClass} text-white transition ease-in
    duration-200 text-base shadow-lg focus:outline-none
    focus:ring-2 focus:ring-offset-2 rounded-md leading-7 flex
    items-center ${isDisabled ? "opacity-60 pointer-events-none" : ""} `;
  let activeClass;

  switch (styleType) {
    case "primary":
      className = className.concat(`bg-indigo-600 hover:bg-indigo-700
        focus:ring-indigo-500 focus:ring-offset-indigo-200`);
      activeClass = "bg-indigo-800";
      break;
    case "secondary":
      className = className.concat(`bg-gray-500 hover:bg-gray-600
        focus:ring-gray-400 focus:ring-offset-gray-200`);
      activeClass = "bg-gray-700";
      break;
    case "primary-transparent":
      className =
        className.concat(`bg-opacity-20 bg-indigo-900 hover:bg-indigo-700
        focus:ring-indigo-500 focus:ring-offset-indigo-200`);
      activeClass = "bg-opacity-50 bg-indigo-900";
      break;
    case "secondary-transparent":
      className = className.concat(`bg-opacity-20 bg-gray-900 hover:bg-gray-600
        focus:ring-gray-400 focus:ring-offset-gray-200`);
      activeClass = "bg-opacity-50 bg-gray-900";
      break;
    default:
      break;
  }

  if (navLink) {
    return (
      <NavLink
        exact
        className={className}
        activeClassName={activeClass}
        to={route}
        aria-label={ariaLabel}
        data-balloon-pos={ariaPosition}
        onClick={onClick}
      >
        {icon && <Icon className={iconClass} icon={icon} />}
        {label && <span className={labelClass}>{label}</span>}
      </NavLink>
    );
  } else {
    return (
      <button
        type={type}
        aria-label={ariaLabel}
        data-balloon-pos={ariaPosition}
        className={className}
        onClick={onClick}
      >
        {icon && <Icon className={iconClass} icon={icon} />}
        {label && <span className={labelClass}>{label}</span>}
      </button>
    );
  }
};

export default Button;
