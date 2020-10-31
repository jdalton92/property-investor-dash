import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../Shared/Button";
import { setLeftSidebar } from "../../reducers/navigationReducer";
import ExpandIcon from "../../styles/svg/expand.svg";
import CollapseIcon from "../../styles/svg/collapse.svg";

const MenuContainer = ({ title, menuItems, setLeftSidebar }) => {
  const [expand, setExpand] = useState(true);
  const history = useHistory();

  const handleClick = (link) => {
    if (link.callBack) link.callBack();
    handleLink(link.internal, link.url);
  };

  const handleLink = (internal, url) => {
    setLeftSidebar(false);
    if (internal) {
      history.push(url);
    } else {
      const win = window.open(url, "_blank");
      if (win !== null) {
        win.focus();
      }
    }
  };

  return (
    <div className="bg-1 r bs-1 mb12 flex-1 flex-col align-c">
      <div className="flex-row w100">
        <Button
          iconSize={"20px"}
          extraClass={"button-transp-p align-c flex-1"}
          captionClass={"ml8 bold f16"}
          onClick={() => setExpand(!expand)}
          iconUrl={expand ? CollapseIcon : ExpandIcon}
          iconColor={"black"}
          caption={title}
        />
      </div>
      <div className="flex-col pl24 w100">
        {expand &&
          menuItems.map((item, index) => {
            return (
              <Button
                key={index}
                extraClass={"button-transp-p align-c"}
                iconColor={"black"}
                iconUrl={item.icon}
                caption={item.title}
                captionClass={"ml8"}
                iconSize={"24px"}
                onClick={() => handleClick(item.link)}
              />
            );
          })}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setLeftSidebar,
};

export default connect(null, mapDispatchToProps)(MenuContainer);
