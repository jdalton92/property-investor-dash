import React from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import { setModal } from "../../reducers/navigationReducer";
import { createDashboard } from "../../reducers/dashboardsReducer";
import {
  required,
  maxLength,
  minLength,
} from "../../utils/formValidatorHelper";
import { CONSTANTS } from "../../static/constants";
import { setNotification } from "../../reducers/notificationReducer";
import Input from "../Shared/FinalForm/Input";
import Button from "../Shared/FinalForm/Button";

const SaveNewDashboard = ({
  currentDashboard,
  isFetching,
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
            label={"Save As"}
            type={"submit"}
            options={{
              styleType: "primary",
              buttonClass: "w-24",
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
    isLoggedIn: !!state.users.data?._id,
  };
};

const mapDispatchToProps = {
  setModal,
  createDashboard,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveNewDashboard);
