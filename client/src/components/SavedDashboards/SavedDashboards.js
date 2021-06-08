import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDashboards } from "../../reducers/dashboardsReducer";
import LoadingSavedDashboards from "./LoadingSavedDashboards";
import Icon from "../Shared/Icon";
import SavedDashboard from "./SavedDashboard";

const SavedDashboards = ({ getDashboards, isFetching, savedDashboards }) => {
  const limit = 5;
  const [params, setParams] = useState({ limit });
  useEffect(() => {
    getDashboards(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (isFetching) {
    return (
      <>
        <h1 className="my-2 text-xl font-semibold">Saved Dashboards</h1>
        <LoadingSavedDashboards />
      </>
    );
  } else {
    const currentPage = savedDashboards.nextPage
      ? savedDashboards.nextPage - 1
      : savedDashboards.pagesCount;
    return (
      <>
        <h1 className="my-2 text-xl font-semibold">Saved Dashboards</h1>
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
          <>
            <div className="w-full shadow-xl rounded-2xl bg-white mb-4 overflow-hidden">
              <table id="save-overwrite" className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 h-8">
                    <th>
                      <span>Ref</span>
                    </th>
                    <th>
                      <span>Description</span>
                    </th>
                    <th>
                      <span>Address</span>
                    </th>
                    <th>
                      <span>Type</span>
                    </th>
                    <th>
                      <span>Created</span>
                    </th>
                    <th>
                      <span>Updated</span>
                    </th>
                    <th>
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedDashboards.resultsCount > 0 &&
                    savedDashboards.results.map((d, i) => {
                      const index = (currentPage - 1) * limit + i + 1;
                      return (
                        <SavedDashboard key={i} index={index} dashboard={d} />
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="flex h-12">
              <button
                type="button"
                className="px-2 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
              >
                <Icon icon={"chevron-left"} className={"w-6 h-6"} />
              </button>
              <button
                type="button"
                className="px-4 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 "
              >
                1
              </button>
              <button
                type="button"
                className="px-4 border text-base text-gray-600 bg-white hover:bg-gray-100"
              >
                2
              </button>
              <button
                type="button"
                className="px-4 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100"
              >
                3
              </button>
              <button
                type="button"
                className="px-4 border text-base text-gray-600 bg-white hover:bg-gray-100"
              >
                4
              </button>
              <button
                type="button"
                className="px-2 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
              >
                <Icon icon={"chevron-right"} className={"w-6 h-6"} />
              </button>
            </div>
          </>
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
