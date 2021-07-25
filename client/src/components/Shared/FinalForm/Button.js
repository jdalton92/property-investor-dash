import React from "react";
import Icon from "../Icon";

const Button = ({ label, type = "button", options = {} }) => {
  let isDisabled = options.disabled || options.isLoading;
  const isLoading = options?.isLoading || false;
  const onClick = options?.onClick;
  const styleType = options.styleType;
  const iconClass = options?.iconClass;
  const buttonClass = options?.buttonClass;
  let className = `${buttonClass} mt-2 py-1 px-4 text-white transition ease-in duration-200 text-center text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md leading-7 flex justify-center items-center relative ${
    isDisabled ? "opacity-60 pointer-events-none" : ""
  }
    `;

  switch (styleType) {
    case "primary":
      className = className.concat(
        `bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200`
      );
      break;
    case "secondary":
      className = className.concat(
        `bg-gray-500 hover:bg-gray-600 focus:ring-gray-400 focus:ring-offset-gray-200`
      );
      break;
    default:
      return;
  }

  return (
    <button
      type={type}
      className={className}
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading && (
        <Icon icon={"loader"} className={`absolute h-5 w-5 ${iconClass}`} />
      )}
      <span>{label}</span>
    </button>
  );
};

export default Button;
