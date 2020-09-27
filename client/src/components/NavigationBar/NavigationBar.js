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
import GitHubIcon from "../../styles/svg/github.svg";

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

  const handleGitHubClick = (e) => {
    e.preventDefault();
    const win = window.open(
      "https://github.com/jdalton92/property-investor-dash",
      "_blank"
    );
    if (win != null) {
      win.focus();
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    history.push("/");
  };

  return (
    <div className="navbar sticky p0 flex-row justify-c">
      <div className="navbar-main flex-row align-c justify-e h100 w100 p8 relative border-p">
        <Burger customClass={"nav-burger mobile"} />
        <Button
          ariaLabel={"GitHub"}
          dataBalloonPos={"left"}
          extraClass={"button-p align-c justify-c"}
          onClick={handleGitHubClick}
          iconUrl={GitHubIcon}
          iconColor={"white"}
        />
        <Button
          ariaLabel={"Settings"}
          dataBalloonPos={"left"}
          extraClass={"button-p align-c justify-c"}
          onClick={handleSettingsClick}
          iconUrl={SettingsIcon}
          iconColor={"white"}
        />
        <div className="relative">
          <Button
            ariaLabel={"User Options"}
            dataBalloonPos={"left"}
            extraClass={"button-p align-c justify-c"}
            onClick={handleDropdownClick}
            iconUrl={UserIcon}
            iconColor={"white"}
          />
          <OutsideAlerter>
            <UserDropdown />
          </OutsideAlerter>
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
