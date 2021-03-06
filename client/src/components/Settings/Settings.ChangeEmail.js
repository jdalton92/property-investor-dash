import React from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { updateUser } from "../../reducers/usersReducer";
import {
  required,
  minLength,
  isEmail,
  composeValidators,
} from "../../utils/formValidatorHelper";

const ChangeEmail = ({ user, updateUser }) => {
  const handleEmailChange = async (values) => {
    const confirm = window.confirm(
      `Change email from ${user.email} to ${values.newEmail}?`
    );
    if (confirm) {
      updateUser(user._id, {
        newEmail: values.newEmail,
      });
    }
  };

  return (
    <Form
      onSubmit={handleEmailChange}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <h2 className="f20 bold mt16 mb16">Change Email</h2>
          <div className="r bs-3 bg-1 p20 mb20">
            <label htmlFor="old-email" className="f16 mb8">
              Existing Email
              <span className="font-red f12 bold ml4">*</span>
            </label>
            <div className="relative mb20">
              <input
                id="old-email"
                className="form-input bs-1 w100"
                value={user.email}
                type="email"
                disabled
              />
            </div>
            <label htmlFor="new-email" className="f16 mb8">
              New Email
              <span className="font-red f12 bold ml4">*</span>
            </label>
            <Field
              name="newEmail"
              validate={composeValidators(required, minLength(3), isEmail)}
            >
              {({ input, meta }) => (
                <div className="relative mb20">
                  <input
                    id="new-email"
                    className={`form-input bs-1 w100 ${
                      meta.error && meta.touched ? "input-error" : ""
                    }`}
                    placeholder="new@email.com"
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
    user: state.users.data,
  };
};

const mapDispatchToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);
