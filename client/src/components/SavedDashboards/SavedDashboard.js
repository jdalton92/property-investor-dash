import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Button from "../Shared/Button";
import DashboardDropdown from "../DashboardDropdown";
import {
  formatDate,
  getDashboardTypeAndBaseUrl,
} from "../../utils/dashboardHelper";

const SavedDashboards = ({ index, dashboard }) => {
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const ref = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target) && showDropdown) {
      setShowDropdown(false);
    }
  };

  const { type } = getDashboardTypeAndBaseUrl(dashboard);

  return (
    <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
      <td>
        <span>{index}</span>
      </td>
      <td>
        <span>{dashboard.description}</span>
      </td>
      <td>
        <span>{dashboard.address}</span>
      </td>
      <td>
        <span>{type}</span>
      </td>
      <td>
        <span>{formatDate(dashboard.created)}</span>
      </td>
      <td>
        <span>{dashboard.updated ? formatDate(dashboard.updated) : "-"}</span>
      </td>
      <td>
        <div ref={ref}>
          <Button
            options={{
              styleType: "secondary-transparent",
              buttonClass: "w-10 h-10 justify-center",
              ariaLabel: "Actions",
              ariaPosition: "left",
              icon: "vertical-dots",
              iconClass: "h-4 w-4",
              onClick: () => setShowDropdown(!showDropdown),
            }}
          />
          {showDropdown && <DashboardDropdown dashboard={dashboard} />}
        </div>
      </td>
    </tr>
  );
};

export default connect(null, null)(SavedDashboards);
