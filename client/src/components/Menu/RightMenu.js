import React from "react";
import { connect } from "react-redux";
import { setRightSidebar } from "../../reducers/navigationReducer";
import Button from "../Shared/Button";
import CloseIcon from "../../styles/svg/close.svg";
import MenuContainer from "./MenuContainer";

import QuestionIcon from "../../styles/svg/question.svg";
import DashboardIcon from "../../styles/svg/dashboard.svg";
import ContactIcon from "../../styles/svg/email.svg";
import BookIcon from "../../styles/svg/book.svg";

const RightMenu = ({ rightSidebarOpen, setRightSidebar }) => {
  const handleRightMenuClick = (e) => {
    e.preventDefault();
    setRightSidebar(!rightSidebarOpen);
  };

  const companyMenuItems = [
    {
      title: "About",
      link: { url: "/about", internal: true },
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

  return (
    <div
      className={`right-menu-wrapper flex-col ${
        rightSidebarOpen ? "open-right" : ""
      }`}
    >
      <div className="w100 flex-row justify-e p8 s768">
        <Button
          ariaLabel={rightSidebarOpen ? "Close Menu" : "Open Menu"}
          dataBalloonPos={"left"}
          extraClass={"button-p align-c justify-c"}
          onClick={handleRightMenuClick}
          iconUrl={CloseIcon}
          iconColor={"white"}
        />
      </div>
      <div className="right-menu sticky-below-nav flex-col border-p background-p">
        <div className="o-y-scroll o-x-hidden mt8 mb8 flex-col scrollbar">
          <MenuContainer title={"Company"} menuItems={companyMenuItems} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rightSidebarOpen: state.navigation.sidebarOpen.right,
  };
};

const mapDispatchToProps = {
  setRightSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);
