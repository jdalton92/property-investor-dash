import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setModal } from "../../reducers/navigationReducer";
import { StyledMenu } from "../styles/NavigationBar";
import "../styles/NavigationBar.css";

const Menu = props => {
  const handleModal = e => {
    e.preventDefault();
    props.setModal("userType");
  };

  return (
    <>
      <StyledMenu open={props.sidebarOpen}>
        <div className="menu-link-container">
          <Link className="navbar-burger-link" to="/">
            Home
          </Link>
          <Link className="navbar-burger-link" to="/about">
            About
          </Link>
          <Link className="navbar-burger-link" to="/contact">
            Contact
          </Link>
          <div className="navbar-burger-link" onClick={handleModal}>
            Calculator
          </div>
        </div>
      </StyledMenu>
    </>
  );
};

const mapStateToProps = state => {
  return {
    sidebarOpen: state.navigation.sidebarOpen
  };
};

const mapDispatchToProps = {
  setModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
