import React from "react";
import { connect } from "react-redux";
import MenuContainer from "./MenuContainer";
import Burger from "../NavigationBar/Burger";

import QuestionIcon from "../../styles/svg/question.svg";
import MessageIcon from "../../styles/svg/message.svg";
import DashboardIcon from "../../styles/svg/dashboard.svg";
import ContactIcon from "../../styles/svg/email.svg";
import GitHubIcon from "../../styles/svg/github.svg";
import HomeOwnerIcon from "../../styles/svg/home-owner.svg";
import UserIcon from "../../styles/svg/user2.svg";
import UnitsIcon from "../../styles/svg/units.svg";
import FinanceIcon from "../../styles/svg/finance.svg";
import PrivacyIcon from "../../styles/svg/privacy.svg";

const LeftMenu = ({ leftSidebarOpen }) => {
  const companyMenuItems = [
    {
      title: "About Us",
      link: "/about",
      icon: QuestionIcon,
    },
    {
      title: "Dashboard Types",
      link: "/dashboard-types",
      icon: DashboardIcon,
    },
    {
      title: "Who Is It For",
      link: "/about",
      icon: UserIcon,
    },
    {
      title: "Contact Us",
      link: "/contact",
      icon: ContactIcon,
    },
  ];

  const calculatorMenuItems = [
    {
      title: "Owner Occupier",
      link: "/owner-occupier/edit",
      icon: HomeOwnerIcon,
    },
    {
      title: "Investor",
      link: "/investor/edit",
      icon: FinanceIcon,
    },
    {
      title: "Developer",
      link: "/developer/edit",
      icon: UnitsIcon,
    },
  ];

  const otherMenuItems = [
    {
      title: "GitHub",
      link: "https://github.com/jdalton92/property-investor-dash",
      icon: GitHubIcon,
    },
    {
      title: "Terms and Conditions",
      link: "/terms-and-conditions",
      icon: MessageIcon,
    },
    {
      title: "Privacy Policy",
      link: "/privacy-policy",
      icon: PrivacyIcon,
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
        <div className="o-y-scroll o-x-hidden mt8 mb8 h100 scrollbar">
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
