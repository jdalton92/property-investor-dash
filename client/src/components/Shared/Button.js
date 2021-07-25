import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";

const Button = ({ label, type = "button", options = {} }) => {
  const navLink = options?.navLink || false;
  const route = options?.route;
  const ariaLabel = options?.ariaLabel;
  const ariaPosition = options?.ariaPosition;
  const onClick = options?.onClick;
  const onMouseEnter = options?.onMouseEnter;
  const onMouseLeave = options?.onMouseLeave;
  const icon = options?.icon;
  const buttonClass = options?.buttonClass;
  const iconClass = options?.iconClass;
  const labelClass = options?.labelClass;
  const styleType = options?.styleType;
  const isDisabled = options?.isDisabled;
  const hideShadow = options?.hideShadow;

  let className = `${buttonClass} text-sm transition ease-in duration-200 ${
    hideShadow ? "" : "shadow-lg"
  } focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md leading-7 flex items-center ${
    isDisabled ? "opacity-60 pointer-events-none" : ""
  } `;
  let activeClass;

  switch (styleType) {
    case "primary":
      className = className.concat(
        `text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200`
      );
      activeClass = "bg-indigo-800";
      break;
    case "secondary":
      className = className.concat(
        `text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-400 focus:ring-offset-gray-200`
      );
      activeClass = "bg-gray-700";
      break;
    case "primary-transparent":
      className = className.concat(
        `text-white bg-transparent hover:bg-indigo-400 focus:ring-indigo-500 focus:ring-offset-indigo-200`
      );
      activeClass = "bg-indigo-200 hover:bg-indigo-200";
      break;
    case "secondary-transparent":
      className = className.concat(
        `text-gray-600 hover:bg-gray-200 active:bg-gray-800 focus:ring-gray-200 focus:ring-offset-gray-200`
      );
      activeClass = "bg-indigo-200 hover:bg-indigo-200";
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
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {icon && <Icon className={iconClass} icon={icon} />}
        {label && <span className={labelClass}>{label}</span>}
      </button>
    );
  }
};

export default Button;
