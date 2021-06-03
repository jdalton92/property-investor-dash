import React, { useState, useEffect } from "react";
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
import Button from "../Shared/Button";
import { Icon } from "../Shared/Icon";
import Loader from "../Shared/Loader";
import CloseIcon from "../../styles/svg/close.svg";
import SaveIcon from "../../styles/svg/save.svg";
import OverwriteIcon from "../../styles/svg/overwrite.svg";
import { setNotification } from "../../reducers/notificationReducer";
import { getDashboardTypeAndBaseUrl } from "../../utils/dashboardHelper";

const SaveDashboardModal = ({
  isFetching,
  getDashboards,
  currentDashboard,
  savedDashboards,
  setModal,
  createDashboard,
  updateDashboard,
  setNotification,
  isLoggedIn,
  setTab,
  tab,
}) => {
  const limit = 5;
  const [params, setParams] = useState({ limit });
  useEffect(() => {
    getDashboards(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const [selectedDashboardId, setSelectedDashboardId] = useState(null);

  const handleChangePage = (page) => {
    setSelectedDashboardId(null);
    setParams({ limit, page });
  };

  const handleSave = async (saveData) => {
    if (!isLoggedIn) {
      setNotification("Log in to save dashboard", CONSTANTS.NOTIFICATION.ERROR);
      return;
    }

    const dashboard = {
      type: currentDashboard.type,
      assumptions: currentDashboard.assumptions,
      ...saveData,
    };
    await createDashboard(dashboard);
    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, false);
  };

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

  const handleCancel = () => {
    // React Final Form handles preventDefault()
    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, false);
  };

  return (
    <div className="modal fixed r bs-3 bg-1 p20">
      <Button
        ariaLabel={"Close"}
        dataBalloonPos={"left"}
        extraClass={"modal-close-btn mt20 mr20 button-p align-c justify-c"}
        onClick={handleCancel}
        iconUrl={CloseIcon}
        iconColor={"white"}
      />
      <h2 className="f20 bold mb16">Save Dashboard</h2>
      <div className="flex-row">
        <button
          type="button"
          className={`save-opt button-transp-s rt pl16 pr16 flex-row align-c justify-c jump ${
            tab === CONSTANTS.TABS.SAVEDASHBOARD.SAVE ? "active" : ""
          }`}
          onClick={() =>
            setTab("saveDashboard", CONSTANTS.TABS.SAVEDASHBOARD.SAVE)
          }
        >
          <Icon
            size={"20px"}
            url={SaveIcon}
            color={"black"}
            hover={false}
            active={false}
          />
          <span className="ml8 f16 bold">Save New</span>
        </button>
        <button
          type="button"
          className={`save-opt button-transp-s rt pl16 pr16 flex-row align-c justify-c jump ${
            tab === CONSTANTS.TABS.SAVEDASHBOARD.OVERWRITE ? "active" : ""
          }`}
          onClick={() =>
            setTab("saveDashboard", CONSTANTS.TABS.SAVEDASHBOARD.OVERWRITE)
          }
        >
          <Icon
            size={"20px"}
            url={OverwriteIcon}
            color={"black"}
            hover={false}
            active={false}
          />
          <span className="ml8 f16 bold">Overwrite Existing</span>
        </button>
      </div>
      {tab === CONSTANTS.TABS.SAVEDASHBOARD.SAVE && (
        <Form
          onSubmit={handleSave}
          render={({ handleSubmit, form }) => (
            <form className="save-form mt20 mb20" onSubmit={handleSubmit}>
              <div className="flex-row align-c relative">
                <label htmlFor="save-description" className="f16 mb8">
                  Description
                  <span className="font-red f12 bold ml4">*</span>
                </label>
              </div>
              <Field
                name="description"
                validate={composeValidators(
                  required,
                  minLength(3),
                  maxLength(200)
                )}
              >
                {({ input, meta }) => (
                  <div className="relative mb20">
                    <input
                      id="save-description"
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
                <label htmlFor="save-address" className="f16 mb8">
                  Address
                  <span className="font-red f12 bold ml4">*</span>
                </label>
              </div>
              <Field
                name="address"
                validate={composeValidators(
                  required,
                  minLength(3),
                  maxLength(200)
                )}
              >
                {({ input, meta }) => (
                  <div className="relative mb20">
                    <input
                      id="save-address"
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
              <div className="form-buttons mb20">
                <button
                  type="submit"
                  className="form-button-p bs-3 font-white mt12 pt8 pb8"
                >
                  Save As
                </button>
              </div>
            </form>
          )}
        />
      )}
      {tab === CONSTANTS.TABS.SAVEDASHBOARD.OVERWRITE && (
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
                      onClick={() =>
                        handleChangePage(savedDashboards.previousPage)
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
                    <span className="bold mr4">
                      {savedDashboards.nextPage
                        ? savedDashboards.nextPage - 1
                        : savedDashboards.pagesCount}
                    </span>
                    <span className="mr4">of</span>
                    <span className="bold mr12">
                      {savedDashboards.pagesCount}
                    </span>
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
                validate={composeValidators(
                  required,
                  minLength(3),
                  maxLength(200)
                )}
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
                validate={composeValidators(
                  required,
                  minLength(3),
                  maxLength(200)
                )}
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
      )}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SaveDashboardModal);
