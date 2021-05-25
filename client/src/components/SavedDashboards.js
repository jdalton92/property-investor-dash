import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDashboards, deleteDashboard } from "../reducers/dashboardsReducer";
import Loader from "./Shared/Loader";
import Button from "./Shared/Button";
import {
  formatDate,
  getDashboardTypeAndBaseUrl,
} from "../utils/dashboardHelper";
import OpenIcon from "../styles/svg/tick.svg";
import CloseIcon from "../styles/svg/close.svg";

const SavedDashboards = ({
  getDashboards,
  isFetching,
  savedDashboards,
  deleteDashboard,
}) => {
  const limit = 5;
  const history = useHistory();
  const [params, setParams] = useState({ limit });
  useEffect(() => {
    getDashboards(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleDelete = (dashboard) => {
    const confirm = window.confirm(
      `Delete dashboard: ${dashboard.description}?`
    );
    if (confirm) {
      deleteDashboard(dashboard._id);
    }
  };

  if (isFetching) {
    return <Loader />;
  } else {
    const currentPage = savedDashboards.nextPage
      ? savedDashboards.nextPage - 1
      : savedDashboards.pagesCount;
    return (
      <>
        <h1 className="f24 bold mt16 mb16">Saved Dashboards</h1>
        <div className="mb16 flex-row align-c">
          <button
            onClick={() =>
              setParams({
                limit,
                page: savedDashboards.previousPage,
              })
            }
            type="button"
            disabled={!savedDashboards.previousPage}
            className={`${
              savedDashboards.previousPage ? "bg-blue-1" : "bg-4"
            } mr12 r bs-3 font-white flex-row align-c justify-c`}
          >
            Prev
          </button>
          <span className="mr4">Page</span>
          <span className="bold mr4">{currentPage}</span>
          <span className="mr4">of</span>
          <span className="bold mr12">{savedDashboards.pagesCount}</span>
          <button
            onClick={() => setParams({ limit, page: savedDashboards.nextPage })}
            type="button"
            disabled={!savedDashboards.nextPage}
            className={`${
              savedDashboards.nextPage ? "bg-blue-1" : "bg-4"
            } r bs-3 font-white flex-row align-c justify-c`}
          >
            Next
          </button>
        </div>
        <div className="r bs-3 bg-1 p20 mb20">
          <div className="mh700 o-y-auto o-x-auto">
            {savedDashboards.resultsCount === 0 && (
              <div>No saved dashboards...</div>
            )}
            {savedDashboards.resultsCount > 0 && (
              <table id="save-overwrite" className="overpayments w100 mb20">
                <thead>
                  <tr>
                    <th>Ref</th>
                    <th>Description</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {savedDashboards.resultsCount > 0 &&
                    savedDashboards.results.map((d, i) => {
                      const { type } = getDashboardTypeAndBaseUrl(d);
                      const index = (currentPage - 1) * limit + i + 1;
                      return (
                        <tr key={i}>
                          <td>{index}</td>
                          <td>{d.description}</td>
                          <td>{d.address}</td>
                          <td>{type}</td>
                          <td>{formatDate(d.created)}</td>
                          <td>{d.updated ? formatDate(d.updated) : "-"}</td>
                          <td>
                            <Button
                              ariaLabel={"Open"}
                              dataBalloonPos={"left"}
                              extraClass={"button-p align-c justify-c mb12"}
                              onClick={() =>
                                history.push(`/dashboard/${d._id}`)
                              }
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
            )}
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
