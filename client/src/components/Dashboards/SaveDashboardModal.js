import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { setModal, setTab } from "../../reducers/navigationReducer";
import {
  saveDashboard,
  updateDashboard,
} from "../../reducers/dashboardReducer";
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
import { typeAndUrl } from "../../utils/dashboardHelper";

const SaveDashboardModal = ({
  isFetching,
  currentDashboard,
  savedDashboards,
  setModal,
  saveDashboard,
  updateDashboard,
  setNotification,
  email,
  setTab,
  tab,
}) => {
  const [selectedDashboard, setSelectedDashboard] = useState(null);

  const handleSave = async (saveData) => {
    if (!email) {
      setNotification("Log in to save dashboard", CONSTANTS.NOTIFICATION.ERROR);
      return;
    }

    const dashObject = {
      assumptions: currentDashboard.assumptions,
      ...saveData,
    };
    await saveDashboard(dashObject);
    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, false);
  };

  const handleOverwrite = async ({ address, description }) => {
    if (!email) {
      setNotification("Log in to save dashboard", CONSTANTS.NOTIFICATION.ERROR);
      return;
    }

    // New dashboard
    const newDashboard = {
      _id: selectedDashboard,
      address,
      description,
      assumptions: currentDashboard.assumptions,
    };
    await updateDashboard(newDashboard);
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
      {isFetching && <Loader />}
      {!isFetching && tab === CONSTANTS.TABS.SAVEDASHBOARD.SAVE && (
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
                      className="form-input bs-1 w100"
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
                      className="form-input bs-1 w100"
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
      {!isFetching &&
        tab === CONSTANTS.TABS.SAVEDASHBOARD.OVERWRITE &&
        savedDashboards.length === 0 && (
          <div className="mt20 f16">No saved dashboards...</div>
        )}
      {!isFetching &&
        tab === CONSTANTS.TABS.SAVEDASHBOARD.OVERWRITE &&
        savedDashboards.length > 0 && (
          <Form
            onSubmit={handleOverwrite}
            validate={(values) => {
              const errors = {};
              if (!selectedDashboard) {
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
                <Field name="dashboard">
                  {({ input, meta }) => (
                    <div className="relative mb20">
                      <div className="mh300 o-y-auto">
                        <table
                          id="overwrite-dashboard"
                          className="overpayments w100"
                        >
                          <thead>
                            <tr>
                              <th className="h768">Ref</th>
                              <th>Description</th>
                              <th className="h768">Type</th>
                              <th>Created</th>
                              <th>Overwrite</th>
                            </tr>
                          </thead>
                          <tbody>
                            {savedDashboards.map((d, i) => {
                              const { type } = typeAndUrl(d);
                              return (
                                <tr
                                  key={i}
                                  onClick={() =>
                                    selectedDashboard === d._id
                                      ? setSelectedDashboard(null)
                                      : setSelectedDashboard(d._id)
                                  }
                                  className={`${
                                    d._id === selectedDashboard
                                      ? "selected"
                                      : ""
                                  }`}
                                >
                                  <td className="h768">{i + 1}</td>
                                  <td>{d.description}</td>
                                  <td className="h768">{type}</td>
                                  <td>{formatDate(d.date)}</td>
                                  <td>
                                    <input
                                      className="ml16"
                                      type="checkbox"
                                      checked={d._id === selectedDashboard}
                                      value={d._id}
                                      onChange={() =>
                                        selectedDashboard === d._id
                                          ? setSelectedDashboard(null)
                                          : setSelectedDashboard(d._id)
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
                        className="form-input bs-1 w100"
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
                        className="form-input bs-1 w100"
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
    email: state.user.data?.email,
  };
};

const mapDispatchToProps = {
  setModal,
  setTab,
  saveDashboard,
  updateDashboard,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveDashboardModal);
