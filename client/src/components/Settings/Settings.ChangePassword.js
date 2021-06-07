import React from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import Input from "../Shared/FinalForm/Input";
import Button from "../Shared/FinalForm/Button";
import { updateUser } from "../../reducers/usersReducer";
import { required, minLength } from "../../utils/formValidatorHelper";

const ChangePassword = ({ user, updateUser }) => {
  const handleSubmit = async (values) => {
    // React final form handles e.preventDefault()
    const { oldPassword, newPassword, checkPassword } = values;
    const userData = {
      oldPassword,
      newPassword,
      checkPassword,
    };
    updateUser(user._id, userData);
  };

  return (
    <>
      <h2 className="font-semibold my-2">Change Password</h2>
      <div className="shadow-xl rounded-2xl p-4 bg-white">
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
              <Input
                label={"Old Password"}
                name={"oldPassword"}
                options={{
                  id: "old-password",
                  validators: [required, minLength(3)],
                  placeholder: "Password",
                  type: "password",
                  extraClass: "mb-4",
                  required: true,
                  autoComplete: "off",
                }}
              />
              <Input
                label={"New Password"}
                name={"newPassword"}
                options={{
                  id: "new-password",
                  validators: [required, minLength(3)],
                  placeholder: "Password",
                  type: "password",
                  extraClass: "mb-4",
                  required: true,
                  autoComplete: "off",
                }}
              />
              <Input
                label={"Confirm New Password"}
                name={"checkPassword"}
                options={{
                  id: "confirm-password",
                  validators: [required, minLength(3)],
                  placeholder: "Password",
                  type: "password",
                  extraClass: "mb-7",
                  required: true,
                  autoComplete: "off",
                }}
              />
              <Button
                label={"Update"}
                type={"submit"}
                options={{
                  styleType: "primary",
                  isLoading: user.isFetching,
                  iconClass: "mr-20",
                }}
              />
            </form>
          )}
        />
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
