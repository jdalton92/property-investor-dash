import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
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
import { Icon } from "../Shared/Icon";
import CloseIcon from "../../styles/svg/close.svg";
import SaveIcon from "../../styles/svg/save.svg";
import OverwriteIcon from "../../styles/svg/overwrite.svg";

const SaveDashboardModal = ({
  isFetching,
  currentDashboard,
  savedDashboards,
  user,
  setModal,
  setNotification,
  saveDashboard,
  updateDashboard,
}) => {
  const [saveNew, setSaveNew] = useState(true);
  const [overwrite, setOverwrite] = useState("");
  const history = useHistory();

  const handleSave = async (saveData) => {
    if (!user.data.username) {
      setModal(CONSTANTS.MODALS.SAVEDASHBOARD, false);
      setNotification("Please login to save dashboard", "danger");
      return;
    }

    const dashObject = {
      values: currentDashboard,
      ...saveData,
    };

    await saveDashboard(dashObject);

    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, false);

    if (!isFetching) {
      setNotification(`${saveData.description} saved`, "success");
      history.push("/saved-dashboards");
    }
  };

  const handleOverwrite = async (saveData) => {
    // await updateDashboard(saveData);
    console.log("overwrite ", overwrite);
  };

  const handleCancel = (e) => {
    // React Final Form handles preventDefault()
    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, false);
  };

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
        <button
          type="submit"
          className={`save-opt button-transp-s rt pl16 pr16 flex-row align-c justify-c jump ${
            saveNew ? "active" : ""
          }`}
          onClick={() => setSaveNew(true)}
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
          type="submit"
          className={`save-opt button-transp-s rt pl16 pr16 flex-row align-c justify-c jump ${
            saveNew ? "" : "active"
          }`}
          onClick={() => setSaveNew(false)}
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
      {saveNew && (
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
                  Save As
                </button>
              </div>
            </form>
          )}
        />
      )}
      {!saveNew && (
        <Form
          onSubmit={handleOverwrite}
          render={({ handleSubmit, form, values }) => (
            <form className="save-form mt20 mb20" onSubmit={handleSubmit}>
              <div className="flex-row align-c relative">
                <label htmlFor="save-overwrite" className="f16 mb8">
                  Dashboard
                  <span className="font-red f12 bold ml4">*</span>
                </label>
              </div>
              <Field name="dashboard" validate={required}>
                {({ input, meta }) => (
                  <div className="relative mb20">
                    <select
                      className="form-input select w100 bs-1"
                      id="save-overwrite"
                      name="dashboard"
                      onChange={() => setOverwrite(values)}
                      multiple
                    >
                      {savedDashboards.map((d, i) => {
                        let type;
                        if (d.values.type === "developer") {
                          type = "Developer";
                        } else if (d.values?.investor) {
                          type = "Investor";
                        } else {
                          type = "Owner Occupier";
                        }
                        return (
                          <option key={i} value={d._id}>
                            description: {d.description} | type: {type}
                          </option>
                        );
                      })}
                    </select>
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
    currentDashboard: state.dashboards.currentDashboard.values,
    savedDashboards: state.dashboards.savedDashboards,
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
