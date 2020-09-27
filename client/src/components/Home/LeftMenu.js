import React from "react";
import { connect } from "react-redux";
import Button from "../Shared/Button";
import Burger from "../NavigationBar/Burger";

const LeftMenu = ({ sidebarOpen }) => {
  let x;
  let y = [];

  for (x = 0; x < 100; x++) {
    y = [...y, 1];
  }

  return (
    <div
      className={`left-menu-wrapper sticky flex-col background-p ${
        sidebarOpen ? "open" : ""
      }`}
    >
      <div className="navbar-side navbar-menu h100 p8 border-p flex-row justify-e">
        <Burger customClass={"mobile"} />
      </div>
      <div className="left-menu sticky-below-nav flex-col border-p">
        <div className="o-y-scroll o-x-hidden p8 flex-col">
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
    sidebarOpen: state.navigation.sidebarOpen,
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
