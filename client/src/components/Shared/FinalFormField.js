import React from "react";
import CalculatorFormTooltip from "../CalculatorForms/CalculatorFormTooltip";
import { Field } from "react-final-form";
import { Form, InputGroup } from "react-bootstrap";
import { composeValidators } from "../../helpers/formValidatorHelper";

const FinalFormField = ({
  title,
  fieldName,
  type,
  validators,
  placeholder,
  fieldType,
  maxLength,
  min,
  max,
  step,
  prependStart,
  prependEnd,
  parseType,
  readOnly,
}) => {
  const parse = (value) => {
    if (parseType === "parseInt") {
      return isNaN(parseInt(value)) ? "" : parseInt(value);
    }
    return isNaN(parseFloat(value)) ? "" : parseFloat(value);
  };
  return (
    <div className="input-item">
      <Form.Label>
        <div className="input-label-container">
          <div className="input-title-separator">{title}</div>
          <div className="input-helper-separator">
            <CalculatorFormTooltip input={fieldName} type={type} />
          </div>
        </div>
      </Form.Label>
      <Field
        name={fieldName}
        validate={composeValidators(...validators)}
        parse={parse}
      >
        {({ input, meta }) => (
          <div className="input-error-group">
            <InputGroup>
              {prependStart ? (
                <InputGroup.Prepend>
                  <InputGroup.Text>{prependStart}</InputGroup.Text>
                </InputGroup.Prepend>
              ) : null}
              <input
                className="form-control"
                placeholder={placeholder}
                type={fieldType}
                maxLength={maxLength}
                min={min}
                max={max}
                step={step}
                {...input}
                readOnly={readOnly}
              />
              {prependEnd ? (
                <InputGroup.Prepend>
                  <InputGroup.Text>{prependEnd}</InputGroup.Text>
                </InputGroup.Prepend>
              ) : null}
            </InputGroup>
            {meta.error && meta.touched && (
              <span className="form-error">{meta.error}</span>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export default FinalFormField;
