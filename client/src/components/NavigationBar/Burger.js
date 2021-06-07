import React from "react";
import { connect } from "react-redux";
import { StyledBurger } from "./StyledBurger";
import { setLeftSidebar, setDropdown } from "../../reducers/navigationReducer";
import { CONSTANTS } from "../../static/constants";

const Burger = ({
  leftSidebarOpen,
  setLeftSidebar,
  setDropdown,
  customClass,
  color = "#f7f8fb",
}) => {
  const handleClick = () => {
    setDropdown(CONSTANTS.DROPDOWNS.USERNAME, false);
    setLeftSidebar(!leftSidebarOpen);
  };
  return (
    <div className={customClass}>
      <StyledBurger
        type="button"
        onClick={handleClick}
        open={leftSidebarOpen}
        color={color}
      >
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
  setDropdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(Burger);
