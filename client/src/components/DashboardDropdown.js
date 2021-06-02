import React from "react";
import { connect } from "react-redux";
import { deleteDashboard } from "../reducers/dashboardsReducer";
import Button from "./Shared/Button";
import { useHistory } from "react-router-dom";
import { getDashboardTypeAndBaseUrl } from "../utils/dashboardHelper";
import OpenIcon from "../styles/svg/tick.svg";
import EditIcon from "../styles/svg/edit.svg";
import CloseIcon from "../styles/svg/close.svg";

const DashboardDropdown = ({ deleteDashboard, dashboard }) => {
  const history = useHistory();

  const handleDelete = (dashboard) => {
    const confirm = window.confirm(
      `Delete dashboard: ${dashboard.description}?`
    );
    if (confirm) {
      deleteDashboard(dashboard._id);
    }
  };

  const { baseUrl } = getDashboardTypeAndBaseUrl(dashboard);

  return (
    <div className="dashboard-dropdown flex-col p4 fade-in r bs-3">
      <Button
        extraClass={"button-transp-p align-c"}
        captionClass={"ml8"}
        caption={"Open"}
        onClick={() => history.push(`/dashboard/${dashboard._id}`)}
        iconUrl={OpenIcon}
        iconColor={"#51535c"}
      />
      <Button
        extraClass={"button-transp-p align-c"}
        captionClass={"ml8"}
        caption={"Edit"}
        onClick={() => history.push(`/${baseUrl}/edit/${dashboard._id}`)}
        iconUrl={EditIcon}
        iconColor={"#51535c"}
      />
      <Button
        extraClass={"button-transp-p align-c"}
        captionClass={"ml8"}
        caption={"Delete"}
        onClick={() => handleDelete(dashboard)}
        iconUrl={CloseIcon}
        iconColor={"#51535c"}
      />
    </div>
  );
};

const mapDispatchToProps = { deleteDashboard };

export default connect(null, mapDispatchToProps)(DashboardDropdown);
