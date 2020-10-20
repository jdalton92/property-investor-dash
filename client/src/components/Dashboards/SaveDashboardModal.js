import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { setModal } from "../../reducers/navigationReducer";
import {
  saveDashboard,
  updateDashboard,
} from "../../reducers/dashboardReducer";
import { setNotification } from "../../reducers/notificationReducer";
import {
  composeValidators,
  required,
  maxLength,
  minLength,
} from "../../utils/formValidatorHelper";
import { CONSTANTS } from "../../static/constants";
import Button from "../Shared/Button";
import CloseIcon from "../../styles/svg/close.svg";

const SaveDashboardModal = ({
  dashboards,
  user,
  setModal,
  setNotification,
  saveDashboard,
  updateDashboard,
  saveDashboardModal,
}) => {
  const [saveNew, setSaveNew] = useState(true);
  const id = useParams().id;
  const history = useHistory();

  const handleSave = async (saveData) => {
    if (!user.data.username) {
      setModal(CONSTANTS.MODALS.SAVEDASHBOARD, false);
      setNotification("Please login to save dashboard", "danger");
      return;
    }

    const dashObject = {
      values: dashboards.data[0].values,
      ...saveData,
    };

    if (id) {
      await updateDashboard(dashObject);
    } else {
      await saveDashboard(dashObject);
    }

    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, false);

    if (!dashboards.isFetching) {
      setNotification(`${saveData.description} saved`, "success");
      history.push("/saved-dashboards");
    }
  };

  const handleCancel = (e) => {
    // React Final Form handles preventDefault()
    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, false);
  };

  const initialValues = id ? dashboards.data[0].values : null;

  return (
    <div className="modal mt60 fixed r bs-3 bg-1 p20">
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
        <h3
          className={`modal-opt ${saveNew ? "active" : ""} f16 mb8 bold mr8`}
          onClick={() => setSaveNew(true)}
        >
          Save New
        </h3>
        <h3
          className={`modal-opt ${saveNew ? "" : "active"} f16 mb8 bold ml8`}
          onClick={() => setSaveNew(false)}
        >
          Overwrite Existing
        </h3>
      </div>
      {saveNew && (
        <Form
          onSubmit={handleSave}
          initialValues={{ ...initialValues }}
          render={({ handleSubmit, form }) => (
            <form className="mb20" onSubmit={handleSubmit}>
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
                <label htmlFor="save-description" className="f16 mb8">
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
              <div className="form-buttons">
                <button
                  type="submit"
                  className="form-button-p bs-3 font-white mt12 pt8 pb8"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="form-button-s bs-3 font-white mt12 pt8 pb8 r"
                  onClick={form.reset}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />
      )}
      {!saveNew && <div>TABLE OF EXISTING DASHBOARDS</div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboards: state.dashboards,
    saveDashboardModal: state.navigation.modal.saveDashboard,
    user: state.user,
    requestSuceed: state.navigation.requestSuceed,
  };
};

const mapDispatchToProps = {
  setModal,
  saveDashboard,
  updateDashboard,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveDashboardModal);
