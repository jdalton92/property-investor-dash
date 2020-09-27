import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { OutsideAlerter } from "../../helpers/hooks";
import { logoutUser } from "../../reducers/userReducer";
import {
  setModal,
  setSidebar,
  setDropdown,
} from "../../reducers/navigationReducer";
import { setNotification } from "../../reducers/notificationReducer";

import { CONSTANTS } from "../../static/constants";

import UserDropdown from "./UserDropdown";
import Burger from "./Burger";
import Menu from "./Menu";
import Button from "../Shared/Button";
import UserIcon from "../../styles/svg/user.svg";
import SettingsIcon from "../../styles/svg/settings.svg";

const NavigationBar = ({
  setModal,
  setDropdown,
  logoutUser,
  user,
  navigation,
  setNotification,
}) => {
  let history = useHistory();

  const handleCalculatorClick = (e) => {
    e.preventDefault();
    setModal("userType");
  };

  const handleSettingsClick = (e) => {
    e.preventDefault();
    setNotification("Settings button clicked", CONSTANTS.NOTIFICATION.MESSAGE);
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
      <div className="navbar-side flex-row h100 p8 border-p">
        <Burger customClass={"mobile"} />
        Left Navbar
      </div>
      <div className="navbar-main h100 p8 w100 border-p">Main Navbar</div>
      <div className="navbar-side flex-row align-c justify-e h100 p8 border-p">
        <Button
          extraClass={"button-p align-c justify-c"}
          onClick={handleSettingsClick}
          iconUrl={SettingsIcon}
          iconColor={"white"}
        />
        <div className="relative">
          <Button
            extraClass={"button-p align-c justify-c"}
            onClick={handleDropdownClick}
            iconUrl={UserIcon}
            iconColor={"white"}
          />
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    navigation: state.navigation,
  };
};

const mapDispatchToProps = {
  logoutUser,
  setSidebar,
  setModal,
  setDropdown,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
