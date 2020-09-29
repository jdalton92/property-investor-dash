import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import { useHistory } from "react-router-dom";
import { loginUser, demoUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import {
  required,
  minLength,
  isEmail,
  composeValidators,
} from "../helpers/formValidatorHelper";
import { CONSTANTS } from "../static/constants";

const Login = ({ loginUser, user, demoUser, setNotification }) => {
  const history = useHistory();

  useEffect(() => {
    if (user.data.username) {
      history.push("/");
    }
  }, []);

  const onSubmit = async ({ email, password }) => {
    await loginUser(email, password);
  };

  const handleForgotPassword = () => {
    setNotification("Forgot password clicked", CONSTANTS.NOTIFICATION.MESSAGE);
  };

  const handleDemo = () => {
    demoUser();
  };

  return (
    <div className="vh100 w100 fade-in relative bg-blue-1">
      <div className="center login">
        <div className="h100 r p24 m8 bs-3 bg-1">
          <h1 className="bold f24 mb56 mt32 text-center">
            PropertyInvestorDash
          </h1>
          <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <h2 className="f16 mb8">Email</h2>
                <Field
                  name="email"
                  validate={composeValidators(isEmail, required)}
                >
                  {({ input, meta }) => (
                    <div className="relative">
                      <input
                        className="form-input mb24 w100"
                        placeholder="example@email.com"
                        type="email"
                        {...input}
                        required
                      />
                      {meta.error && meta.touched && (
                        <div className="form-error">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
                <h2 className="f16 mb8">Password</h2>
                <Field
                  name="password"
                  validate={composeValidators(required, minLength(3))}
                >
                  {({ input, meta }) => (
                    <div className="relative">
                      <input
                        className="form-input mb32 w100"
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
                <button
                  className="form-button-p font-white bs-2 w100 pt8 pb8 r"
                  type="submit"
                >
                  Login
                </button>
              </form>
            )}
          />
        </div>
        <div className="mb8 ml8 mr8">
          <span className="link" onClick={handleForgotPassword}>
            Forgot your password?
          </span>
        </div>
        <div className="ml8 mr8">
          <span className="link" onClick={handleDemo}>
            Try a demo account
          </span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  loginUser,
  demoUser,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
