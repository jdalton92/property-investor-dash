import React from "react";
import { Field } from "react-final-form";
import { required, composeValidators } from "../../utils/formValidatorHelper";
import {
  developerTooltipHelper,
  occupierInvestorTooltipHelper,
} from "../../utils/tooltipHelper";
import { CONSTANTS } from "../../static/constants";

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
      ? developerTooltipHelper[fieldName].message
      : occupierInvestorTooltipHelper[fieldName].message;

  const parse = (value) => {
    if (parseType === "parseInt") {
      return isNaN(parseInt(value)) ? "" : parseInt(value);
    }
    return isNaN(parseFloat(value)) ? "" : parseFloat(value);
  };

  const id = `${type}-${fieldName}`.toLowerCase();

  return (
    <>
      <label htmlFor={id} className="f16 mb8">
        {label}
        {validators.includes(required) && (
          <span className="font-red f12 bold ml4">*</span>
        )}
      </label>
      {/* <button type="button" className="ml8">
        <span aria-label={message} data-balloon-pos="up" className="f12">
          ?
        </span>
      </button> */}
      <Field
        name={fieldName}
        validate={composeValidators(...validators)}
        parse={parse}
      >
        {({ input, meta }) => (
          <div className="relative mb20">
            <input
              id={id}
              className={`form-input w100 ${prepend ? "pl32" : ""} ${
                append ? "pr80" : ""
              }`}
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
              <span className="prepend absolute f16 pl12 pt10">{prepend}</span>
            )}
            {append && (
              <span className="append absolute f16 pr12 pt10">{append}</span>
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
