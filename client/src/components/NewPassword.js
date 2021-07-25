import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import Input from "./Shared/FinalForm/Input";
import Button from "./Shared/FinalForm/Button";
import Loader from "./Shared/Loader";
import { resetPassword } from "../reducers/usersReducer";
import { setNotification } from "../reducers/notificationReducer";
import { CONSTANTS } from "../constants/constants";
import queryString from "query-string";
import { required, minLength } from "../utils/formValidatorHelper";

const NewPassword = ({ isFetching, resetPassword, setNotification }) => {
  const history = useHistory();
  const { id, token } = queryString.parse(history.location.search);

  if (!id || !token) {
    history.push("/");
    setNotification("Invalid password reset url", CONSTANTS.NOTIFICATION.ERROR);
  }

  const handleSetNewPassword = ({ password, checkPassword }) => {
    resetPassword(id, token, password, checkPassword);
  };

  if (isFetching) {
    return <Loader />;
  } else {
    return (
      <>
        <h1 className="my-2 text-2xl font-semibold">Set New Password</h1>
        <div className="shadow-xl rounded-2xl p-4 bg-white">
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
                <Input
                  label={"New Password"}
                  name={"password"}
                  options={{
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
                    validators: [required, minLength(3)],
                    placeholder: "Password",
                    type: "password",
                    autoComplete: "off",
                    extraClass: "mb-6",
                  }}
                />
                <Button
                  label={"Confirm"}
                  type={"submit"}
                  options={{
                    styleType: "primary",
                    buttonClass: "w-full md:w-32",
                    // isLoading: isSending,
                    iconClass: "mr-20",
                  }}
                />
              </form>
            )}
          />
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.users.isFetching,
    user: state.users,
    tab: state.navigation.tabs.login,
  };
};

const mapDispatchToProps = {
  resetPassword,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
