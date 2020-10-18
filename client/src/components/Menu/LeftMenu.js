import React from "react";
import { connect } from "react-redux";
import MenuContainer from "./MenuContainer";
import Burger from "../NavigationBar/Burger";

import QuestionIcon from "../../styles/svg/question.svg";
import MessageIcon from "../../styles/svg/message.svg";
import DashboardIcon from "../../styles/svg/dashboard.svg";
import ContactIcon from "../../styles/svg/email.svg";
import BookIcon from "../../styles/svg/book.svg";
import GitHubIcon from "../../styles/svg/github.svg";
import HomeOwnerIcon from "../../styles/svg/home-owner.svg";
import UnitsIcon from "../../styles/svg/units.svg";
import FinanceIcon from "../../styles/svg/finance.svg";
import PrivacyIcon from "../../styles/svg/privacy.svg";

const LeftMenu = ({ leftSidebarOpen }) => {
  const companyMenuItems = [
    {
      title: "About",
      link: { url: "/about", internal: true },
      icon: QuestionIcon,
    },
    {
      title: "Dashboard Types",
      link: { url: "/dashboard-types", internal: true },
      icon: DashboardIcon,
    },
    {
      title: "Blog",
      link: { url: "/blog", internal: true },
      icon: BookIcon,
    },
    {
      title: "Contact",
      link: { url: "/contact", internal: true },
      icon: ContactIcon,
    },
  ];

  const calculatorMenuItems = [
    {
      title: "Owner Occupier",
      link: { url: "/owner-occupier/edit", internal: true },
      icon: HomeOwnerIcon,
    },
    {
      title: "Investor",
      link: {
        url: "/investor/edit",
        internal: true,
      },
      icon: FinanceIcon,
    },
    {
      title: "Developer",
      link: {
        url: "/developer/edit",
        internal: true,
      },
      icon: UnitsIcon,
    },
  ];

  const otherMenuItems = [
    {
      title: "Terms and Conditions",
      link: { url: "/terms-and-conditions", internal: true },
      icon: MessageIcon,
    },
    {
      title: "Privacy Policy",
      link: {
        url: "/privacy-policy",
        internal: true,
      },
      icon: PrivacyIcon,
    },
    {
      title: "GitHub",
      link: {
        url: "https://github.com/jdalton92/property-investor-dash",
        internal: false,
      },
      icon: GitHubIcon,
    },
  ];

  return (
    <div
      className={`left-menu-wrapper sticky flex-col background-p ${
        leftSidebarOpen ? "open-left" : ""
      }`}
    >
      <div className="navbar-side s1080 h100 p8 flex-row align-c justify-e">
        <h1 className="w100 f16 bold text-start">PropertyInvestorDash</h1>
        <Burger customClass={"s1080"} />
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
