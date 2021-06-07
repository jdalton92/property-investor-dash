import React from "react";
import Icon from "./Icon";

const Button = ({ label, type = "button", options = {} }) => {
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

  switch (styleType) {
    case "primary":
      className = className.concat(`bg-indigo-600 hover:bg-indigo-700
        focus:ring-indigo-500 focus:ring-offset-indigo-200`);
      break;
    case "secondary":
      className = className.concat(`bg-gray-500 hover:bg-gray-600
        focus:ring-gray-400 focus:ring-offset-gray-200`);
      break;
    case "primary-transparent":
      className =
        className.concat(`bg-opacity-10 bg-indigo-900 hover:bg-indigo-700
        focus:ring-indigo-500 focus:ring-offset-indigo-200`);
      break;
    case "secondary-transparent":
      className = className.concat(`bg-opacity-10 bg-gray-900 hover:bg-gray-600
        focus:ring-gray-400 focus:ring-offset-gray-200`);
      break;
    default:
      break;
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      data-balloon-pos={ariaPosition}
      className={`${className}`}
      onClick={onClick}
    >
      {icon && <Icon className={iconClass} icon={icon} />}
      {label && <span className={labelClass}>{label}</span>}
    </button>
  );
};

export default Button;
