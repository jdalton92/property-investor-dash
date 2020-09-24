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
import Burger from "./Burger";
import Menu from "./Menu";

const NavigationBar = ({
  setModal,
  setDropdown,
  logoutUser,
  user,
  navigation,
}) => {
  let history = useHistory();

  const handleCalculatorClick = (e) => {
    e.preventDefault();
    setModal("userType");
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
      <div className="navbar-side navbar-left flex-row h100 p8 border-p">
        <Burger customClass={"mobile"} />
        Left Navbar
      </div>
      <div className="navbar-main h100 p8 w100 border-p">Main Navbar</div>
      <div className="navbar-side h100 p8 border-p">Right Navbar</div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
