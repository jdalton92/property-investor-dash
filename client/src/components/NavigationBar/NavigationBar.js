import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { DropdownOutsideAlerter } from "../../utils/hooks";
import { logoutUser } from "../../reducers/userReducer";
import {
  setDropdown,
  setRightSidebar,
  setLeftSidebar,
} from "../../reducers/navigationReducer";
import { CONSTANTS } from "../../static/constants";
import UserDropdown from "./UserDropdown";
import Burger from "./Burger";
import Button from "../Shared/Button";
import UserIcon from "../../styles/svg/user.svg";
import EmailIcon from "../../styles/svg/email.svg";
import ExpandIcon from "../../styles/svg/expand.svg";
import CollapseIcon from "../../styles/svg/collapse.svg";

const NavigationBar = ({
  setDropdown,
  rightSidebarOpen,
  setRightSidebar,
  setLeftSidebar,
}) => {
  let history = useHistory();

  let RightMenuIcon;
  if (rightSidebarOpen) {
    RightMenuIcon = CollapseIcon;
  } else {
    RightMenuIcon = ExpandIcon;
  }

  const handleRightMenuClick = () => {
    setLeftSidebar(false);
    setRightSidebar(!rightSidebarOpen);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    history.push("/contact");
  };

  const handleDropdownClick = (e) => {
    e.preventDefault();
    setDropdown(CONSTANTS.DROPDOWNS.USERNAME);
  };

  return (
    <div className="navbar sticky p0 flex-row justify-c">
      <div className="navbar-main flex-row align-c justify-e h100 w100 p8 relative border-p">
        <Burger customClass={"nav-burger s1080"} />
        <h1 className="w100 bold title">PropertyInvestorDash</h1>
        <Button
          ariaLabel={"Contact Us"}
          dataBalloonPos={"left"}
          extraClass={"button-transp-p align-c justify-c"}
          onClick={handleContactClick}
          iconUrl={EmailIcon}
          iconColor={"white"}
        />
        <div className="relative">
          <DropdownOutsideAlerter>
            <Button
              ariaLabel={"User Options"}
              dataBalloonPos={"left"}
              extraClass={"button-transp-p align-c justify-c"}
              onClick={handleDropdownClick}
              iconUrl={UserIcon}
              iconColor={"white"}
            />
            <UserDropdown />
          </DropdownOutsideAlerter>
        </div>
        <div className="s768">
          <Button
            ariaLabel={rightSidebarOpen ? "Close Menu" : "Open Menu"}
            dataBalloonPos={"left"}
            extraClass={"button-transp-p align-c justify-c"}
            onClick={handleRightMenuClick}
            iconUrl={RightMenuIcon}
            iconColor={"white"}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    rightSidebarOpen: state.navigation.sidebarOpen.right,
  };
};

const mapDispatchToProps = {
  logoutUser,
  setRightSidebar,
  setLeftSidebar,
  setDropdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
