import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
  const handleDelete = (dashboard) => {
    const confirm = window.confirm(
      `Are you sure you want to delete dashboard: ${dashboard.description}?`
    );
    if (confirm) {
      deleteDashboard(dashboard._id);
    }
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
      <td className="px-2">
        <span>{dashboard.updated ? formatDate(dashboard.updated) : "-"}</span>
      </td>
      <td className={`flex mt-3 pl-2 ${isBottomRow ? "rounded-br-2xl" : ""}`}>
        <Link
          className="cursor-pointer underline text-blue-600 hover:text-blue-900"
          to={`/dashboard/${dashboard._id}`}
        >
          View
        </Link>
        <Link
          className="cursor-pointer underline text-blue-600 hover:text-blue-900 ml-2"
          to={`/${baseUrl}/edit/${dashboard._id}`}
        >
          Edit
        </Link>
        <span
          className="cursor-pointer underline text-blue-600 hover:text-blue-900 ml-2"
          onClick={() => handleDelete(dashboard)}
        >
          Delete
        </span>
      </td>
    </tr>
  );
};

const mapDispatchToProps = { deleteDashboard };

export default connect(null, mapDispatchToProps)(SavedDashboards);
