import React from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { resetPassword } from "../reducers/userReducer";
import {
  required,
  minLength,
  isEmail,
  composeValidators,
} from "../utils/formValidatorHelper";
import Loader from "./Shared/Loader";

const ResetPassword = ({ isFetching, resetPassword }) => {
  const handleResetPassword = ({ email }) => {
    resetPassword(email);
  };

  if (isFetching) {
    return <Loader />;
  } else {
    return (
      <>
        <h1 className="f24 bold mt16 mb16">Reset Password</h1>
        <Form
          onSubmit={handleResetPassword}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="r bs-3 bg-1 p20 mb20">
                <label htmlFor="email" className="f16 mb8">
                  Email
                  <span className="font-red f12 bold ml4">*</span>
                </label>
                <Field
                  name="email"
                  validate={composeValidators(required, minLength(3), isEmail)}
                >
                  {({ input, meta }) => (
                    <div className="relative mb20">
                      <input
                        id="email"
                        className="form-input bs-1 w100"
                        placeholder="your@email.com"
                        type="email"
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
  resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
