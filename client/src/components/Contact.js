import React from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { setMessage } from "../reducers/contactReducer";
import {
  required,
  maxLength,
  isEmail,
  composeValidators,
} from "../utils/formValidatorHelper";
import Loader from "./Shared/Loader";

const Contact = ({ setMessage, isFetching }) => {
  const onSubmit = (values) => {
    setMessage(values);
  };

  return (
    <>
      <h1 className="f24 bold mt16 mb16">Contact</h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, rest }) => (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div id="contact-wrapper" className="r bs-3 bg-1 p20 mb20">
              {isFetching && <Loader />}
              {!isFetching && (
                <>
                  <label htmlFor={"contact-fullname"} className="f16 mb8">
                    Full Name
                    <span className="font-red f12 bold ml4">*</span>
                  </label>
                  <Field
                    name="fullName"
                    validate={composeValidators(required, maxLength(50))}
                  >
                    {({ input, meta }) => (
                      <div className="relative mb20">
                        <input
                          id="contact-fullname"
                          className="form-input bs-1 w100"
                          placeholder="Full Name"
                          input="text"
                          maxLength="1250"
                          {...input}
                        />
                        {meta.error && meta.touched && (
                          <span className="form-error f10">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <label htmlFor={"contact-company"} className="f16 mb8">
                    Company
                  </label>
                  <Field
                    name="company"
                    validate={composeValidators(maxLength(200))}
                  >
                    {({ input, meta }) => (
                      <div className="relative mb20">
                        <input
                          id="contact-company"
                          className="form-input bs-1 w100"
                          placeholder="Company Name"
                          input="text"
                          {...input}
                        />
                        {meta.error && meta.touched && (
                          <span className="form-error f10">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <label htmlFor={"contact-email"} className="f16 mb8">
                    Email
                    <span className="font-red f12 bold ml4">*</span>
                  </label>
                  <Field
                    name="email"
                    validate={composeValidators(isEmail, maxLength(200))}
                  >
                    {({ input, meta }) => (
                      <div className="relative mb20">
                        <input
                          id="contact-email"
                          className="form-input bs-1 w100"
                          placeholder="example@email.com"
                          input="email"
                          {...input}
                        />
                        {meta.error && meta.touched && (
                          <span className="form-error f10">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <label htmlFor={"contact-message"} className="f16 mb8">
                    Message
                    <span className="font-red f12 bold ml4">*</span>
                  </label>
                  <Field
                    name="message"
                    validate={composeValidators(required, maxLength(1250))}
                  >
                    {({ input, meta }) => (
                      <div className="relative mb20">
                        <textarea
                          id="contact-message"
                          className="form-input bs-1 w100"
                          placeholder="Message"
                          input="text"
                          {...input}
                        />
                        {meta.error && meta.touched && (
                          <span className="form-error f10">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </>
              )}
            </div>
            <div className="form-buttons">
              <button
                type="submit"
                className="form-button-p bs-3 font-white mt12 pt8 pb8"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.contact.isFetching,
  };
};

const mapDispatchToProps = {
  setMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
