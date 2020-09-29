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

  const calculatorMenuItems = [
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

  const otherMenuItems = [
    {
      title: "GitHub Repo",
      link: "https://github.com/jdalton92/property-investor-dash",
      icon: MessageIcon,
    },
    {
      title: "Terms and Conditions",
      link: "/terms-and-conditions",
      icon: MessageIcon,
    },
    {
      title: "Privacy Policy",
      link: "/privacy-policy",
      icon: MessageIcon,
    },
  ];

  return (
    <div
      className={`left-menu-wrapper sticky flex-col background-p ${
        leftSidebarOpen ? "open-left" : ""
      }`}
    >
      <div className="navbar-side h1080 h100 p8 flex-row align-c justify-e">
        <h1 className="w100 f16 bold text-start">PropertyInvestorDash</h1>
        <Burger customClass={"h1080"} />
      </div>
      <div className="left-menu sticky-below-nav flex-col border-p">
        <div className="o-y-scroll o-x-hidden mt8 mb8 pflex-col h100 scrollbar">
          <MenuContainer title={"Company"} menuItems={companyMenuItems} />
          <MenuContainer
            title={"Calculators"}
            menuItems={calculatorMenuItems}
          />
          <MenuContainer title={"Other"} menuItems={otherMenuItems} />
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
