import React from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import Input from "./Shared/FinalForm/Input";
import Button from "./Shared/FinalForm/Button";
import { sendMessage } from "../reducers/contactReducer";
import {
  required,
  maxLength,
  minLength,
  isEmail,
} from "../utils/formValidatorHelper";

const Contact = ({ sendMessage, isSending, userData }) => {
  const getEmail = () => {
    if (userData.roles.some((role) => role === "demo")) {
      return "";
    } else {
      return userData?.email;
    }
  };
  return (
    <>
      <h1 className="my-2 text-2xl font-semibold">Contact</h1>
      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <Form
          onSubmit={(values) => sendMessage(values)}
          render={({ handleSubmit, rest }) => (
            <form onSubmit={handleSubmit}>
              <Input
                label={"Full Name"}
                name={"fullName"}
                options={{
                  validators: [required, maxLength(50)],
                  placeholder: "Full Name",
                  type: "text",
                  extraClass: "mb-4",
                }}
              />
              <Input
                label={"Company"}
                name={"company"}
                options={{
                  validators: [maxLength(200)],
                  placeholder: "Company Name",
                  type: "text",
                  extraClass: "mb-4",
                }}
              />
              <Input
                label={"Email"}
                name={"email"}
                options={{
                  validators: [required, isEmail, minLength(3), maxLength(200)],
                  placeholder: "example@email.com",
                  type: "email",
                  extraClass: "mb-4",
                  initialValue: getEmail(),
                }}
              />
              <Input
                label={"Message"}
                name={"message"}
                options={{
                  textarea: true,
                  validators: [required, maxLength(1000)],
                  placeholder: "Message...",
                  type: "text",
                  extraClass: "mb-6",
                }}
              />
              <Button
                label={"Submit"}
                type={"submit"}
                options={{
                  styleType: "primary",
                  buttonClass: "w-full md:w-32",
                  isLoading: isSending,
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
    isSending: state.contact.isFetching,
    userData: state.users.data,
  };
};

const mapDispatchToProps = {
  sendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
