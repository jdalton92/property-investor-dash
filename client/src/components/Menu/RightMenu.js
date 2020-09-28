import React from "react";
import { connect } from "react-redux";
import { setRightSidebar } from "../../reducers/navigationReducer";
import Button from "../Shared/Button";
import ExpandIcon from "../../styles/svg/expand.svg";
import CollapseIcon from "../../styles/svg/collapse.svg";
import CloseIcon from "../../styles/svg/close.svg";

const RightMenu = ({ rightSidebarOpen, setRightSidebar }) => {
  let x;
  let y = [];

  for (x = 0; x < 100; x++) {
    y = [...y, 1];
  }

  let RightMenuIcon;
  if (rightSidebarOpen) {
    RightMenuIcon = CollapseIcon;
  } else {
    RightMenuIcon = ExpandIcon;
  }

  const handleRightMenuClick = () => {
    setRightSidebar(!rightSidebarOpen);
  };

  return (
    <div
      className={`right-menu-wrapper flex-col ${
        rightSidebarOpen ? "open-right" : ""
      }`}
    >
      <div className="w100 flex-row justify-e p8 h768">
        <Button
          ariaLabel={rightSidebarOpen ? "Close Menu" : "Open Menu"}
          dataBalloonPos={"left"}
          extraClass={"button-p align-c justify-c"}
          onClick={handleRightMenuClick}
          iconUrl={CloseIcon}
          iconColor={"white"}
        />
      </div>
      <div className="right-menu sticky-below-nav flex-col border-p background-p">
        <div className="o-y-scroll o-x-hidden mt8 mb8 flex-col scrollbar">
          {y.map((c, i) => (
            <Button
              extraClass={"button-transp-p"}
              caption={"test button"}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rightSidebarOpen: state.navigation.sidebarOpen.right,
  };
};

const mapDispatchToProps = {
  setRightSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);
