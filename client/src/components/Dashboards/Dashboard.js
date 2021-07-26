import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "../Shared/Button";
import { editDashboard } from "../../reducers/dashboardsReducer";
import {
  getCashflow,
  getDashboardAndCashflow,
} from "../../reducers/cashflowsReducer";
import { setModal } from "../../reducers/navigationReducer";
import { setNotification } from "../../reducers/notificationReducer";
import OwnerOccupierInvestorDashboard from "./OwnerOccupierInvestorDashboard";
import DeveloperDashboard from "./DeveloperDashboard";
import { CONSTANTS } from "../../constants/constants";
import {
  isEmpty,
  getDashboardTypeAndBaseUrl,
} from "../../utils/dashboardHelper";
import LoadingDashboard from "./LoadingDashboard";

const OccupierDashboard = ({
  isFetchingDashboard,
  isFetchingCashflow,
  currentDashboard,
  getDashboardAndCashflow,
  getCashflow,
  editDashboard,
  setModal,
  setNotification,
}) => {
  const id = useParams().id;
  const history = useHistory();

  useEffect(() => {
    if (id) {
      getDashboardAndCashflow(id);
    } else if (currentDashboard.type && currentDashboard.assumptions) {
      getCashflow(currentDashboard.type, currentDashboard.assumptions);
    } else {
      history.push("/calculator-types");
      setNotification("Error loading dashboard", CONSTANTS.NOTIFICATION.ERROR);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = () => {
    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, true);
  };

  const handleEdit = (baseUrl) => {
    editDashboard();
    history.push(`/${baseUrl}/edit`);
  };

  if (
    isFetchingDashboard ||
    isFetchingCashflow ||
    isEmpty(currentDashboard.assumptions)
  ) {
    return <LoadingDashboard />;
  } else {
    const { type, baseUrl } = getDashboardTypeAndBaseUrl(currentDashboard);
    return (
      <div className="animate-fade-in">
        <div className="flex justify-between">
          <h2 className="my-2 text-xl font-semibold">{type} Dashboard</h2>
          <div className="flex">
            <Button
              label={"Save"}
              type={"button"}
              options={{
                styleType: "primary",
                buttonClass: "h-10 px-2 mr-2",
                icon: "save",
                iconClass: "h-8 w-8 mr-2",
                onClick: () => handleSave(),
              }}
            />
            <Button
              label={"Edit"}
              type={"button"}
              options={{
                styleType: "secondary",
                buttonClass: "h-10 px-2",
                icon: "edit",
                iconClass: "h-8 w-8 mr-2",
                onClick: () => handleEdit(baseUrl),
              }}
            />
          </div>
        </div>
        {(currentDashboard.type === CONSTANTS.TYPES.OCCUPIER ||
          currentDashboard.type === CONSTANTS.TYPES.INVESTOR) && (
          <OwnerOccupierInvestorDashboard />
        )}
        {currentDashboard.type === CONSTANTS.TYPES.DEVELOPER && (
          <DeveloperDashboard />
        )}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentDashboard: state.dashboards.currentDashboard,
    isFetchingDashboard: state.dashboards.isFetching,
    isFetchingCashflow: state.cashflows.isFetching,
  };
};

const mapDispatchToProps = {
  setModal,
  getDashboardAndCashflow,
  getCashflow,
  editDashboard,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(OccupierDashboard);
