import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { setModal, setTab } from "../../reducers/navigationReducer";
import {
  getDashboards,
  createDashboard,
  updateDashboard,
} from "../../reducers/dashboardsReducer";
import {
  composeValidators,
  required,
  maxLength,
  minLength,
} from "../../utils/formValidatorHelper";
import { formatDate } from "../../utils/dashboardHelper";
import { CONSTANTS } from "../../static/constants";
import Loader from "../Shared/Loader";
import { setNotification } from "../../reducers/notificationReducer";
import { getDashboardTypeAndBaseUrl } from "../../utils/dashboardHelper";

const OverwriteDashboard = ({
  isFetching,
  currentDashboard,
  savedDashboards,
  setModal,
  updateDashboard,
  setNotification,
  isLoggedIn,
}) => {
  const [selectedDashboardId, setSelectedDashboardId] = useState(null);

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

  const handleChangePage = (page) => {
    setSelectedDashboardId(null);
    setParams({ limit, page });
  };
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
        <form className="save-form mt20 mb20" onSubmit={handleSubmit}>
          <div className="flex-row align-c relative">
            <label htmlFor="overwrite-dashboard" className="f16 mb8">
              Dashboard
              <span className="font-red f12 bold ml4">*</span>
            </label>
          </div>
          {isFetching && <Loader />}
          {!isFetching && savedDashboards.resultsCount === 0 && (
            <div className="mt20 f16">No saved dashboards...</div>
          )}
          {!isFetching && savedDashboards.resultsCount > 0 && (
            <>
              <div className="mb16 flex-row align-c">
                <button
                  onClick={() => handleChangePage(savedDashboards.previousPage)}
                  type="button"
                  disabled={!savedDashboards.previousPage}
                  className={`${
                    savedDashboards.previousPage ? "bg-blue-1" : "bg-4"
                  } mr12 r bs-3 font-white flex-row align-c justify-c`}
                >
                  Prev
                </button>
                <span className="mr4">Page</span>
                <span className="bold mr4">
                  {savedDashboards.nextPage
                    ? savedDashboards.nextPage - 1
                    : savedDashboards.pagesCount}
                </span>
                <span className="mr4">of</span>
                <span className="bold mr12">{savedDashboards.pagesCount}</span>
                <button
                  onClick={() => handleChangePage(savedDashboards.nextPage)}
                  type="button"
                  disabled={!savedDashboards.nextPage}
                  className={`${
                    savedDashboards.nextPage ? "bg-blue-1" : "bg-4"
                  } r bs-3 font-white flex-row align-c justify-c`}
                >
                  Next
                </button>
              </div>
              <Field name="dashboard">
                {({ input, meta }) => (
                  <div className="relative mb20">
                    <div className="mh300 o-y-auto o-x-auto">
                      <table
                        id="overwrite-dashboard"
                        className="dashboard-table w100"
                      >
                        <thead>
                          <tr>
                            <th>Ref</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Created</th>
                            <th>Updated</th>
                            <th>Overwrite</th>
                          </tr>
                        </thead>
                        <tbody>
                          {savedDashboards.results.map((d, i) => {
                            const { type } = getDashboardTypeAndBaseUrl(d);
                            const currentPage = savedDashboards.nextPage
                              ? savedDashboards.nextPage - 1
                              : savedDashboards.pagesCount;
                            return (
                              <tr
                                key={i}
                                onClick={() =>
                                  selectedDashboardId === d._id
                                    ? setSelectedDashboardId(null)
                                    : setSelectedDashboardId(d._id)
                                }
                                className={`hover ${
                                  d._id === selectedDashboardId
                                    ? "selected"
                                    : ""
                                }`}
                              >
                                <td>{(currentPage - 1) * limit + i + 1}</td>
                                <td>{d.description}</td>
                                <td>{type}</td>
                                <td>{formatDate(d.created)}</td>
                                <td>
                                  {d.updated ? formatDate(d.updated) : "-"}
                                </td>
                                <td>
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
                    </div>
                    {meta.error && meta.touched && (
                      <span className="form-error f10">{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
            </>
          )}
          <div className="flex-row align-c relative">
            <label htmlFor="overwrite-description" className="f16 mb8">
              Description
              <span className="font-red f12 bold ml4">*</span>
            </label>
          </div>
          <Field
            name="description"
            validate={composeValidators(required, minLength(3), maxLength(200))}
          >
            {({ input, meta }) => (
              <div className="relative mb20">
                <input
                  id="overwrite-description"
                  className={`form-input bs-1 w100 ${
                    meta.error && meta.touched ? "input-error" : ""
                  }`}
                  placeholder="Description"
                  type="text"
                  {...input}
                />
                {meta.error && meta.touched && (
                  <span className="form-error f10">{meta.error}</span>
                )}
              </div>
            )}
          </Field>
          <div className="flex-row align-c relative">
            <label htmlFor="overwrite-address" className="f16 mb8">
              Address
              <span className="font-red f12 bold ml4">*</span>
            </label>
          </div>
          <Field
            name="address"
            validate={composeValidators(required, minLength(3), maxLength(200))}
          >
            {({ input, meta }) => (
              <div className="relative mb20">
                <input
                  id="overwrite-address"
                  className={`form-input bs-1 w100 ${
                    meta.error && meta.touched ? "input-error" : ""
                  }`}
                  placeholder="Address"
                  type="text"
                  {...input}
                />
                {meta.error && meta.touched && (
                  <span className="form-error f10">{meta.error}</span>
                )}
              </div>
            )}
          </Field>
          <div className="form-buttons">
            <button
              type="submit"
              className="form-button-p bs-3 font-white mt12 pt8 pb8"
            >
              Save
            </button>
          </div>
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
    saveDashboardModal: state.navigation.modal.saveDashboard,
    tab: state.navigation.tabs.saveDashboard,
    isLoggedIn: !!state.users.data?.email,
    isSaveTab:
      state.navigation.tabs.saveDashboard === CONSTANTS.TABS.SAVEDASHBOARD.SAVE,
    isOverwriteTab:
      state.navigation.tabs.saveDashboard ===
      CONSTANTS.TABS.SAVEDASHBOARD.OVERWRITE,
  };
};

const mapDispatchToProps = {
  setModal,
  getDashboards,
  setTab,
  createDashboard,
  updateDashboard,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(OverwriteDashboard);
