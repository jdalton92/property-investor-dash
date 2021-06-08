import React from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import Input from "../Shared/FinalForm/Input";
import Button from "../Shared/FinalForm/Button";
import { updateUser } from "../../reducers/usersReducer";
import { required, isEmail } from "../../utils/formValidatorHelper";

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
    <>
      <h2 className="font-semibold mb-2">Change Email</h2>
      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <Form
          onSubmit={handleEmailChange}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Input
                label={"Existing Email"}
                name={"email"}
                options={{
                  id: "old-email",
                  validators: [required, isEmail],
                  placeholder: "example@email.com",
                  type: "email",
                  extraClass: "mb-4",
                  disabled: true,
                  initialValue: user.email,
                }}
              />
              <Input
                label={"New Email"}
                name={"newEmail"}
                options={{
                  id: "new-email",
                  validators: [required, isEmail],
                  placeholder: "new@email.com",
                  type: "email",
                  extraClass: "mb-7",
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);
