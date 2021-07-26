import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../Shared/Button";
import { deleteDashboard } from "../../reducers/dashboardsReducer";
import {
  formatDate,
  getDashboardTypeAndBaseUrl,
} from "../../utils/dashboardHelper";

const SavedDashboards = ({
  isBottomRow,
  index,
  dashboard,
  deleteDashboard,
}) => {
  const history = useHistory();

  const handleDelete = (dashboard) => {
    const confirm = window.confirm(
      `Are you sure you want to delete dashboard: ${dashboard.description}?`
    );
    if (confirm) {
      deleteDashboard(dashboard._id);
    }
  };

  const handleLink = (url) => {
    history.push(url);
  };

  const { type, baseUrl } = getDashboardTypeAndBaseUrl(dashboard);

  return (
    <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
      <td className={`text-center px-2 ${isBottomRow ? "rounded-bl-2xl" : ""}`}>
        <span>{index}</span>
      </td>
      <td>
        <span className="line-clamp-2 px-2">{dashboard.description}</span>
      </td>
      <td>
        <span className="line-clamp-2 px-2">{dashboard.address}</span>
      </td>
      <td>
        <span className="line-clamp-2 px-2">{type}</span>
      </td>
      <td className="px-2">
        <span>{formatDate(dashboard.created)}</span>
      </td>
      <td className={`flex pl-2 ${isBottomRow ? "rounded-br-2xl" : ""}`}>
        <Button
          type={"button"}
          options={{
            styleType: "secondary-transparent",
            buttonClass: "w-10 h-10 justify-center",
            icon: "tick",
            iconClass: "h-8 w-8",
            onClick: () => handleLink(`/dashboard/${dashboard._id}`),
            ariaLabel: "View",
            ariaPosition: "left",
          }}
        />
        <Button
          type={"button"}
          options={{
            styleType: "secondary-transparent",
            buttonClass: "w-10 h-10 justify-center",
            icon: "edit",
            iconClass: "h-8 w-8",
            onClick: () => handleLink(`/${baseUrl}/edit/${dashboard._id}`),
            ariaLabel: "Edit",
            ariaPosition: "left",
          }}
        />
        <Button
          type={"button"}
          options={{
            styleType: "secondary-transparent",
            buttonClass: "w-10 h-10 justify-center",
            icon: "close",
            iconClass: "h-8 w-8",
            onClick: () => handleDelete(dashboard),
            ariaLabel: "Delete",
            ariaPosition: "left",
          }}
        />
      </td>
    </tr>
  );
};

const mapDispatchToProps = { deleteDashboard };

export default connect(null, mapDispatchToProps)(SavedDashboards);
