import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../Shared/Button";
import ExpandIcon from "../../styles/svg/expand.svg";
import CollapseIcon from "../../styles/svg/collapse.svg";

const MenuContainer = ({ title, menuItems }) => {
  const [expand, setExpand] = useState(true);
  const history = useHistory();

  const handleLink = (link) => {
    history.push(link);
  };

  return (
    <div className="bg2 r bs-1 mb12 w100 flex-col align-c">
      <div className="flex-row w100">
        <Button
          iconSize={"20px"}
          extraClass={"button-transp-p align-c w100"}
          captionClass={"ml8 bold f16"}
          onClick={() => setExpand(!expand)}
          iconUrl={expand ? CollapseIcon : ExpandIcon}
          iconColor={"black"}
          caption={title}
        />
      </div>
      <div className="flex-col ml20 w100 expand">
        {expand &&
          menuItems.map((item, index) => (
            <Button
              key={index}
              extraClass={"button-p align-c"}
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

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
