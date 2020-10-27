import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDashboards, deleteDashboard } from "../reducers/dashboardReducer";
import Loader from "./Shared/Loader";
import Button from "./Shared/Button";
import { formatDate } from "../utils/dashboardHelper";
import OpenIcon from "../styles/svg/tick.svg";
import CloseIcon from "../styles/svg/close.svg";

const SavedDashboards = ({
  getDashboards,
  isFetching,
  savedDashboards,
  deleteDashboard,
}) => {
  const history = useHistory();
  useEffect(() => {
    getDashboards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (dashhboard) => {
    const confirm = window.confirm(
      `Delete dashboard: ${dashhboard.description}?`
    );
    if (confirm) {
      deleteDashboard(dashhboard._id);
    }
  };

  if (isFetching) {
    return <Loader />;
  } else {
    return (
      <>
        <h1 className="f24 bold mt16 mb16">Saved Dashboards</h1>
        <div className="r bs-3 bg-1 p20 mb20">
          <div className="mh700 o-y-auto">
            <table id="save-overwrite" className="overpayments w100 mb20">
              <thead>
                <tr>
                  <th className="h768">Ref</th>
                  <th>Description</th>
                  <th className="h400">Address</th>
                  <th className="h768">Type</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {savedDashboards.map((d, i) => {
                  let baseUrl;
                  let type;
                  if (d.values.type === "developer") {
                    baseUrl = "developer/dash";
                    type = "Developer";
                  } else if (d.values?.investor) {
                    baseUrl = "investor/dash";
                    type = "Investor";
                  } else {
                    baseUrl = "owner-occupier/dash";
                    type = "Owner-Occupier";
                  }
                  return (
                    <tr key={i}>
                      <td className="h768">{i + 1}</td>
                      <td>{d.description}</td>
                      <td className="h400">{d.address}</td>
                      <td className="h768">{type}</td>
                      <td>{formatDate(d.date)}</td>
                      <td>
                        <Button
                          ariaLabel={"Open"}
                          dataBalloonPos={"left"}
                          extraClass={"button-p align-c justify-c mb12"}
                          onClick={() => history.push(`${baseUrl}/${d._id}`)}
                          iconUrl={OpenIcon}
                          iconColor={"white"}
                        />
                        <Button
                          ariaLabel={"Delete"}
                          dataBalloonPos={"left"}
                          extraClass={"button-p align-c justify-c"}
                          onClick={() => handleDelete(d)}
                          iconUrl={CloseIcon}
                          iconColor={"white"}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    savedDashboards: state.dashboards.savedDashboards,
    isFetching: state.dashboards.isFetching,
  };
};

const mapDispatchToProps = {
  getDashboards,
  deleteDashboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedDashboards);
