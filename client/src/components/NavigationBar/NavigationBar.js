import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DropdownOutsideAlerter } from "../../helpers/hooks";
import { logoutUser } from "../../reducers/userReducer";
import {
  setModal,
  setDropdown,
  setRightSidebar,
  setLeftSidebar,
} from "../../reducers/navigationReducer";
import { setNotification } from "../../reducers/notificationReducer";

import { CONSTANTS } from "../../static/constants";

import UserDropdown from "./UserDropdown";
import Burger from "./Burger";
import Menu from "./Menu";
import Button from "../Shared/Button";
import UserIcon from "../../styles/svg/user.svg";
import EmailIcon from "../../styles/svg/email.svg";
import ExpandIcon from "../../styles/svg/expand.svg";
import CollapseIcon from "../../styles/svg/collapse.svg";

const NavigationBar = ({
  setModal,
  setDropdown,
  logoutUser,
  user,
  rightSidebarOpen,
  setRightSidebar,
  setLeftSidebar,
  setNotification,
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

  const handleCalculatorClick = (e) => {
    e.preventDefault();
    setModal("userType");
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setNotification(
      "Contact Us button clicked",
      CONSTANTS.NOTIFICATION.MESSAGE
    );
  };

  const handleDropdownClick = (e) => {
    e.preventDefault();
    setDropdown("username");
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    history.push("/");
  };

  return (
    <div className="navbar sticky p0 flex-row justify-c">
      <div className="navbar-main flex-row align-c justify-e h100 w100 p8 relative border-p">
        <Burger customClass={"nav-burger h1080"} />
        <h1 className="w100 title">PropertyInvestorDash</h1>
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
        <div className="h768">
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
  setModal,
  setDropdown,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
