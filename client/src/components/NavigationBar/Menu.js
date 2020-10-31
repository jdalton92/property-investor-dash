import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setModal } from "../../reducers/navigationReducer";
import { StyledMenu } from "./StyledMenu";

const Menu = ({ setModal, leftSidebarOpen }) => {
  const handleModal = (e) => {
    e.preventDefault();
    setModal("userType");
  };

  return (
    <>
      <StyledMenu open={leftSidebarOpen}>
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

const mapStateToProps = (state) => {
  return {
    leftSidebarOpen: state.navigation.sidebarOpen.left,
  };
};

const mapDispatchToProps = {
  setModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
