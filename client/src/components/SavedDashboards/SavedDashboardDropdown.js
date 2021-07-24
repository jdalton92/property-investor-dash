import React from "react";
import { connect } from "react-redux";
import { deleteDashboard } from "../../reducers/dashboardsReducer";
import Button from "../Shared/Button";
import { useHistory } from "react-router-dom";
import { getDashboardTypeAndBaseUrl } from "../../utils/dashboardHelper";

const SavedDashboardDropdown = ({ deleteDashboard, dashboard }) => {
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
    <div className="z-20 animate-fade-in absolute top-9 right-6 flex flex-col shadow-xl rounded-2xl p-2 w-40 bg-white">
      <Button
        label={"Open"}
        options={{
          styleType: "secondary-transparent",
          buttonClass: "w-full h-10 pl-2",
          labelClass: "ml-1",
          icon: "tick",
          iconClass: "h-8 w-8",
          onClick: () => history.push(`/dashboard/${dashboard._id}`),
        }}
      />
      <Button
        label={"Edit"}
        options={{
          styleType: "secondary-transparent",
          buttonClass: "w-full h-10 pl-2",
          labelClass: "ml-1",
          icon: "edit",
          iconClass: "h-8 w-8",
          onClick: () => history.push(`/${baseUrl}/edit/${dashboard._id}`),
        }}
      />
      <Button
        label={"Delete"}
        options={{
          styleType: "secondary-transparent",
          buttonClass: "w-full h-10 pl-2",
          labelClass: "ml-1",
          icon: "close",
          iconClass: "h-8 w-8",
          onClick: () => handleDelete(dashboard),
        }}
      />
    </div>
  );
};

const mapDispatchToProps = { deleteDashboard };

export default connect(null, mapDispatchToProps)(SavedDashboardDropdown);
