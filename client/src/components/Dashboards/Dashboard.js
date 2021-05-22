import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../Shared/Loader";
import { Icon } from "../Shared/Icon";
import { editDashboard } from "../../reducers/dashboardReducer";
import {
  getCashflow,
  getDashboardAndCashflow,
} from "../../reducers/cashflowReducer";
import { setModal } from "../../reducers/navigationReducer";
import { setNotification } from "../../reducers/notificationReducer";
import SaveIcon from "../../styles/svg/save.svg";
import EditIcon from "../../styles/svg/edit.svg";
import OwnerOccupierInvestorDashboard from "./OwnerOccupierInvestorDashboard";
import DeveloperDashboard from "./DeveloperDashboard";
import { CONSTANTS } from "../../static/constants";
import {
  isEmpty,
  getDashboardTypeAndBaseUrl,
} from "../../utils/dashboardHelper";

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
      setNotification("Error loading dashboard", CONSTANTS.NOTIFICATION.ERROR);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
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
    return <Loader />;
  } else {
    const { type, baseUrl } = getDashboardTypeAndBaseUrl(currentDashboard);
    return (
      <div className="fade-in">
        <div className="dash-row relative">
          <h2 className="f20 bold mt16 mb16">{type} Dashboard</h2>
          <div className="dash-btns flex-row">
            <button
              type="button"
              className="form-button-p bs-3 font-white pt4 pb4 flex-row align-c justify-c"
              onClick={handleSave}
            >
              <Icon
                size={"20px"}
                url={SaveIcon}
                color={"white"}
                hover={false}
                active={false}
              />
              <span className="ml8">Save</span>
            </button>
            <button
              type="button"
              className="form-button-s bs-3 font-white pt4 pb4 flex-row align-c justify-c"
              onClick={() => handleEdit(baseUrl)}
            >
              <Icon
                size={"20px"}
                url={EditIcon}
                color={"white"}
                hover={false}
                active={false}
              />
              <span className="ml8">Edit</span>
            </button>
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
    isFetchingCashflow: state.cashflow.isFetching,
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
