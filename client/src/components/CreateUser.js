import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { createUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import {
  required,
  minLength,
  isEmail,
  composeValidators,
} from "../utils/formValidatorHelper";
import { Button, Spinner } from "react-bootstrap";

const CreateUser = ({ createUser, user }) => {
  const history = useHistory();
  const onSubmit = async (values) => {
    // React final form handles e.preventDefault()
    await createUser(values);
    history.push("/");
  };

  return (
    <section className="form-section" id="create-form-section">
      <div className="form-outer-container form-card-container">
        <div className="form-header">
          <h1>Create Account</h1>
        </div>
        <div className="form-inner-container">
          {user.data.username ? (
            <i className="form-message">Log out to create new account</i>
          ) : user.isFetching ? (
            <Spinner
              className="loading-spinner"
              animation="border"
              variant="primary"
            />
          ) : (
            <FinalForm
              validate={(values) => {
                const errors = {};
                if (!values.checkPassword) {
                  errors.checkPassword = "Required";
                }
                if (values.password !== values.checkPassword) {
                  errors.checkPassword = "Passwords must match";
                }
                return errors;
              }}
              onSubmit={onSubmit}
              render={({ handleSubmit, values }) => (
                <form className="form-element" onSubmit={handleSubmit}>
                  <div className="form-item">
                    <h5>Username</h5>
                    <Field
                      name="username"
                      validate={composeValidators(required, minLength(3))}
                    >
                      {({ input, meta }) => (
                        <div>
                          <input
                            className="form-control"
                            placeholder="Username"
                            type="text"
                            {...input}
                          />
                          {meta.error && meta.touched && (
                            <span className="form-error">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="form-item">
                    <h5>Email</h5>
                    <Field
                      name="email"
                      validate={composeValidators(required, isEmail)}
                    >
                      {({ input, meta }) => (
                        <div>
                          <input
                            className="form-control"
                            placeholder="example@email.com"
                            type="email"
                            {...input}
                          />
                          {meta.error && meta.touched && (
                            <span className="form-error">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="form-item">
                    <h5>Password</h5>
                    <Field
                      name="password"
                      validate={composeValidators(required, minLength(3))}
                    >
                      {({ input, meta }) => (
                        <div>
                          <input
                            className="form-control"
                            placeholder="Password"
                            type="password"
                            {...input}
                          />
                          {meta.error && meta.touched && (
                            <span className="form-error">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="form-item">
                    <h5>Retype Password</h5>
                    <Field name="checkPassword">
                      {({ input, meta }) => (
                        <div>
                          <input
                            className="form-control"
                            placeholder="Password"
                            type="password"
                            {...input}
                          />
                          {meta.error && meta.touched && (
                            <span className="form-error">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="form-button-container">
                    <Button
                      className="form-button"
                      id="form-submit"
                      type="submit"
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              )}
            />
          )}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  createUser,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
