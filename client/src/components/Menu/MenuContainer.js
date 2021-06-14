import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../Shared/Button";
import { setLeftSidebar } from "../../reducers/navigationReducer";

const MenuContainer = ({ title, menuItems, setLeftSidebar }) => {
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
    <div className="shadow-xl rounded-2xl p-4 bg-white mb-4 flex flex-col">
      <h3 className="font-semibold mb-2">{title}</h3>
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
              buttonClass: "w-full h-10 pl-2",
              labelClass: "ml-2",
              icon: item.icon,
              iconClass: "h-5 w-5",
              onClick: () => handleLink(item.link),
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
