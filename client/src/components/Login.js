import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { useHistory, Link } from "react-router-dom";
import { loginUser, createUser, demoUser } from "../reducers/usersReducer";
import { setTab } from "../reducers/navigationReducer";
import { required, minLength, isEmail } from "../utils/formValidatorHelper";
import { CONSTANTS } from "../static/constants";
import Tab from "./Shared/Tab";
import Input from "./Shared/FinalForm/Input";
import Button from "./Shared/FinalForm/Button";
import hero from "../styles/images/hero.jpg";

const Login = ({
  loginUser,
  isUserFetching,
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
    } else {
      switch (history.location.pathname) {
        case "/login":
          setTab("login", CONSTANTS.TABS.LOGIN.LOGIN);
          break;
        case "/sign-up":
          setTab("login", CONSTANTS.TABS.LOGIN.CREATEUSER);
          break;
        default:
          history.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleLogin = ({ email, password }) => {
    loginUser(email, password);
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
    <div className="animate-fade-in flex flex-row h-screen bg-indigo-900">
      <div
        className="h-full bg-cover bg-no-repeat bg-center object-cover hidden
        md:block md:flex-1 z-10"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        <div className="h-full w-full bg-gray-700 bg-opacity-25" />
      </div>
      <div className="flex h-screen w-full lg:w-700px">
        <div className="flex flex-col m-auto">
          <div className="shadow-xl rounded-2xl p-4 bg-white h-550px w-full sm:w-450px">
            <Link className="w-full hover:underline" to={"/"}>
              <h1 className="text-center font-medium text-2xl text-shadow-xs mt-3 mb-7">
                PropertyInvestorDash
              </h1>
            </Link>
            <div className="flex mb-4">
              <Tab
                title={"Login"}
                to={"/login"}
                options={{
                  icon: "user",
                  onClick: () => setTab("login", CONSTANTS.TABS.LOGIN.LOGIN),
                }}
              />
              <Tab
                title={"Create Account"}
                to={"/sign-up"}
                options={{
                  icon: "create-user",
                  onClick: () =>
                    setTab("login", CONSTANTS.TABS.LOGIN.CREATEUSER),
                }}
              />
            </div>
            {tab === CONSTANTS.TABS.LOGIN.LOGIN && (
              <Form
                onSubmit={handleLogin}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Input
                      label={"Email"}
                      name={"email"}
                      options={{
                        id: "login-email",
                        validators: [required, isEmail],
                        placeholder: "example@email.com",
                        type: "text",
                        extraClass: "mb-4",
                      }}
                    />
                    <Input
                      label={"Password"}
                      name={"password"}
                      options={{
                        id: "login-password",
                        validators: [required, minLength(3)],
                        placeholder: "Password",
                        type: "password",
                        autoComplete: "off",
                        extraClass: "mb-7",
                      }}
                    />
                    <Button
                      label={"Login"}
                      type={"submit"}
                      options={{
                        styleType: "primary",
                        buttonClass: "w-full",
                        isLoading: isUserFetching,
                        iconClass: "mr-20",
                      }}
                    />
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
                    <Input
                      label={"Email"}
                      name={"email"}
                      options={{
                        id: "create-email",
                        validators: [required, isEmail],
                        placeholder: "example@email.com",
                        type: "text",
                        extraClass: "mb-4",
                      }}
                    />
                    <Input
                      label={"Password"}
                      name={"password"}
                      options={{
                        id: "create-password",
                        validators: [required, minLength(3)],
                        placeholder: "Password",
                        type: "password",
                        autoComplete: "off",
                        extraClass: "mb-4",
                      }}
                    />
                    <Input
                      label={"Confirm Password"}
                      name={"checkPassword"}
                      options={{
                        id: "create-confirm",
                        validators: [required, minLength(3)],
                        placeholder: "Password",
                        type: "password",
                        autoComplete: "off",
                        extraClass: "mb-6",
                      }}
                    />
                    <div className="flex items-center">
                      <Field
                        name="hasAcceptedTCs"
                        validate={required}
                        type="checkbox"
                      >
                        {({ input, meta }) => (
                          <>
                            <div className="relative flex items-center mb-4">
                              <input
                                className={`${
                                  meta.error && meta.touched
                                    ? "ring-2 border-red-600 ring-red-300"
                                    : ""
                                }`}
                                id="terms-and-conditions"
                                type="checkbox"
                                {...input}
                              />
                              <label
                                className="ml-1 text-xs"
                                htmlFor="terms-and-conditions"
                              >
                                Accept{" "}
                                <Link
                                  className="underline"
                                  to="/terms-and-conditions"
                                >
                                  Terms and Conditions
                                </Link>{" "}
                                and{" "}
                                <Link
                                  className="underline"
                                  to="/privacy-policy"
                                >
                                  Privacy Policy
                                </Link>
                                <span className="text-red-500 required-dot">
                                  {" "}
                                  *
                                </span>
                              </label>
                            </div>
                            {meta.error && meta.touched && (
                              <p className="absolute text-xs text-red-500 mt-4">
                                {meta.error}
                              </p>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                    <Button
                      label={"Create Account"}
                      type={"submit"}
                      options={{
                        styleType: "primary",
                        buttonClass: "w-full",
                        isLoading: isUserFetching,
                        iconClass: "mr-36",
                      }}
                    />
                  </form>
                )}
              />
            )}
          </div>
          <div className="mt-1">
            <Link
              className="text-xs text-white hover:text-gray-300 hover:underline"
              to="/reset-password"
            >
              Forgot your password
            </Link>
          </div>
          <div className="mt-1">
            <Link
              className="text-xs text-white hover:text-gray-300 hover:underline"
              onClick={handleDemo}
              to="/"
            >
              Try a demo account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserFetching: state.users.isFetching,
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
