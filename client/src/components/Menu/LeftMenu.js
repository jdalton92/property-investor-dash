import React from "react";
import { connect } from "react-redux";
import MenuContainer from "./MenuContainer";
import Burger from "../NavigationBar/Burger";

import MessageIcon from "../../styles/svg/message.svg";

const LeftMenu = ({ leftSidebarOpen }) => {
  const menuItems = [
    {
      title: "heading1, item1",
      link: "/link1",
      icon: MessageIcon,
    },
    {
      title: "heading1, item2",
      link: "/link2",
      icon: MessageIcon,
    },
    {
      title: "heading1, item3",
      link: "/link3",
      icon: MessageIcon,
    },
    {
      title: "heading1, item4",
      link: "/link4",
      icon: MessageIcon,
    },
  ];

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
        <div className="o-y-scroll o-x-hidden mt8 mb8 flex-col h100">
          <MenuContainer title={"heading1"} menuItems={menuItems} />
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
