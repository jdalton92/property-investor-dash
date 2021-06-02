import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Button from "./Shared/Button";
import DashboardDropdown from "./DashboardDropdown";
import {
  formatDate,
  getDashboardTypeAndBaseUrl,
} from "../utils/dashboardHelper";
import VerticalDots from "../styles/svg/vertical-dots.svg";

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
    <tr className="hover">
      <td>
        <span className="ml4">{index}</span>
      </td>
      <td>
        <span className="bold line-clamp-2">{dashboard.description}</span>
      </td>
      <td>
        <span className="line-clamp-2">{dashboard.address}</span>
      </td>
      <td>
        <span className="line-clamp-1">{type}</span>
      </td>
      <td>
        <span className="line-clamp-1">{formatDate(dashboard.created)}</span>
      </td>
      <td>
        <span className="line-clamp-1">
          {dashboard.updated ? formatDate(dashboard.updated) : "-"}
        </span>
      </td>
      <td className="relative">
        <div ref={ref}>
          <Button
            ariaLabel={"Actions"}
            dataBalloonPos={"left"}
            extraClass={"button-transp-p align-c justify-c"}
            onClick={() => setShowDropdown(!showDropdown)}
            iconUrl={VerticalDots}
            iconColor={"#51535c"}
          />
          {showDropdown && <DashboardDropdown dashboard={dashboard} />}
        </div>
      </td>
    </tr>
  );
};

export default connect(null, null)(SavedDashboards);
