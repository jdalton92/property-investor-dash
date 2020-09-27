import React from "react";
import { connect } from "react-redux";
import Button from "../Shared/Button";
import Burger from "../NavigationBar/Burger";

const LeftMenu = ({ leftSidebarOpen }) => {
  let x;
  let y = [];

  for (x = 0; x < 100; x++) {
    y = [...y, 1];
  }

  return (
    <div
      className={`left-menu-wrapper sticky flex-col background-p ${
        leftSidebarOpen ? "open-left" : ""
      }`}
    >
      <div className="navbar-side h1080 h100 p8 border-p flex-row justify-e">
        <Burger customClass={"h1080"} />
      </div>
      <div className="left-menu sticky-below-nav flex-col border-p">
        <div className="o-y-scroll o-x-hidden mt8 mb8 flex-col">
          {y.map((c, i) => (
            <Button extraClass={"button-p"} caption={"test button"} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    leftSidebarOpen: state.navigation.sidebarOpen.left,
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
