import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../Shared/Loader";
import { Icon } from "../Shared/Icon";
import { editDashboard } from "../../reducers/dashboardReducer";
import {
  getCashflow,
  getDashboardCashflow,
} from "../../reducers/cashflowReducer";
import { setModal } from "../../reducers/navigationReducer";
import { setNotification } from "../../reducers/notificationReducer";
import SaveIcon from "../../styles/svg/save.svg";
import EditIcon from "../../styles/svg/edit.svg";
import OwnerOccupierInvestorDashboard from "./OwnerOccupierInvestorDashboard";
import { CONSTANTS } from "../../static/constants";
import { isEmpty } from "../../utils/dashboardHelper";

const OccupierDashboard = ({
  isFetchingDashboard,
  isFetchingCashflow,
  currentDashboard,
  getDashboardCashflow,
  getCashflow,
  editDashboard,
  setModal,
  setNotification,
}) => {
  const id = useParams().id;
  const history = useHistory();

  useEffect(() => {
    if (id) {
      getDashboardCashflow(id);
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

  const handleEdit = (e) => {
    e.preventDefault();
    editDashboard();
    history.replace("/owner-occupier/edit");
  };

  if (isFetchingDashboard || isFetchingCashflow) {
    return <Loader />;
  } else {
    if (isEmpty(currentDashboard.assumptions)) {
      history.push("/owner-occupier/edit");
    }
    return (
      <div className="fade-in">
        <div className="dash-row relative">
          <h2 className="f20 bold mt16 mb16">Owner Occupier Dashboard</h2>
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
              onClick={handleEdit}
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
        <OwnerOccupierInvestorDashboard />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentDashboard: state.dashboards.currentDashboard,
    isFetchingDashboard: state.dashboards.isFetching,
    isFetchingCashflow: state.dashboards.isFetching,
  };
};

const mapDispatchToProps = {
  setModal,
  getDashboardCashflow,
  getCashflow,
  editDashboard,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(OccupierDashboard);
