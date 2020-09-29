import React from "react";
import { connect } from "react-redux";
import MenuContainer from "./MenuContainer";
import Burger from "../NavigationBar/Burger";

import MessageIcon from "../../styles/svg/message.svg";

const LeftMenu = ({ leftSidebarOpen }) => {
  const companyMenuItems = [
    {
      title: "About Us",
      link: "/about",
      icon: MessageIcon,
    },
    {
      title: "Dashboard Types",
      link: "/dashboard-types",
      icon: MessageIcon,
    },
    {
      title: "Who Is It For",
      link: "/about",
      icon: MessageIcon,
    },
    {
      title: "Contact Us",
      link: "/contact",
      icon: MessageIcon,
    },
  ];

  const calcualtorMenuItems = [
    {
      title: "Owner Occupier",
      link: "/owner-occupier/edit",
      icon: MessageIcon,
    },
    {
      title: "Investor",
      link: "/investor/edit",
      icon: MessageIcon,
    },
    {
      title: "Developer",
      link: "/developer/edit",
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
        <div className="o-y-scroll o-x-hidden mt8 mb8 pflex-col h100 scrollbar">
          <MenuContainer title={"Company"} menuItems={companyMenuItems} />
          <MenuContainer
            title={"Calculators"}
            menuItems={calcualtorMenuItems}
          />
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
