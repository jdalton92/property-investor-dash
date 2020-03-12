import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { setModal } from "../../reducers/navigationReducer";
import {
  saveDashboard,
  updateDashboard
} from "../../reducers/dashboardReducer";
import { setDashboard } from "../../reducers/formReducer";
import {
  setNotification,
  clearNotification
} from "../../reducers/notificationReducer";
import { Modal, Button, Form } from "react-bootstrap";
import {
  composeValidators,
  required,
  maxLength,
  minLength
} from "../../helpers/formValidatorHelper";
import { Spinner } from "react-bootstrap";
import "../styles/SavedDashboardModal.css";

const SaveDashboardModal = props => {
  const history = useHistory();

  const handleSave = async saveData => {
    // React Final Form handles preventDefault()
    if (!props.user.data.username) {
      props.setModal("saveDashboard");
      props.setNotification("Please login to save dashboard", "danger");
      setTimeout(() => props.clearNotification(), 7500);
      return;
    }

    const dashObject = {
      values: props.values.values,
      ...saveData
    };

    if (
      props.dashboards.isEditing &&
      props.dashboards.data.filter(d => d._id === props.values._id).length > 0
    ) {
      await props.updateDashboard(dashObject);
    } else {
      await props.saveDashboard(dashObject);
    }

    props.setDashboard(dashObject);
    props.setModal("saveDashboard");

    if (!props.dashboards.isFetching) {
      props.setNotification(`${saveData.description} saved`, "success");
      history.push("/saved-dashboards");
    }
  };

  const handleCancel = e => {
    // React Final Form handles preventDefault()
    props.setModal("saveDashboard");
  };

  const initialValues = props.dashboards.isEditing ? props.values : null;

  return (
    <Modal
      show={props.saveDashboardModal}
      onHide={() => props.setModal("saveDashboard")}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Save Dashboard
        </Modal.Title>
      </Modal.Header>
      {props.dashboards.isFetching ? (
        <Modal.Body>
          <Spinner
            className="loading-spinner"
            animation="border"
            variant="primary"
          />
        </Modal.Body>
      ) : (
        <FinalForm
          onSubmit={handleSave}
          initialValues={{ ...initialValues }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="input-item-group">
                  <div className="input-item">
                    <Form.Label>Description</Form.Label>
                    <Field
                      name="description"
                      validate={composeValidators(
                        required,
                        minLength(3),
                        maxLength(200)
                      )}
                    >
                      {({ input, meta }) => (
                        <div className="input-error-group">
                          <input
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
                  </div>
                  <div className="input-item">
                    <Form.Label>Address</Form.Label>
                    <Field
                      name="address"
                      validate={composeValidators(
                        required,
                        minLength(3),
                        maxLength(200)
                      )}
                    >
                      {({ input, meta }) => (
                        <div className="input-error-group">
                          <input
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
                </div>
              </Modal.Body>
              <Modal.Footer className="save-dashboard-footer">
                <Button
                  type="submit"
                  variant="primary"
                  className="save-dashboard-button"
                >
                  Save
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={handleCancel}
                  className="save-dashboard-button"
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </form>
          )}
        />
      )}
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    values: state.values,
    dashboards: state.dashboards,
    saveDashboardModal: state.navigation.modal.saveDashboard,
    user: state.user,
    requestSuceed: state.navigation.requestSuceed
  };
};

const mapDispatchToProps = {
  setModal,
  setDashboard,
  saveDashboard,
  updateDashboard,
  setNotification,
  clearNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveDashboardModal);
