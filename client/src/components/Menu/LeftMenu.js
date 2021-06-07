import React from "react";
import { connect } from "react-redux";
import MenuContainer from "./MenuContainer";
import Burger from "../NavigationBar/Burger";
import { CONSTANTS } from "../../static/constants";
import { setTab } from "../../reducers/navigationReducer";
import { logoutUser } from "../../reducers/usersReducer";

const LeftMenu = ({ leftSidebarOpen, isLoggedIn, setTab, logoutUser }) => {
  let userMenuItems = [
    {
      label: "Login",
      link: {
        url: "/login",
        callBack: () => setTab("login", CONSTANTS.TABS.LOGIN.LOGIN),
      },
      icon: "user",
    },
    {
      label: "Create Account",
      link: {
        url: "/login",
        callBack: () => setTab("login", CONSTANTS.TABS.LOGIN.CREATEUSER),
      },
      icon: "create-user",
    },
  ];
  if (isLoggedIn) {
    userMenuItems = [
      {
        label: "Saved Dashboards",
        link: {
          url: "/saved-dashboards",
        },
        icon: "dashboard",
      },
      {
        label: "Account Settings",
        link: {
          url: "/settings",
        },
        icon: "settings",
      },
      {
        label: "Logout",
        link: {
          url: "/",
          callBack: () => logoutUser(),
        },
        icon: "logout",
      },
    ];
  }

  const aboutMenuItems = [
    {
      label: "About",
      link: { url: "/" },
      icon: "question",
    },
    {
      label: "Calculator Types",
      link: { url: "/calculator-types" },
      icon: "dashboard",
    },
    {
      label: "Blog",
      link: { url: "/blog" },
      icon: "book",
    },
    {
      label: "Contact",
      link: { url: "/contact" },
      icon: "email",
    },
  ];

  const calculatorMenuItems = [
    {
      label: "Owner Occupier",
      link: { url: "/owner-occupier/edit" },
      icon: "home-owner",
    },
    {
      label: "Investor",
      link: {
        url: "/investor/edit",
      },
      icon: "finance",
    },
    {
      label: "Developer",
      link: {
        url: "/developer/edit",
      },
      icon: "units",
    },
  ];

  const otherMenuItems = [
    {
      label: "Terms and Conditions",
      link: { url: "/terms-and-conditions" },
      icon: "message",
    },
    {
      label: "Privacy Policy",
      link: {
        url: "/privacy-policy",
      },
      icon: "information",
    },
    {
      label: "GitHub",
      link: {
        url: "https://github.com/jdalton92/property-investor-dash",
        external: true,
      },
      icon: "github",
    },
  ];

  return (
    <div
      className={`sticky top-0 max-h-screen overflow-y-scroll transition-transform duration-250 ease-in-out transform
      lg:translate-x-0 ${
        leftSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex block lg:hidden">
        <h1>PropertyInvestorDash</h1>
        <Burger customClass={"s1080"} />
      </div>
      <div>
        <div className="">
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
