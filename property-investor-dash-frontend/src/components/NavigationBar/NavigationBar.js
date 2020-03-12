import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { OutsideAlerter } from "../../helpers/hooks";
import { logoutUser } from "../../reducers/userReducer";
import {
  setModal,
  setSidebar,
  setDropdown
} from "../../reducers/navigationReducer";
import Burger from "./Burger";
import Menu from "./Menu";
import Notification from "./Notification.js";
import { Button } from "react-bootstrap";
import houseIcon from "../styles/images/home-icon(white).png";
import "../styles/NavigationBar.css";

const NavigationBar = props => {
  let history = useHistory();

  const handleLogoClick = e => {
    e.preventDefault();
    history.push("/");
  };

  const handleCalculatorClick = e => {
    e.preventDefault();
    props.setModal("userType");
  };

  const handleDropdownClick = e => {
    e.preventDefault();
    props.setDropdown("username");
  };

  const handleLoginClick = e => {
    e.preventDefault();
    history.push("/login");
  };

  const handleLogout = e => {
    e.preventDefault();
    props.logoutUser();
    history.push("/");
  };

  return (
    <>
      <div className={`navbar-upper-container`}>
        <div className="logo" onClick={handleLogoClick}>
          <img alt="home" title="home" src={houseIcon} className="house-icon" />
          <b>PropertyInvestor</b>DASH
        </div>
      </div>
      <div className="navbar-lower-container">
        <div className="navbar-burger">
          <Menu />
          <Burger />
        </div>
        <div className="navbar-section navbar-links-left">
          <Link className="navbar-link" to="/">
            Home
          </Link>
          <Link className="navbar-link" to="/about">
            About
          </Link>
          <Link className="navbar-link" to="/contact">
            Contact
          </Link>
          <div className="navbar-link" onClick={handleCalculatorClick}>
            Calculators
          </div>
        </div>
        <div className="navbar-section navbar-links-right">
          {props.user.data.username ? (
            <>
              <div className="navbar-dropdown-container">
                <OutsideAlerter>
                  <div
                    className="navbar-link navbar-dropdown"
                    onClick={handleDropdownClick}
                  >
                    {props.user.data.username.toUpperCase()}{" "}
                    <i className="navbar-arrow-down"></i>
                  </div>
                  <div
                    className={`navbar-dropdown-links ${
                      props.navigation.dropdown.username ? "" : "hide"
                    }`}
                    onClick={() => props.setDropdown("username")}
                  >
                    <Link className="dropdown-item" to="/saved-dashboards">
                      Saved Dashboards
                    </Link>
                    <Link className="dropdown-item" to="/settings">
                      User Settings
                    </Link>
                    <Button
                      className="dropdown-item"
                      variant="outline-primary"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </OutsideAlerter>
              </div>
              <div alt="user" title="user" className="user-icon" />
            </>
          ) : (
            <>
              <Link className="navbar-link" to="/create-user">
                New Account
              </Link>
              <Button
                className="navbar-button"
                variant="primary"
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </>
          )}
        </div>
        <Notification />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    navigation: state.navigation
  };
};

const mapDispatchToProps = {
  logoutUser,
  setSidebar,
  setModal,
  setDropdown
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
