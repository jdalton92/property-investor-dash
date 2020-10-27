import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../Shared/Loader";
import { Icon } from "../Shared/Icon";
import {
  getDashboard,
  preSaveDashboard,
} from "../../reducers/dashboardReducer";
import { setModal } from "../../reducers/navigationReducer";
import SaveIcon from "../../styles/svg/save.svg";
import EditIcon from "../../styles/svg/edit.svg";
import OwnerOccupierInvestorDashboard from "./OwnerOccupierInvestorDashboard";
import { CONSTANTS } from "../../static/constants";

const OccupierDashboard = ({
  isFetching,
  preSave,
  currentDashboard,
  getDashboard,
  preSaveDashboard,
  setModal,
}) => {
  const id = useParams().id;
  const history = useHistory();

  useEffect(() => {
    if (id && !preSave) {
      getDashboard(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    preSaveDashboard();
    if (id) {
      history.push(`/owner-occupier/edit/${id}`);
    } else {
      history.replace("/owner-occupier/edit");
    }
  };

  const isEmpty = (obj) =>
    Object.keys(obj).length === 0 && obj.constructor === Object;

  if (isFetching || (isEmpty(currentDashboard.values) && id)) {
    return <Loader />;
  } else {
    if (isEmpty(currentDashboard.values)) {
      history.push("/owner-occupier/edit");
    }
    return (
      <div className="fade-in">
        <div className="dash-row relative">
          <h2 className="f20 bold mt16 mb16">Owner Occupier Dashboard</h2>
          <div className="dash-btns flex-row">
            <button
              type="submit"
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
              type="submit"
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
    currentDashboard: state.dashboards.currentDashboard.data,
    preSave: state.dashboards.currentDashboard.preSave,
    isFetching: state.dashboards.isFetching,
  };
};

const mapDispatchToProps = {
  setModal,
  getDashboard,
  preSaveDashboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(OccupierDashboard);
