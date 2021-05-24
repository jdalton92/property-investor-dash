import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import Loader from "./Shared/Loader";
import { setNewPassword } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { CONSTANTS } from "../static/constants";
import queryString from "query-string";
import {
  required,
  minLength,
  composeValidators,
} from "../utils/formValidatorHelper";

const NewPassword = ({ isFetching, setNewPassword, setNotification }) => {
  const history = useHistory();
  const { id, token } = queryString.parse(history.location.search);

  if (!id || !token) {
    history.push("/");
    setNotification("Invalid password reset url", CONSTANTS.NOTIFICATION.ERROR);
  }

  const handleSetNewPassword = ({ password, checkPassword }) => {
    setNewPassword(id, token, password, checkPassword);
  };

  if (isFetching) {
    return <Loader />;
  } else {
    return (
      <>
        <h1 className="f24 bold mt16 mb16">Reset Password</h1>
        <Form
          onSubmit={handleSetNewPassword}
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
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="r bs-3 bg-1 p20 mb20">
                <label htmlFor="create-password" className="f16 mb8">
                  New Password
                  <span className="font-red f12 bold ml4">*</span>
                </label>
                <Field
                  name="password"
                  validate={composeValidators(minLength(3), required)}
                >
                  {({ input, meta }) => (
                    <div className="relative mb20">
                      <input
                        id="create-password"
                        className="form-input bs-1 w100"
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        {...input}
                      />
                      {meta.error && meta.touched && (
                        <span className="form-error f10">{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
                <label htmlFor="create-confirm" className="f16 mb8">
                  Confirm Password
                  <span className="font-red f12 bold ml4">*</span>
                </label>
                <Field name="checkPassword">
                  {({ input, meta }) => (
                    <div className="relative mb20">
                      <input
                        id="create-confirm"
                        className="form-input bs-1 w100"
                        placeholder="Confirm Password"
                        type="password"
                        autoComplete="off"
                        {...input}
                      />
                      {meta.error && meta.touched && (
                        <span className="form-error f10">{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
                <button
                  className="form-button-p font-white bs-2 pt8 pb8 r mt12"
                  type="submit"
                >
                  Confirm
                </button>
              </div>
            </form>
          )}
        />
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.user.isFetching,
    user: state.user,
    tab: state.navigation.tabs.login,
  };
};

const mapDispatchToProps = {
  setNewPassword,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
