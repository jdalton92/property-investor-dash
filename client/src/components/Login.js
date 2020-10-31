import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { useHistory } from "react-router-dom";
import { loginUser, createUser, demoUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { setTab } from "../reducers/navigationReducer";
import {
  required,
  minLength,
  isEmail,
  composeValidators,
} from "../utils/formValidatorHelper";
import { CONSTANTS } from "../static/constants";
import { Icon } from "./Shared/Icon";
import UserIcon from "../styles/svg/user.svg";
import CreateUserIcon from "../styles/svg/create-user.svg";
import hero from "../styles/images/hero.jpg";

const Login = ({
  loginUser,
  createUser,
  user,
  demoUser,
  setNotification,
  setTab,
  tab,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (user.data.email) {
      history.push("/");
      setNotification("User already logged in", CONSTANTS.NOTIFICATION.ERROR);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async ({ email, password }) => {
    await loginUser(email, password);
  };

  const handleForgotPassword = () => {
    history.push("/contact");
    setNotification(
      "Functionality coming soon, please contact us to reset your password",
      CONSTANTS.NOTIFICATION.MESSAGE
    );
  };

  const handleCreateUser = async ({ email, password, checkPassword }) => {
    await createUser(email, password, checkPassword);
  };

  const handleDemo = () => {
    demoUser();
    history.push("/");
  };

  return (
    <div className="vh100 w100 fade-in bg-blue-1 flex-row justify-c">
      <div className="w100 vh100 h1080">
        <div
          className="h100 w100 img-cover opacity9"
          style={{
            backgroundImage: `url(${hero})`,
          }}
        />
      </div>
      <div className="login-container flex-col justify-c m8">
        <div className="login r p20 m8 bs-3 bg-1 mw450 m-auto">
          <h1
            className="bold text-center ts-4 link"
            onClick={() => history.push("/")}
          >
            PropertyInvestorDash
          </h1>
          <div className="flex-row mb16">
            <button
              type="button"
              className={`tab-opt button-transp-s rt pl16 pr16 flex-row align-c justify-c jump ${
                tab === CONSTANTS.TABS.LOGIN.LOGIN ? "active" : ""
              }`}
              onClick={() => setTab("login", CONSTANTS.TABS.LOGIN.LOGIN)}
            >
              <Icon
                size={"20px"}
                url={UserIcon}
                color={"black"}
                hover={false}
                active={false}
              />
              <span className="ml8 f16 bold">Login</span>
            </button>
            <button
              type="button"
              className={`tab-opt button-transp-s rt pl16 pr16 flex-row align-c justify-c jump ${
                tab === CONSTANTS.TABS.LOGIN.CREATEUSER ? "active" : ""
              }`}
              onClick={() => setTab("login", CONSTANTS.TABS.LOGIN.CREATEUSER)}
            >
              <Icon
                size={"20px"}
                url={CreateUserIcon}
                color={"black"}
                hover={false}
                active={false}
              />
              <span className="ml8 f16 bold">Create Account</span>
            </button>
          </div>
          {tab === CONSTANTS.TABS.LOGIN.LOGIN && (
            <Form
              onSubmit={handleLogin}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="login-email" className="f16 mb8">
                    Email
                    <span className="font-red f12 bold ml4">*</span>
                  </label>
                  <Field
                    name="email"
                    validate={composeValidators(isEmail, required)}
                  >
                    {({ input, meta }) => (
                      <div className="relative mb20">
                        <input
                          id="login-email"
                          className="form-input bs-1 w100"
                          placeholder="example@email.com"
                          type="text"
                          {...input}
                        />
                        {meta.error && meta.touched && (
                          <span className="form-error f10">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <label htmlFor="login-password" className="f16 mb8">
                    Email
                    <span className="font-red f12 bold ml4">*</span>
                  </label>
                  <Field
                    name="password"
                    validate={composeValidators(minLength(3), required)}
                  >
                    {({ input, meta }) => (
                      <div className="relative mb20">
                        <input
                          id="login-password"
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
                    className="form-button-p font-white bs-2 w100 mt12 pt8 pb8 r"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              )}
            />
          )}
          {tab === CONSTANTS.TABS.LOGIN.CREATEUSER && (
            <Form
              onSubmit={handleCreateUser}
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
                  <label htmlFor="create-email" className="f16 mb8">
                    Email
                    <span className="font-red f12 bold ml4">*</span>
                  </label>
                  <Field
                    name="email"
                    validate={composeValidators(isEmail, required)}
                  >
                    {({ input, meta }) => (
                      <div className="relative mb20">
                        <input
                          id="create-email"
                          className="form-input bs-1 w100"
                          placeholder="example@email.com"
                          type="text"
                          {...input}
                        />
                        {meta.error && meta.touched && (
                          <span className="form-error f10">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <label htmlFor="create-password" className="f16 mb8">
                    Password
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
                          {...input}
                        />
                        {meta.error && meta.touched && (
                          <span className="form-error f10">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <button
                    className="form-button-p font-white bs-2 w100 mt12 pt8 pb8 r"
                    type="submit"
                  >
                    Create Account
                  </button>
                </form>
              )}
            />
          )}
        </div>
        <div className="login mw450">
          <span className="link font-n1" onClick={handleForgotPassword}>
            Forgot your password?
          </span>
        </div>
        <div className="login mw450">
          <span className="link font-n1" onClick={handleDemo}>
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
    tab: state.navigation.tabs.login,
  };
};

const mapDispatchToProps = {
  loginUser,
  createUser,
  demoUser,
  setNotification,
  setTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
