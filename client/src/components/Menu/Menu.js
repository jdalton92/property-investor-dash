import React from "react";
import { connect } from "react-redux";
import MenuContainer from "./MenuContainer";
import Burger from "../NavigationBar/Burger";
import LoadingMenuContainer from "./LoadingMenuContainer";
import { logoutUser } from "../../reducers/usersReducer";

const Menu = ({
  isUserFetching,
  leftSidebarOpen,
  isAuthedUser,
  logoutUser,
}) => {
  let userMenuItems = [
    {
      label: "Login",
      link: { url: "/login", navLink: true },
      icon: "user",
    },
    {
      label: "Create Account",
      link: { url: "/sign-up" },
      icon: "create-user",
    },
  ];
  if (isAuthedUser) {
    userMenuItems = [
      {
        label: "Saved Dashboards",
        link: { url: "/saved-dashboards", navLink: true },
        icon: "dashboard",
      },
      {
        label: "Account Settings",
        link: { url: "/settings", navLink: true },
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
      link: { url: "/", navLink: true },
      icon: "question",
    },
    {
      label: "Calculator Types",
      link: { url: "/calculator-types", navLink: true },
      icon: "dashboard",
    },
    {
      label: "Blog",
      link: { url: "/blog", navLink: true },
      icon: "book",
    },
    {
      label: "Contact",
      link: { url: "/contact", navLink: true },
      icon: "email",
    },
  ];

  const calculatorMenuItems = [
    {
      label: "Owner Occupier",
      link: { url: "/owner-occupier/edit", navLink: true },
      icon: "home-owner",
    },
    {
      label: "Investor",
      link: { url: "/investor/edit", navLink: true },
      icon: "finance",
    },
    {
      label: "Developer",
      link: { url: "/developer/edit", navLink: true },
      icon: "units",
    },
  ];

  const otherMenuItems = [
    {
      label: "Terms and Conditions",
      link: { url: "/terms-and-conditions", navLink: true },
      icon: "message",
    },
    {
      label: "Privacy Policy",
      link: { url: "/privacy-policy", navLink: true },
      icon: "information",
    },
    {
      label: "GitHub",
      link: {
        url: "https://github.com/jdalton92/property-investor-dash",
        external: true,
        navLink: false,
      },
      icon: "github",
    },
  ];

  return (
    <div
      className={`h-screen transition-transform duration-250 ease-in-out transform
      lg:translate-x-0 w-60 ${
        leftSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex block lg:hidden">
        <h1>PropertyInvestorDash</h1>
        <Burger customClass={"s1080"} />
      </div>
      <div>
        {!isUserFetching && (
          <>
            <MenuContainer title={"User"} menuItems={userMenuItems} />
            <MenuContainer title={"About"} menuItems={aboutMenuItems} />
            <MenuContainer
              title={"Calculators"}
              menuItems={calculatorMenuItems}
            />
            <MenuContainer title={"Other"} menuItems={otherMenuItems} />
          </>
        )}
        {isUserFetching && (
          <>
            <LoadingMenuContainer />
            <LoadingMenuContainer />
            <LoadingMenuContainer />
            <LoadingMenuContainer />
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserFetching: state.users.isFetching,
    // isUserFetching: true,
    leftSidebarOpen: state.navigation.sidebarOpen.left,
    isAuthedUser: state.users.data?._id,
  };
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
