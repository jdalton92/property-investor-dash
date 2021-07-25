import React from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import { requestPasswordReset } from "../reducers/usersReducer";
import Input from "./Shared/FinalForm/Input";
import Button from "./Shared/FinalForm/Button";
import {
  required,
  minLength,
  isEmail,
  maxLength,
} from "../utils/formValidatorHelper";
import Loader from "./Shared/Loader";

const ResetPassword = ({ isFetching, requestPasswordReset }) => {
  const handleResetPassword = ({ email }) => {
    requestPasswordReset(email);
  };

  if (isFetching) {
    return <Loader />;
  } else {
    return (
      <>
        <h1 className="my-2 text-2xl font-semibold">Reset Password</h1>
        <div className="shadow-xl rounded-2xl p-4 bg-white">
          <Form
            onSubmit={handleResetPassword}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  label={"Email"}
                  name={"email"}
                  options={{
                    validators: [
                      required,
                      isEmail,
                      minLength(3),
                      maxLength(200),
                    ],
                    placeholder: "your@email.com",
                    type: "email",
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
  requestPasswordReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
