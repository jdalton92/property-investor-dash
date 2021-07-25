import React from "react";
import { connect } from "react-redux";
import { OverlayOutsideAlerter } from "../../utils/hooks";
import { CONSTANTS } from "../../constants/constants";

const Overlay = ({ hideWhenDesktop = true, showUserDropdown }) => {
  return (
    <OverlayOutsideAlerter>
      <div
        className={`fixed ${showUserDropdown ? "z-10" : "z-20"} ${
          hideWhenDesktop ? "lg:hidden" : ""
        } w-screen h-screen animate-fade-in left-0 top-0 z-0 bg-gray-800 bg-opacity-70 flex justify-center items-center`}
      ></div>
    </OverlayOutsideAlerter>
  );
};

const mapStateToProps = (state) => {
  return {
    showUserDropdown: state.navigation.dropdown[CONSTANTS.DROPDOWNS.USERNAME],
  };
};

export default connect(mapStateToProps, null)(Overlay);
