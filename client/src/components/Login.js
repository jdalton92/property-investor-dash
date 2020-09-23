import React from "react";
import { connect } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import { useHistory } from "react-router-dom";
import { loginUser } from "../reducers/userReducer";
import {
  required,
  minLength,
  isEmail,
  composeValidators,
} from "../helpers/formValidatorHelper";
import { Button } from "react-bootstrap";

const Login = ({ loginUser, user }) => {
  const history = useHistory();
  const onSubmit = async (values) => {
    await loginUser(values.email, values.password);
    history.push("/saved-dashboards");
  };

  return (
    <section className="form-section" id="login-form-section">
      <div className="form-outer-container form-card-container">
        <div className="form-header">
          <h1>Login</h1>
        </div>
        <div className="form-inner-container">
          {user.data.username ? (
            <i className="form-element logged-in">User already logged in</i>
          ) : (
            <FinalForm
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form className="form-element" onSubmit={handleSubmit}>
                  <div className="form-item">
                    <h5>Email</h5>
                    <Field
                      name="email"
                      validate={composeValidators(isEmail, required)}
                    >
                      {({ input, meta }) => (
                        <div>
                          <input
                            className="form-control"
                            placeholder="example@email.com"
                            type="email"
                            {...input}
                            required
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
                            required
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
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
