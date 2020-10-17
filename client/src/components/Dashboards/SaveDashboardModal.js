import React from "react";
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

const SaveDashboardModal = ({
  dashboards,
  user,
  setModal,
  setNotification,
  saveDashboard,
  updateDashboard,
  saveDashboardModal,
}) => {
  const id = useParams().id;
  const history = useHistory();

  const handleSave = async (saveData) => {
    if (!user.data.username) {
      setModal("saveDashboard");
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

    setModal("saveDashboard");

    if (!dashboards.isFetching) {
      setNotification(`${saveData.description} saved`, "success");
      history.push("/saved-dashboards");
    }
  };

  const handleCancel = (e) => {
    // React Final Form handles preventDefault()
    setModal("saveDashboard");
  };

  const initialValues = id ? dashboards.data[0].values : null;

  return (
    <div className="modal fade-in r bs-3 bg-1">
      <Form
        onSubmit={handleSave}
        initialValues={{ ...initialValues }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <label for="description">Description</label>
            <Field
              name="description"
              validate={composeValidators(
                required,
                minLength(3),
                maxLength(200)
              )}
            >
              {({ input, meta }) => (
                <div>
                  <input
                    id="description"
                    className="form-control"
                    placeholder="Description"
                    type="text"
                    {...input}
                    maxLength={200}
                  />
                  {meta.error && meta.touched && (
                    <span className="form-error">{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
            <div className="input-item">
              <label for="address">Address</label>
              <Field
                name="address"
                validate={composeValidators(
                  required,
                  minLength(3),
                  maxLength(200)
                )}
              >
                {({ input, meta }) => (
                  <div>
                    <input
                      id="address"
                      className="form-control"
                      placeholder="123 Example St, City"
                      type="text"
                      {...input}
                      maxLength={200}
                    />
                    {meta.error && meta.touched && (
                      <span className="form-error">{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
            </div>
            <button
              type="submit"
              variant="primary"
              className="save-dashboard-button"
            >
              Save
            </button>
            <button
              variant="outline-primary"
              onClick={handleCancel}
              className="save-dashboard-button"
            >
              Cancel
            </button>
          </form>
        )}
      />
      )}
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
