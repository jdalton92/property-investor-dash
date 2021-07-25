import React from "react";
import {
  required,
  composeValidators,
} from "../../../utils/formValidatorHelper";
import { Field } from "react-final-form";
import Tooltip from "../Tooltip";
import { CONSTANTS } from "../../../constants/constants";
import {
  developerTooltips,
  occupierTooltips,
  investorTooltips,
} from "../../../constants/tooltips";

const Select = ({ label, name, options }) => {
  const isRequired = !!options?.validators?.includes(required);
  const defaultLabel = options?.defaultLabel;
  const dropdownOptions = options?.dropdownOptions;
  const validators = options?.validators || [];
  const extraClass = options?.extraClass;
  const id = options?.id || label;
  const initialValue = options?.initialValue;
  const disabled = options?.disabled || false;
  const tooltipType = options?.tooltipType;

  let className = `flex-grow bg-white border focus:border-indigo-500 z-10
  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
  px-3 transition-colors duration-200 ease-in-out leading-6 rounded-md `;

  if (disabled) {
    className = `opacity-50 rounded-lg border-transparent flex-1 appearance-none
    border-gray-300 flex-grow py-1 px-3 bg-white text-gray-700 placeholder-gray-400
    shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 z-10
    focus:border-transparent border leading-6 rounded-md `;
  }

  let tooltipMessage;
  switch (tooltipType) {
    case CONSTANTS.TYPES.DEVELOPER:
      tooltipMessage = developerTooltips[name].message;
      break;
    case CONSTANTS.TYPES.INVESTOR:
      tooltipMessage = investorTooltips[name].message;
      break;
    case CONSTANTS.TYPES.OCCUPIER:
      tooltipMessage = occupierTooltips[name].message;
      break;
    default:
      break;
  }

  return (
    <>
      <div className="flex justify-between">
        <label
          htmlFor={id}
          className="text-sm leading-7 text-gray-600 cursor-pointer"
        >
          {label}
          {isRequired && (
            <>
              {" "}
              <span className="text-red-500 required-dot">*</span>
            </>
          )}
        </label>
        {tooltipType && <Tooltip message={tooltipMessage} />}
      </div>
      <Field
        name={name}
        initialValue={initialValue}
        validate={composeValidators(...validators)}
      >
        {({ input, meta }) => (
          <div className={`relative flex ${extraClass}`}>
            <select
              id={id}
              className={`${className}
                ${
                  meta.error && meta.touched
                    ? "ring-2 border-red-600 ring-red-300"
                    : "border-gray-300"
                }`}
              {...input}
            >
              <option value="" disabled hidden>
                {defaultLabel}
              </option>
              {dropdownOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {meta.error && meta.touched && (
              <p className="absolute text-xs text-red-500 -bottom-5">
                {meta.error}
              </p>
            )}
          </div>
        )}
      </Field>
    </>
  );
};

export default Select;
