import React from "react";
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
import { CONSTANTS } from "../../static/constants";
import { setNotification } from "../../reducers/notificationReducer";

const SaveNewDashboard = ({
  currentDashboard,
  setModal,
  createDashboard,
  setNotification,
  isLoggedIn,
}) => {
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
  return (
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
            validate={composeValidators(required, minLength(3), maxLength(200))}
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
            validate={composeValidators(required, minLength(3), maxLength(200))}
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

export default connect(mapStateToProps, mapDispatchToProps)(SaveNewDashboard);
