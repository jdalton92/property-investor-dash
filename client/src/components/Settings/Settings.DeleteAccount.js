import React from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import { deleteUser } from "../../reducers/usersReducer";
import Input from "../Shared/FinalForm/Input";
import Button from "../Shared/FinalForm/Button";
import { required, minLength } from "../../utils/formValidatorHelper";

const DeleteAccount = ({ user, deleteUser }) => {
  const handleSubmit = async ({ password }) => {
    const confirm = window.confirm(`Delete ${user.email}?`);
    if (confirm) {
      deleteUser(user._id, password);
    }
  };

  return (
    <>
      <h2 className="font-semibold my-2">Delete Account</h2>
      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Input
                label={"Password"}
                name={"password"}
                options={{
                  id: "password",
                  validators: [required, minLength(3)],
                  placeholder: "Password",
                  type: "password",
                  extraClass: "mb-7",
                  autoComplete: "off",
                }}
              />
              <Button
                label={"Delete"}
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
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
