import React from "react";
import { connect } from "react-redux";
import { StyledBurger } from "./StyledBurger";
import {
  setLeftSidebar,
  setRightSidebar,
} from "../../reducers/navigationReducer";

const Burger = ({
  leftSidebarOpen,
  setRightSidebar,
  setLeftSidebar,
  customClass,
}) => {
  const handleClick = () => {
    setRightSidebar(false);
    setLeftSidebar(!leftSidebarOpen);
  };
  return (
    <div onClick={handleClick} className={customClass}>
      <StyledBurger open={leftSidebarOpen}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    leftSidebarOpen: state.navigation.sidebarOpen.left,
  };
};

const mapDispatchToProps = {
  setLeftSidebar,
  setRightSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Burger);
