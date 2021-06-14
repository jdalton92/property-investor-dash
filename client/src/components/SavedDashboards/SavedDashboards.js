import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDashboards } from "../../reducers/dashboardsReducer";
import { getPaginateOptions } from "../../utils/dashboardHelper";
import LoadingSavedDashboards from "./LoadingSavedDashboards";
import Icon from "../Shared/Icon";
import SavedDashboard from "./SavedDashboard";

const SavedDashboards = ({ getDashboards, isFetching, savedDashboards }) => {
  const limit = 5;
  const viewPages = 5;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getDashboards({ limit, page: currentPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (isFetching) {
    return (
      <>
        <h1 className="my-2 text-xl font-semibold">Saved Dashboards</h1>
        <LoadingSavedDashboards />
      </>
    );
  } else {
    const pageOptions = getPaginateOptions(
      currentPage,
      viewPages,
      savedDashboards.pagesCount
    );
    return (
      <>
        <h1 className="my-2 text-xl font-semibold">Saved Dashboards</h1>
        {!savedDashboards?.resultsCount && <div>No saved dashboards...</div>}
        {savedDashboards?.resultsCount > 0 && (
          <>
            <div className="w-full shadow-xl rounded-2xl bg-white mb-4">
              <table id="save-overwrite" className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 h-8 text-sm">
                    <th className="font-normal">
                      <span>Ref</span>
                    </th>
                    <th className="font-normal">
                      <span>Description</span>
                    </th>
                    <th className="font-normal">
                      <span>Address</span>
                    </th>
                    <th className="font-normal">
                      <span>Type</span>
                    </th>
                    <th className="font-normal">
                      <span>Created</span>
                    </th>
                    <th className="font-normal">
                      <span>Updated</span>
                    </th>
                    <th className="font-normal">
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {savedDashboards.resultsCount > 0 &&
                    savedDashboards.results.map((d, i) => {
                      const index = (currentPage - 1) * limit + i + 1;
                      const isBottomRow =
                        index === limit ||
                        index === savedDashboards.resultsCount + 1;
                      return (
                        <SavedDashboard
                          key={i}
                          isBottomRow={isBottomRow}
                          index={index}
                          dashboard={d}
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col h-12">
              <div className="flex mb-2">
                <button
                  disabled={currentPage === 1}
                  type="button"
                  className={`px-2 border-l border-t border-b text-base rounded-l-xl text-gray-600 bg-white ${
                    currentPage === 1
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(1)}
                >
                  <Icon icon={"double-chevron-left"} className={"w-6 h-6"} />
                </button>
                <button
                  disabled={currentPage === 1}
                  type="button"
                  className={`px-2 border-l border-t border-b text-base text-gray-600 bg-white ${
                    currentPage === 1
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <Icon icon={"chevron-left"} className={"w-6 h-6"} />
                </button>
                {pageOptions.map((pageNumber, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      className={`px-4 bg-white border-l border-t border-b ${
                        pageNumber === savedDashboards.currentPage
                          ? "border bg-indigo-500 border-indigo-500 text-white font-semibold"
                          : "text-gray-600"
                      } hover:bg-gray-100 hover:text-gray-600 ${
                        pageOptions.length === index + 1 ? "border-r" : ""
                      }`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  disabled={currentPage === savedDashboards.pagesCount}
                  type="button"
                  className={`px-2 border-t border-r border-b  text-base text-gray-600 bg-white ${
                    currentPage === savedDashboards.pagesCount
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <Icon icon={"chevron-right"} className={"w-6 h-6"} />
                </button>
                <button
                  disabled={currentPage === savedDashboards.pagesCount}
                  type="button"
                  className={`px-2 border-t border-r border-b text-base rounded-r-xl text-gray-600 bg-white ${
                    currentPage === savedDashboards.pagesCount
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(savedDashboards.pagesCount)}
                >
                  <Icon icon={"double-chevron-right"} className={"w-6 h-6"} />
                </button>
              </div>
              <h3 className="text-xs">
                Page {currentPage} of {savedDashboards.pagesCount}
              </h3>
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
