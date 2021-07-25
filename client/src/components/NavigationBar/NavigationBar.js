import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DropdownOutsideAlerter } from "../../utils/hooks";
import { logoutUser } from "../../reducers/usersReducer";
import { setDropdown } from "../../reducers/navigationReducer";
import { CONSTANTS } from "../../constants/constants";
import UserDropdown from "./UserDropdown";
import Burger from "./Burger";
import Button from "../Shared/Button";

const NavigationBar = ({ setDropdown, showDropdown }) => {
  let history = useHistory();

  const handleDropdownClick = () => {
    setDropdown(CONSTANTS.DROPDOWNS.USERNAME, !showDropdown);
  };

  return (
    <div className="z-20 flex-nowrap sticky top-0 p-0 flex justify-center bg-indigo-900 h-14">
      <div className="flex items-center justify-center w-80 lg:inline hidden">
        <h1 className="ml-2 mt-2 text-2xl text-white font-semibold text-shadow-lg underline">
          <Link to="/">PropertyInvestorDash</Link>
        </h1>
      </div>
      <div className="flex items-center justify-center h-full w-full max-w-screen-lg p-2 relative">
        <Burger customClass={"block lg:hidden"} />
        <h1 className="lg:hidden block text-xl sm:text-2xl text-white font-semibold text-shadow-lg ml-auto underline">
          <Link to="/">PropertyInvestorDash</Link>
        </h1>
        <Button
          options={{
            styleType: "primary",
            buttonClass: "w-10 h-10 justify-center ml-auto",
            ariaLabel: "Contact",
            ariaPosition: "left",
            icon: "email",
            iconClass: "h-8 w-8",
            onClick: () => history.push("/contact"),
          }}
        />
        <DropdownOutsideAlerter>
          <Button
            options={{
              styleType: "primary",
              buttonClass: "w-10 h-10 justify-center relative ml-2",
              ariaLabel: "User menu",
              ariaPosition: "left",
              icon: "user",
              iconClass: "h-8 w-8",
              onClick: () => handleDropdownClick(),
            }}
          />
          {showDropdown && <UserDropdown />}
        </DropdownOutsideAlerter>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users,
    showDropdown: state.navigation.dropdown[CONSTANTS.DROPDOWNS.USERNAME],
  };
};

const mapDispatchToProps = {
  logoutUser,
  setDropdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
