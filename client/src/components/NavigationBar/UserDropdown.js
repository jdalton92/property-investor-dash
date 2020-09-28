import React from "react";
import { connect } from "react-redux";
import Button from "../Shared/Button";
import SettingsIcon from "../../styles/svg/settings.svg";
import LogoutIcon from "../../styles/svg/logout.svg";

const UserDropdown = ({ showDropdown }) => {
  return (
    <>
      {showDropdown ? (
        <div className="user-dropdown flex-col pt8 pb8 fade-in r bs-3">
          <span className="bold ml8 f16">Username</span>
          <Button
            extraClass={"button-transp-p align-c"}
            captionClass={"ml8"}
            caption={"account settings"}
            iconUrl={SettingsIcon}
            iconColor={"black"}
          />
          <Button
            extraClass={"button-transp-p align-c"}
            captionClass={"ml8"}
            caption={"logout"}
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
    showDropdown: state.navigation.dropdown.username,
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
