import React from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import Input from "./Shared/FinalForm/Input";
import Button from "./Shared/FinalForm/Button";
import { sendMessage } from "../reducers/contactReducer";
import { required, maxLength, isEmail } from "../utils/formValidatorHelper";

const Contact = ({ sendMessage, isSending, email }) => {
  return (
    <>
      <h1 className="my-2 text-xl font-semibold">Contact</h1>
      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <Form
          onSubmit={(values) => sendMessage(values)}
          render={({ handleSubmit, rest }) => (
            <form className="contact-form" onSubmit={handleSubmit}>
              <Input
                label={"Full Name"}
                name={"fullName"}
                options={{
                  id: "contact-full-name",
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
                  id: "contact-company",
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
                  id: "contact-email",
                  validators: [required, isEmail, maxLength(200)],
                  placeholder: "example@email.com",
                  type: "email",
                  extraClass: "mb-4",
                  initialValue: email,
                }}
              />
              <Input
                label={"Message"}
                name={"message"}
                options={{
                  textarea: true,
                  id: "contact-message",
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
                  buttonClass: "w-32",
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
    email: state.users.data?.email,
  };
};

const mapDispatchToProps = {
  sendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
