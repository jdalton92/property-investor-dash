import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { CONSTANTS } from "../../static/constants";
import { setDropdown } from "../../reducers/navigationReducer";
import { logoutUser } from "../../reducers/userReducer";
import Button from "../Shared/Button";
import SettingsIcon from "../../styles/svg/settings.svg";
import LogoutIcon from "../../styles/svg/logout.svg";
import DashboardIcon from "../../styles/svg/dashboard.svg";

const UserDropdown = ({ showDropdown, setDropdown, logoutUser, username }) => {
  const history = useHistory();

  const handleLink = (url) => {
    setDropdown(CONSTANTS.DROPDOWNS.USERNAME);
    history.push(url);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setDropdown(CONSTANTS.DROPDOWNS.USERNAME);
    logoutUser();
    history.push("/");
  };

  return (
    <>
      {showDropdown ? (
        <div className="user-dropdown flex-col pt8 pb8 fade-in r bs-3">
          <span className="bold ml8 f16">{username}</span>
          <Button
            extraClass={"button-transp-p align-c"}
            captionClass={"ml8"}
            caption={"saved dashboards"}
            onClick={() => handleLink("/saved-dashboards")}
            iconUrl={DashboardIcon}
            iconColor={"black"}
          />
          <Button
            extraClass={"button-transp-p align-c"}
            captionClass={"ml8"}
            caption={"account settings"}
            onClick={() => handleLink("/settings")}
            iconUrl={SettingsIcon}
            iconColor={"black"}
          />
          <Button
            extraClass={"button-transp-p align-c"}
            captionClass={"ml8"}
            caption={"logout"}
            onClick={handleLogout}
            iconUrl={LogoutIcon}
            iconColor={"black"}
          />
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    showDropdown: state.navigation.dropdown[CONSTANTS.DROPDOWNS.USERNAME],
    username: state.user.data.username,
  };
};

const mapDispatchToProps = {
  logoutUser,
  setDropdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
