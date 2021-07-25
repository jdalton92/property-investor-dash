import React from "react";
import { connect } from "react-redux";
import { setLeftSidebar, setDropdown } from "../../reducers/navigationReducer";
import { CONSTANTS } from "../../constants/constants";

const Burger = ({
  leftSidebarOpen,
  setLeftSidebar,
  setDropdown,
  customClass,
}) => {
  const handleClick = () => {
    setDropdown(CONSTANTS.DROPDOWNS.USERNAME, false);
    setLeftSidebar(!leftSidebarOpen);
  };
  return (
    <div className={`${customClass}`}>
      <button
        type="button"
        onClick={handleClick}
        className="flex flex-col justify-around w-8 h-8 bg-transparent border-none cursor-pointer p-0 z-10 focus:outline-none"
      >
        <div
          className={`${
            leftSidebarOpen ? "rotate-45" : "rotate-0"
          } transform w-full h-1 bg-white relative transition ease-linear duration-300 origin-left rounded-lg`}
        />
        <div
          className={`${
            leftSidebarOpen
              ? "opacity-0 translate-x-10"
              : "opacity-1 translate-x-0"
          } transform w-full h-1 bg-white relative transition ease-linear duration-300 origin-center rounded-lg`}
        />
        <div
          className={`${
            leftSidebarOpen ? "-rotate-45" : "rotate-0"
          } transform w-full h-1 bg-white relative transition ease-linear duration-300 origin-left rounded-lg`}
        />
      </button>
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
