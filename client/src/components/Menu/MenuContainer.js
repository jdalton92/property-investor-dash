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

  const handleLink = (link) => {
    setLeftSidebar(false);
    history.push(link);
  };

  return (
    <div className="bg-2 r bs-1 mb12 flex-1 flex-col align-c">
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
          menuItems.map((item, index) => (
            <Button
              key={index}
              extraClass={"button-transp-p align-c"}
              iconColor={"black"}
              iconUrl={item.icon}
              caption={item.title}
              captionClass={"ml4"}
              iconSize={"24px"}
              onClick={() => handleLink(item.link)}
            />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    leftSidebarOpen: state.navigation.sidebarOpen.left,
  };
};

const mapDispatchToProps = {
  setLeftSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
