import React from "react";
import { Icon } from "./Icon";

const Button = ({
  iconUrl,
  iconColor,
  iconHover = false,
  iconActive = false,
  caption,
  extraClass,
  extraStyle,
  onClick,
}) => {
  return (
    <button
      className={`${extraClass} r pt12 pb12 pl4 pr4 flex-row`}
      style={extraStyle}
      onClick={onClick}
    >
      <span>
        <Icon
          url={iconUrl}
          color={iconColor}
          hover={iconHover}
          active={iconActive}
        />
      </span>
      <span>{caption}</span>
    </button>
  );
};

export default Button;
