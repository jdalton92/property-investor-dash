import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Button from "../Shared/Button";
import SavedDashboardDropdown from "./SavedDashboardDropdown";
import {
  formatDate,
  getDashboardTypeAndBaseUrl,
} from "../../utils/dashboardHelper";

const SavedDashboards = ({ isBottomRow, index, dashboard }) => {
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
      <td className={`${isBottomRow ? "rounded-bl-2xl" : ""}`}>
        <span>{index}</span>
      </td>
      <td>
        <span className="line-clamp-2">{dashboard.description}</span>
      </td>
      <td>
        <span className="line-clamp-2">{dashboard.address}</span>
      </td>
      <td>
        <span className="line-clamp-2">{type}</span>
      </td>
      <td>
        <span>{formatDate(dashboard.created)}</span>
      </td>
      <td>
        <span>{dashboard.updated ? formatDate(dashboard.updated) : "-"}</span>
      </td>
      <td className={`${isBottomRow ? "rounded-br-2xl" : ""}`}>
        <div className="relative" ref={ref}>
          <Button
            options={{
              styleType: "secondary-transparent",
              buttonClass: "w-8 h-8 rounded-md justify-center",
              ariaLabel: "Actions",
              ariaPosition: "left",
              icon: "horizontal-dots",
              iconClass: "h-5 w-5",
              onClick: () => setShowDropdown(!showDropdown),
            }}
          />
          {showDropdown && <SavedDashboardDropdown dashboard={dashboard} />}
        </div>
      </td>
    </tr>
  );
};

export default connect(null, null)(SavedDashboards);
