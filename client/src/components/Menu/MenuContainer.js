import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../Shared/Button";
import { setLeftSidebar } from "../../reducers/navigationReducer";

const MenuContainer = ({ title, menuItems, setLeftSidebar, extraClass }) => {
  const history = useHistory();

  const handleLink = (link) => {
    if (link.callBack) {
      link.callBack();
    }
    setLeftSidebar(false);
    if (link.external) {
      const win = window.open(link.url, "_blank");
      if (win !== null) {
        win.focus();
      }
    } else {
      history.push(link.url);
    }
  };

  return (
    <div
      className={`${extraClass} shadow-xl rounded-2xl px-4 py-2 bg-white mb-4 flex flex-col`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {menuItems.map((item, index) => {
        const navLink = item.link?.navLink;
        const isExternal = item.link?.external;
        return (
          <Button
            key={index}
            label={item.label}
            options={{
              styleType: "secondary-transparent",
              navLink: navLink,
              route: navLink && !isExternal ? item.link.url : undefined,
              buttonClass: "w-full h-10 pl-2 ml-2",
              labelClass: "ml-2",
              icon: item.icon,
              iconClass: "h-5 w-5",
              onClick: () => handleLink(item.link),
              hideShadow: true,
            }}
          />
        );
      })}
    </div>
  );
};

const mapDispatchToProps = {
  setLeftSidebar,
};

export default connect(null, mapDispatchToProps)(MenuContainer);
