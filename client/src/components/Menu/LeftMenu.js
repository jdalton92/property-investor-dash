import React from "react";
import { connect } from "react-redux";
import MenuContainer from "./MenuContainer";
import Burger from "../NavigationBar/Burger";
import { CONSTANTS } from "../../static/constants";
import { setTab } from "../../reducers/navigationReducer";
import { logoutUser } from "../../reducers/usersReducer";

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
import UserIcon from "../../styles/svg/user.svg";
import CreateUserIcon from "../../styles/svg/create-user.svg";
import SettingsIcon from "../../styles/svg/settings.svg";
import LogoutIcon from "../../styles/svg/logout.svg";

const LeftMenu = ({ leftSidebarOpen, isLoggedIn, setTab, logoutUser }) => {
  let userMenuItems = [];
  if (isLoggedIn) {
    userMenuItems = [
      {
        title: "Saved Dashboards",
        link: {
          url: "/saved-dashboards",
          internal: true,
        },
        icon: DashboardIcon,
      },
      {
        title: "Account Settings",
        link: {
          url: "/settings",
          internal: true,
        },
        icon: SettingsIcon,
      },
      {
        title: "Logout",
        link: {
          url: "/",
          internal: true,
          callBack: () => logoutUser(),
        },
        icon: LogoutIcon,
      },
    ];
  } else {
    userMenuItems = [
      {
        title: "Login",
        link: {
          url: "/login",
          internal: true,
          callBack: () => setTab("login", CONSTANTS.TABS.LOGIN.LOGIN),
        },
        icon: UserIcon,
      },
      {
        title: "Create Account",
        link: {
          url: "/login",
          internal: true,
          callBack: () => setTab("login", CONSTANTS.TABS.LOGIN.CREATEUSER),
        },
        icon: CreateUserIcon,
      },
    ];
  }

  let aboutMenuItems = [
    {
      title: "About",
      link: { url: "/", internal: true },
      icon: QuestionIcon,
    },
    {
      title: "Calculator Types",
      link: { url: "/calculator-types", internal: true },
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
      className={`left-menu-wrapper bg-base sticky flex-col ${
        leftSidebarOpen ? "open-left" : ""
      }`}
    >
      <div className="navbar-side bg-blue-1 s1080 h100 p8 flex-row align-c justify-e">
        <h1 className="w100 f20 bold text-start font-white ts-3">
          PropertyInvestorDash
        </h1>
        <Burger customClass={"s1080"} />
      </div>
      <div className="left-menu sticky-below-nav flex-col">
        <div className="o-y-scroll o-x-hidden mt8 mb8 h100 scrollbar">
          <MenuContainer title={"User"} menuItems={userMenuItems} />
          <MenuContainer title={"About"} menuItems={aboutMenuItems} />
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
    isLoggedIn: state.users.data?._id,
  };
};

const mapDispatchToProps = {
  setTab,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
