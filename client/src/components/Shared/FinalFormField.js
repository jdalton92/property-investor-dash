import React from "react";
import { Field } from "react-final-form";
import { required, composeValidators } from "../../utils/formValidatorHelper";
import {
  developerTooltip,
  occupierInvestorTooltip,
} from "../../static/tooltipText";
import { CONSTANTS } from "../../static/constants";
import Tooltip from "./Tooltip";

const FinalFormField = ({
  label,
  fieldName,
  type,
  validators,
  placeholder,
  fieldType,
  maxLength,
  min,
  max,
  step,
  prepend,
  append,
  parseType,
  readOnly,
}) => {
  const message =
    type === CONSTANTS.TYPES.DEVELOPER
      ? developerTooltip[fieldName]?.message
      : occupierInvestorTooltip[fieldName]?.message;

  const parse = (value) => {
    if (parseType === CONSTANTS.PARSETYPE.INT) {
      return isNaN(parseInt(value)) ? "" : parseInt(value);
    }
    return isNaN(parseFloat(value)) ? "" : parseFloat(value);
  };

  const id = `${type}-${fieldName}`.toLowerCase();

  return (
    <>
      <div className="flex-row align-c relative">
        <label htmlFor={id} className="f16 mb8">
          {label}
          {validators.includes(required) && (
            <span className="font-red f12 bold ml4">*</span>
          )}
        </label>
        {message && <Tooltip message={message} />}
      </div>
      <Field
        name={fieldName}
        validate={composeValidators(...validators)}
        parse={parse}
      >
        {({ input, meta }) => (
          <div className="relative mb20">
            <input
              id={id}
              className={`form-input bs-1 w100 ${prepend ? "pl32" : ""} ${
                append ? "pr70" : ""
              } ${meta.error && meta.touched ? "input-error" : ""}`}
              placeholder={placeholder}
              type={fieldType}
              maxLength={maxLength}
              min={min}
              max={max}
              step={step}
              {...input}
              readOnly={readOnly}
            />
            {prepend && (
              <span className="prepend absolute f12 pl12 pt12">{prepend}</span>
            )}
            {append && (
              <span className="append absolute f12 pr12 pt12">{append}</span>
            )}
            {meta.error && meta.touched && (
              <span className="form-error f10">{meta.error}</span>
            )}
          </div>
        )}
      </Field>
    </>
  );
};

export default FinalFormField;
