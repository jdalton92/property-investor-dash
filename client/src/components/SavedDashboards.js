import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDashboards } from "../reducers/dashboardsReducer";
import Loader from "./Shared/Loader";
import SavedDashboard from "./SavedDashboard";

const SavedDashboards = ({ getDashboards, isFetching, savedDashboards }) => {
  const limit = 5;
  const [params, setParams] = useState({ limit });
  useEffect(() => {
    getDashboards(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (isFetching) {
    return <Loader />;
  } else {
    const currentPage = savedDashboards.nextPage
      ? savedDashboards.nextPage - 1
      : savedDashboards.pagesCount;
    return (
      <>
        <h1 className="f24 bold mt16 mb16">Saved Dashboards</h1>
        {savedDashboards?.resultsCount > 0 ? (
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
              onClick={() =>
                setParams({ limit, page: savedDashboards.nextPage })
              }
              type="button"
              disabled={!savedDashboards.nextPage}
              className={`${
                savedDashboards.nextPage ? "bg-blue-1" : "bg-4"
              } r bs-3 font-white flex-row align-c justify-c`}
            >
              Next
            </button>
          </div>
        ) : null}
        {!savedDashboards?.resultsCount && <div>No saved dashboards...</div>}
        {savedDashboards?.resultsCount > 0 && (
          <table
            id="save-overwrite"
            className="dashboard-table o-x-auto w100 r bs-3 bg-1 "
          >
            <thead>
              <tr>
                <th>
                  <span className="line-clamp-1">Ref</span>
                </th>
                <th>
                  <span className="line-clamp-1">Description</span>
                </th>
                <th>
                  <span className="line-clamp-1">Address</span>
                </th>
                <th>
                  <span className="line-clamp-1">Type</span>
                </th>
                <th>
                  <span className="line-clamp-1 h500">Created</span>
                </th>
                <th>
                  <span className="line-clamp-1 h768">Updated</span>
                </th>
                <th>
                  <span className="line-clamp-1">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {savedDashboards.resultsCount > 0 &&
                savedDashboards.results.map((d, i) => {
                  const index = (currentPage - 1) * limit + i + 1;
                  return <SavedDashboard key={i} index={index} dashboard={d} />;
                })}
            </tbody>
          </table>
        )}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedDashboards);
