import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setModal, setTab } from "../../reducers/navigationReducer";
import {
  getDashboards,
  createDashboard,
  updateDashboard,
} from "../../reducers/dashboardsReducer";
import { CONSTANTS } from "../../static/constants";
import Overlay from "../Shared/Overlay";
import Button from "../Shared/Button";
import Tab from "../Shared/Tab";
import CloseIcon from "../../styles/svg/close.svg";
import { setNotification } from "../../reducers/notificationReducer";
import SaveNewDashboard from "./SaveNewDashboard";
import OverwriteDashboard from "./OverwriteDashboard";

const SaveDashboardModal = ({
  getDashboards,
  setModal,
  isSaveTab,
  isOverwriteTab,
  setTab,
  tab,
}) => {
  const limit = 5;
  const [params, setParams] = useState({ limit });
  useEffect(() => {
    getDashboards(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleCancel = () => {
    // React Final Form handles preventDefault()
    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, false);
  };

  return (
    <Overlay>
      <div className="absolute z-50 shadow-xl rounded-2xl bg-white p-3 max-w-screen-md w-screen">
        <Button
          ariaLabel={"Close"}
          dataBalloonPos={"left"}
          extraClass={"modal-close-btn mt20 mr20 button-p align-c justify-c"}
          onClick={handleCancel}
          iconUrl={CloseIcon}
          iconColor={"white"}
        />
        <h2 className="text-center font-medium text-2xl text-shadow-xs mt-3 mb-7">
          Save Dashboard
        </h2>
        <div className="flex">
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
            title={"Overwrite"}
            options={{
              icon: "overwrite",
              onClick: () =>
                setTab("saveDashboard", CONSTANTS.TABS.SAVEDASHBOARD.OVERWRITE),
              active: isOverwriteTab,
            }}
          />
        </div>
        {tab === CONSTANTS.TABS.SAVEDASHBOARD.SAVE && <SaveNewDashboard />}
        {tab === CONSTANTS.TABS.SAVEDASHBOARD.OVERWRITE && (
          <OverwriteDashboard />
        )}
      </div>
    </Overlay>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.dashboards.isFetching,
    currentDashboard: state.dashboards.currentDashboard,
    savedDashboards: state.dashboards.savedDashboards,
    saveDashboardModal: state.navigation.modal.saveDashboard,
    tab: state.navigation.tabs.saveDashboard,
    isLoggedIn: !!state.users.data?.email,
    isSaveTab:
      state.navigation.tabs.saveDashboard === CONSTANTS.TABS.SAVEDASHBOARD.SAVE,
    isOverwriteTab:
      state.navigation.tabs.saveDashboard ===
      CONSTANTS.TABS.SAVEDASHBOARD.OVERWRITE,
  };
};

const mapDispatchToProps = {
  setModal,
  getDashboards,
  setTab,
  createDashboard,
  updateDashboard,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveDashboardModal);
