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
      <h3 className="font-semibold">{title}</h3>
      {menuItems.map((item, index) => {
        return (
          <Button
            key={index}
            label={item.label}
            options={{
              styleType: "secondary-transparent",
              buttonClass: "w-full h-10 pl-2",
              labelClass: "ml-1",
              icon: item.icon,
              iconClass: "h-8 w-8",
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
