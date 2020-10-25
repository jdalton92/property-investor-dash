import React from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { deleteUser } from "../../reducers/userReducer";
import {
  required,
  minLength,
  composeValidators,
} from "../../utils/formValidatorHelper";

const DeleteAccount = ({ user, deleteUser }) => {
  const userDetails = {
    oldEmail: user.data.email,
    id: user.data.id,
  };

  const handleSubmit = async ({ password }) => {
    const confirm = window.confirm(`Delete ${userDetails.email}?`);
    if (confirm) {
      await deleteUser(password, user.id);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <h2 className="f20 bold mt16 mb16">Delete Account</h2>
          <div className="r bs-3 bg-1 p20 mb20">
            <label htmlFor="password" className="f16 mb8">
              Password
              <span className="font-red f12 bold ml4">*</span>
            </label>
            <Field
              name="password"
              validate={composeValidators(required, minLength(3))}
            >
              {({ input, meta }) => (
                <div className="relative mb20">
                  <input
                    id="password"
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
              Delete
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
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
