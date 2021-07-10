import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { setModal } from "../../reducers/navigationReducer";
import {
  getDashboards,
  updateDashboard,
} from "../../reducers/dashboardsReducer";
import {
  required,
  maxLength,
  minLength,
} from "../../utils/formValidatorHelper";
import { formatDate } from "../../utils/dashboardHelper";
import { getPaginateOptions } from "../../utils/dashboardHelper";
import { CONSTANTS } from "../../static/constants";
import LoadingSavedDashboards from "../SavedDashboards/LoadingSavedDashboards";
import { setNotification } from "../../reducers/notificationReducer";
import { getDashboardTypeAndBaseUrl } from "../../utils/dashboardHelper";
import Input from "../Shared/FinalForm/Input";
import Button from "../Shared/FinalForm/Button";
import Icon from "../Shared/Icon";

const OverwriteDashboard = ({
  isFetching,
  getDashboards,
  currentDashboard,
  savedDashboards,
  setModal,
  updateDashboard,
  setNotification,
  isLoggedIn,
}) => {
  const limit = 5;
  const [selectedDashboardId, setSelectedDashboardId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getDashboards({ limit, page: currentPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleOverwrite = async ({ address, description }) => {
    if (!isLoggedIn) {
      setNotification("Log in to save dashboard", CONSTANTS.NOTIFICATION.ERROR);
      return;
    }

    // New dashboard
    const newDashboard = {
      type: currentDashboard.type,
      address,
      description,
      assumptions: currentDashboard.assumptions,
    };
    await updateDashboard(selectedDashboardId, newDashboard);
    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, false);
  };

  const noSavedDashboards = !isFetching && savedDashboards.resultsCount === 0;
  const showSavedDashboards = !isFetching && savedDashboards.resultsCount > 0;

  const pageOptions = getPaginateOptions(
    currentPage,
    savedDashboards.pagesCount
  );
  return (
    <Form
      onSubmit={handleOverwrite}
      validate={(values) => {
        const errors = {};
        if (!selectedDashboardId) {
          errors.dashboard = "Required";
        }
        return errors;
      }}
      render={({ handleSubmit, form, values }) => (
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="overwrite-dashboard"
            className="text-sm leading-7 text-gray-600 cursor-pointer"
          >
            Dashboard <span className="text-red-500 required-dot">*</span>
          </label>
          {isFetching && <LoadingSavedDashboards />}
          {noSavedDashboards && (
            <div className="mt20 f16">No saved dashboards...</div>
          )}
          {showSavedDashboards && (
            <>
              <Field name="dashboard">
                {({ input, meta }) => (
                  <div className="overflow-x-auto">
                    <table
                      id="overwrite-dashboard"
                      className={`w-full text-left mb-4 rounded-md ${
                        meta.error && meta.touched
                          ? "ring-2 border-red-600 ring-red-300"
                          : ""
                      }`}
                    >
                      <thead>
                        <tr className="border-b border-gray-200 h-8 text-sm">
                          <th className="font-normal text-center">
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
                            <span>Overwrite</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {savedDashboards.results.map((d, i) => {
                          const { type } = getDashboardTypeAndBaseUrl(d);
                          const currentPage = savedDashboards.nextPage
                            ? savedDashboards.nextPage - 1
                            : savedDashboards.pagesCount;
                          const index = (currentPage - 1) * limit + i + 1;
                          const isBottomRow =
                            index === limit ||
                            index === savedDashboards.resultsCount;
                          return (
                            <tr
                              key={i}
                              onClick={() =>
                                selectedDashboardId === d._id
                                  ? setSelectedDashboardId(null)
                                  : setSelectedDashboardId(d._id)
                              }
                              className={`border-b border-gray-200 h-12 hover:bg-gray-50 ${
                                d._id === selectedDashboardId
                                  ? "bg-gray-50"
                                  : ""
                              }`}
                            >
                              <td
                                className={`text-center ${
                                  isBottomRow ? "rounded-bl-2xl" : ""
                                }`}
                              >
                                {index}
                              </td>
                              <td>
                                <span className="line-clamp-2">
                                  {d.description}
                                </span>
                              </td>
                              <td>
                                <span className="line-clamp-2">
                                  {d.address}
                                </span>
                              </td>
                              <td>
                                <span className="line-clamp-2">{type}</span>
                              </td>
                              <td>
                                <span>{formatDate(d.created)}</span>
                              </td>
                              <td>
                                <span>
                                  {d.updated ? formatDate(d.updated) : "-"}
                                </span>
                              </td>
                              <td
                                className={`${
                                  isBottomRow ? "rounded-br-2xl" : ""
                                }`}
                              >
                                <input
                                  className="ml16"
                                  type="checkbox"
                                  checked={d._id === selectedDashboardId}
                                  value={d._id}
                                  onChange={() =>
                                    selectedDashboardId === d._id
                                      ? setSelectedDashboardId(null)
                                      : setSelectedDashboardId(d._id)
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {meta.error && meta.touched && (
                      <span className="absolute text-xs text-red-500 -mt-3.5">
                        {meta.error}
                      </span>
                    )}
                  </div>
                )}
              </Field>
              <div className="flex justify-end h-8">
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
                {pageOptions.map((page, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={!page.link}
                      className={`px-4 bg-white border-l border-t border-b ${
                        page.active
                          ? "border bg-indigo-500 border-indigo-500 text-white font-semibold"
                          : "text-gray-600"
                      } ${
                        page.link
                          ? "hover:bg-gray-100 hover:text-gray-600"
                          : "cursor-default"
                      } ${pageOptions.length === index + 1 ? "border-r" : ""}`}
                      onClick={() => setCurrentPage(page.label)}
                    >
                      {page.label}
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
            </>
          )}
          <Input
            label={"Description"}
            name={"description"}
            options={{
              id: "overwrite-description",
              validators: [required, minLength(3), maxLength(200)],
              type: "text",
              extraClass: "mb-4",
            }}
          />
          <Input
            label={"Address"}
            name={"address"}
            options={{
              id: "overwrite-address",
              validators: [required, minLength(3), maxLength(200)],
              type: "text",
              extraClass: "mb-8",
            }}
          />
          <Button
            label={"Save"}
            type={"submit"}
            options={{
              styleType: "primary",
              buttonClass: "w-20",
              isDisabled: isFetching,
            }}
          />
        </form>
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.dashboards.isFetching,
    currentDashboard: state.dashboards.currentDashboard,
    savedDashboards: state.dashboards.savedDashboards,
    isLoggedIn: !!state.users.data?.email,
  };
};

const mapDispatchToProps = {
  setModal,
  getDashboards,
  updateDashboard,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(OverwriteDashboard);
