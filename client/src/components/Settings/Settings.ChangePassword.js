import React from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { updateUser } from "../../reducers/userReducer";
import {
  required,
  minLength,
  composeValidators,
} from "../../utils/formValidatorHelper";

const ChangePassword = ({ user, updateUser }) => {
  const handleSubmit = async (values) => {
    // React final form handles e.preventDefault()
    const { oldPassword, newPassword, checkPassword } = values;
    const userData = {
      oldPassword,
      newPassword,
      checkPassword,
    };
    updateUser(user.data.id, userData);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.checkPassword) {
          errors.checkPassword = "Required";
        }
        if (values.newPassword !== values.checkPassword) {
          errors.checkPassword = "Passwords must match";
        }
        return errors;
      }}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <h2 className="f20 bold mt16 mb16">Change Password</h2>
          <div className="r bs-3 bg-1 p20 mb20">
            <label htmlFor="old-password" className="f16 mb8">
              Old Password
              <span className="font-red f12 bold ml4">*</span>
            </label>
            <Field
              name="oldPassword"
              validate={composeValidators(required, minLength(3))}
            >
              {({ input, meta }) => (
                <div className="relative mb20">
                  <input
                    id="old-password"
                    className="form-input bs-1 w100"
                    placeholder="Password"
                    type="password"
                    {...input}
                  />
                  {meta.error && meta.touched && (
                    <span className="form-error f10">{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
            <label htmlFor="new-password" className="f16 mb8">
              New Password
              <span className="font-red f12 bold ml4">*</span>
            </label>
            <Field
              name="newPassword"
              validate={composeValidators(required, minLength(3))}
            >
              {({ input, meta }) => (
                <div className="relative mb20">
                  <input
                    id="new-password"
                    className="form-input bs-1 w100"
                    placeholder="Password"
                    type="password"
                    {...input}
                  />
                  {meta.error && meta.touched && (
                    <span className="form-error f10">{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
            <label htmlFor="confirm-password" className="f16 mb8">
              Confirm New Password
              <span className="font-red f12 bold ml4">*</span>
            </label>
            <Field
              name="checkPassword"
              validate={composeValidators(required, minLength(3))}
            >
              {({ input, meta }) => (
                <div className="relative mb20">
                  <input
                    id="confirm-password"
                    className="form-input bs-1 w100"
                    placeholder="Password"
                    type="password"
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
              Update
            </button>
          </div>
        </form>
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
