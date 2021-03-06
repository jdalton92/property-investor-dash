import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { useHistory } from "react-router-dom";
import { loginUser, createUser, demoUser } from "../reducers/usersReducer";
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
  isLoggedIn,
  demoUser,
  setTab,
  tab,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = ({ email, password }) => {
    loginUser(email, password);
  };

  const handleForgotPassword = () => {
    history.push("/reset-password");
  };

  const handleCreateUser = ({
    email,
    password,
    checkPassword,
    hasAcceptedTCs,
  }) => {
    createUser(email, password, checkPassword, hasAcceptedTCs);
  };

  const handleDemo = () => {
    demoUser();
  };

  return (
    <div className="login-wrapper vh100 w100 fade-in flex-row justify-c">
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
                          className={`form-input bs-1 w100 ${
                            meta.error && meta.touched ? "input-error" : ""
                          }`}
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
                          id="login-password"
                          className={`form-input bs-1 w100 ${
                            meta.error && meta.touched ? "input-error" : ""
                          }`}
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
                          className={`form-input bs-1 w100 ${
                            meta.error && meta.touched ? "input-error" : ""
                          }`}
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
                          className={`form-input bs-1 w100 ${
                            meta.error && meta.touched ? "input-error" : ""
                          }`}
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
                          className={`form-input bs-1 w100 ${
                            meta.error && meta.touched ? "input-error" : ""
                          }`}
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
                  <div className="flex-row align-c mb12">
                    <Field
                      name="hasAcceptedTCs"
                      validate={required}
                      type="checkbox"
                    >
                      {({ input, meta }) => (
                        <div className="flex-row align-c relative">
                          <input
                            id="terms-and-conditions"
                            type="checkbox"
                            {...input}
                          />
                          {meta.error && meta.touched && (
                            <span className="form-error f10">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <label htmlFor="terms-and-conditions" className="ml8 f12">
                      Accept{" "}
                      <span
                        onClick={() => history.push("/terms-and-conditions")}
                        className="link-underline"
                      >
                        Terms and Conditions
                      </span>{" "}
                      and{" "}
                      <span
                        onClick={() => history.push("/privacy-policy")}
                        className="link-underline"
                      >
                        Privacy Policy
                      </span>
                      <span className="font-red f12 bold ml4">*</span>
                    </label>
                  </div>
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
            Forgot your password
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
    isLoggedIn: !!state.users?.data?._id,
    tab: state.navigation.tabs.login,
  };
};

const mapDispatchToProps = {
  loginUser,
  createUser,
  demoUser,
  setTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
