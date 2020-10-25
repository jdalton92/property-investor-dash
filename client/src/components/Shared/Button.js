import React from "react";
import { Icon } from "./Icon";

const Button = ({
  iconUrl = null,
  iconColor,
  iconHover = false,
  iconActive = false,
  iconSize = null,
  iconPos = "left",
  caption,
  extraClass,
  captionClass,
  onClick,
  ariaLabel,
  dataBalloonPos,
  active = false,
}) => {
  return (
    <button
      aria-label={ariaLabel}
      data-balloon-pos={dataBalloonPos}
      className={`${extraClass} r pt12 pb12 pl4 pr4 flex-row`}
      onClick={onClick}
    >
      {iconUrl && iconPos === "left" ? (
        <span>
          <Icon
            size={iconSize}
            url={iconUrl}
            color={iconColor}
            hover={iconHover}
            active={iconActive}
          />
        </span>
      ) : null}
      <span className={captionClass}>{caption}</span>
      {iconUrl && iconPos === "right" ? (
        <span>
          <Icon
            size={iconSize}
            url={iconUrl}
            color={iconColor}
            hover={iconHover}
            active={iconActive}
          />
        </span>
      ) : null}
    </button>
  );
};

export default Button;
