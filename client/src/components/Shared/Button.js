import React from "react";
import { Icon } from "./Icon";

const Button = ({
  iconUrl = null,
  iconColor,
  iconHover = false,
  iconActive = false,
  size = null,
  caption,
  extraClass,
  extraStyle,
  onClick,
  ariaLabel,
  dataBalloonPos,
}) => {
  return (
    <button
      aria-label={ariaLabel}
      data-balloon-pos={dataBalloonPos}
      className={`${extraClass} r pt12 pb12 pl4 pr4 flex-row`}
      style={extraStyle}
      onClick={onClick}
    >
      {iconUrl ? (
        <span>
          <Icon
            size={size}
            url={iconUrl}
            color={iconColor}
            hover={iconHover}
            active={iconActive}
          />
        </span>
      ) : null}
      <span>{caption}</span>
    </button>
  );
};

export default Button;
