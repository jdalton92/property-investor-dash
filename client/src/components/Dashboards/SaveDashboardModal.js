import React from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { setModal } from "../../reducers/navigationReducer";
import {
  saveDashboard,
  updateDashboard,
} from "../../reducers/dashboardReducer";
import { setNotification } from "../../reducers/notificationReducer";
import { Modal, Button, Form } from "react-bootstrap";
import {
  composeValidators,
  required,
  maxLength,
  minLength,
} from "../../helpers/formValidatorHelper";
import { Spinner } from "react-bootstrap";
import "../styles/SavedDashboardModal.css";

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
    // React Final Form handles preventDefault()
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
    <Modal
      show={saveDashboardModal}
      onHide={() => setModal("saveDashboard")}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Save Dashboard
        </Modal.Title>
      </Modal.Header>
      {dashboards.isFetching ? (
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
