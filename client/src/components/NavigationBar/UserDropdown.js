import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { CONSTANTS } from "../../static/constants";
import { setDropdown, setTab } from "../../reducers/navigationReducer";
import { logoutUser } from "../../reducers/userReducer";
import Button from "../Shared/Button";
import SettingsIcon from "../../styles/svg/settings.svg";
import LogoutIcon from "../../styles/svg/logout.svg";
import DashboardIcon from "../../styles/svg/dashboard.svg";
import UserIcon from "../../styles/svg/user.svg";
import CreateUserIcon from "../../styles/svg/create-user.svg";

const UserDropdown = ({
  showDropdown,
  setDropdown,
  logoutUser,
  email,
  setTab,
}) => {
  const history = useHistory();

  const handleLink = (url) => {
    setDropdown(CONSTANTS.DROPDOWNS.USERNAME, false);
    history.push(url);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setDropdown(CONSTANTS.DROPDOWNS.USERNAME, false);
    logoutUser();
    history.push("/");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setTab("login", CONSTANTS.TABS.LOGIN.LOGIN);
    history.push("/login");
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setTab("login", CONSTANTS.TABS.LOGIN.CREATEUSER);
    history.push("/login");
  };

  return (
    <>
      {showDropdown && email && (
        <div className="user-dropdown flex-col p8 fade-in r bs-3">
          <span className="bold ml8 f16 ellipse">{email}</span>
          <Button
            extraClass={"button-transp-p align-c"}
            captionClass={"ml8"}
            caption={"Saved Dashboards"}
            onClick={() => handleLink("/saved-dashboards")}
            iconUrl={DashboardIcon}
            iconColor={"black"}
          />
          <Button
            extraClass={"button-transp-p align-c"}
            captionClass={"ml8"}
            caption={"Account Settings"}
            onClick={() => handleLink("/settings")}
            iconUrl={SettingsIcon}
            iconColor={"black"}
          />
          <Button
            extraClass={"button-transp-p align-c"}
            captionClass={"ml8"}
            caption={"Logout"}
            onClick={handleLogout}
            iconUrl={LogoutIcon}
            iconColor={"black"}
          />
        </div>
      )}
      {showDropdown && !email && (
        <div className="user-dropdown flex-col pt8 pb8 fade-in r bs-3">
          <Button
            extraClass={"button-transp-p align-c"}
            captionClass={"ml8"}
            caption={"Login"}
            onClick={handleLogin}
            iconUrl={UserIcon}
            iconColor={"black"}
          />
          <Button
            extraClass={"button-transp-p align-c"}
            captionClass={"ml8"}
            caption={"Create Account"}
            onClick={handleCreate}
            iconUrl={CreateUserIcon}
            iconColor={"black"}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    showDropdown: state.navigation.dropdown[CONSTANTS.DROPDOWNS.USERNAME],
    email: state.user.data.email,
  };
};

const mapDispatchToProps = {
  logoutUser,
  setDropdown,
  setTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
