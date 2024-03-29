import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setModal, setTab } from "../../reducers/navigationReducer";
import { CONSTANTS } from "../../constants/constants";
import Button from "../Shared/Button";
import Tab from "../Shared/Tab";
import Overlay from "../Shared/Overlay";
import SaveNewDashboard from "./SaveNewDashboard";
import OverwriteDashboard from "./OverwriteDashboard";

const SaveDashboardModal = ({ setModal, setTab, tab }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.keyCode === 27) {
        handleCancel();
      }
    };
    document.addEventListener("keydown", onKeyDown, false);
    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  });

  const handleCancel = () => {
    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, false);
  };

  const isSaveTab = tab === CONSTANTS.TABS.SAVEDASHBOARD.SAVE;
  const isOverwriteTab = tab === CONSTANTS.TABS.SAVEDASHBOARD.OVERWRITE;

  return (
    <>
      <div
        className={`absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 z-50 shadow-xl rounded-2xl bg-white p-4 max-w-screen-lg w-screen ${
          isOverwriteTab ? "mt-16 md:mt-0" : ""
        }`}
      >
        <div className="relative">
          <h2 className="text-center font-medium text-2xl text-shadow-xs mt-3 mb-7">
            Save Dashboard
          </h2>
          <Button
            type={"button"}
            options={{
              styleType: "secondary",
              buttonClass: "h-10 px-1 absolute right-0 top-0 opacity-40",
              icon: "close",
              iconClass: "h-8 w-8",
              onClick: () => handleCancel(),
            }}
          />
        </div>
        <div className="flex mb-4">
          <Tab
            title={"Save New"}
            options={{
              icon: "save",
              onClick: () =>
                setTab("saveDashboard", CONSTANTS.TABS.SAVEDASHBOARD.SAVE),
              active: isSaveTab,
            }}
          />
          <Tab
            title={"Overwrite Existing"}
            options={{
              icon: "overwrite",
              onClick: () =>
                setTab("saveDashboard", CONSTANTS.TABS.SAVEDASHBOARD.OVERWRITE),
              active: isOverwriteTab,
            }}
          />
        </div>
        {isSaveTab && <SaveNewDashboard />}
        {isOverwriteTab && <OverwriteDashboard />}
      </div>
      <Overlay hideWhenDesktop={false} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tab: state.navigation.tabs.saveDashboard,
  };
};

const mapDispatchToProps = {
  setModal,
  setTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveDashboardModal);
