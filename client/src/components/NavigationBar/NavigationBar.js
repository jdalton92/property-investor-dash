import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { DropdownOutsideAlerter } from "../../utils/hooks";
import { logoutUser } from "../../reducers/userReducer";
import { setDropdown } from "../../reducers/navigationReducer";
import { CONSTANTS } from "../../static/constants";
import UserDropdown from "./UserDropdown";
import Burger from "./Burger";
import Button from "../Shared/Button";
import UserIcon from "../../styles/svg/user.svg";
import EmailIcon from "../../styles/svg/email.svg";

const NavigationBar = ({ setDropdown, showDropdown }) => {
  let history = useHistory();

  const handleContactClick = (e) => {
    e.preventDefault();
    history.push("/contact");
  };

  const handleDropdownClick = (e) => {
    e.preventDefault();
    setDropdown(CONSTANTS.DROPDOWNS.USERNAME, !showDropdown);
  };

  return (
    <div className="navbar sticky p0 flex-row justify-c bg-blue-1">
      <div className="navbar-main flex-row align-c justify-e h100 w100 p8 relative">
        <Burger customClass={"nav-burger s1080"} />
        <h1 className="w100 font-white bold title ts-3">
          PropertyInvestorDash
        </h1>
        <Button
          ariaLabel={"Contact"}
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    showDropdown: state.navigation.dropdown[CONSTANTS.DROPDOWNS.USERNAME],
  };
};

const mapDispatchToProps = {
  logoutUser,
  setDropdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
