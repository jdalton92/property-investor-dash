import React from "react";
import { connect } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import { setMessage } from "../reducers/contactReducer";
import { Button } from "react-bootstrap";
import "./styles/Form.css";
import {
  required,
  isEmail,
  composeValidators
} from "../helpers/formValidatorHelper";

const Contact = props => {
  const onSubmit = values => {
    props.setMessage(values);
  };

  return (
    <section className="form-section" id="contact-form-section">
      <div className="form-outer-container form-card-container">
        <div className="form-header">
          <h1>Contact</h1>
        </div>
        <div className="form-inner-container">
          <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit, rest }) => (
              <form className="form-element" onSubmit={handleSubmit}>
                <div className="form-item">
                  <h5>Full Name</h5>
                  <Field name="fullName" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <input
                          className="form-control"
                          placeholder="Full Name"
                          type="text"
                          maxLength="50"
                          {...input}
                          required
                        />
                        {meta.error && meta.touched && (
                          <span className="form-error">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="form-item">
                  <h5>Company</h5>
                  <Field name="company">
                    {({ input, meta }) => (
                      <input
                        className="form-control"
                        placeholder="Company"
                        type="text"
                        maxLength="50"
                        {...input}
                      />
                    )}
                  </Field>
                </div>
                <div className="form-item">
                  <h5>Email</h5>
                  <Field
                    name="email"
                    validate={composeValidators(isEmail, required)}
                  >
                    {({ input, meta }) => (
                      <div>
                        <input
                          className="form-control"
                          placeholder="example@email.com"
                          type="email"
                          maxLength="100"
                          {...input}
                          required
                        />
                        {meta.error && meta.touched && (
                          <span className="form-error">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="form-item">
                  <h5>Message</h5>
                  <Field name="message" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <textarea
                          id="form-message"
                          className="form-control"
                          placeholder="Message"
                          input="text"
                          maxLength="1250"
                          {...input}
                          required
                        />
                        {meta.error && meta.touched && (
                          <span className="form-error">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="form-button-container">
                  <Button
                    className="form-button"
                    id="form-submit"
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = {
  setMessage
};

export default connect(null, mapDispatchToProps)(Contact);
