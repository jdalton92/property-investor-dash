import React from "react";
import {
  required,
  composeValidators,
  slugify,
} from "../../../utils/formValidatorHelper";
import { Field } from "react-final-form";
import Tooltip from "../Tooltip";
import { CONSTANTS } from "../../../constants/constants";
import {
  developerTooltips,
  occupierTooltips,
  investorTooltips,
} from "../../../constants/tooltips";

const Input = ({
  label,
  name,
  prepend = undefined,
  append = undefined,
  options,
}) => {
  const textarea = options?.textarea || false;
  const isRequired = !!options?.validators?.includes(required);
  const validators = options?.validators || [];
  const placeholder = options?.placeholder || label || "";
  const type = options?.type || "text";
  const autoComplete = options?.autoComplete;
  const extraClass = options?.extraClass;
  const id = options?.id || slugify(label);
  const initialValue = options?.initialValue;
  const disabled = options?.disabled || false;
  const maxLength = options?.maxLength;
  const min = options?.min;
  const max = options?.max;
  const step = options?.step;
  const tooltipType = options?.tooltipType;

  let borderRadius;
  if (prepend && !append) {
    borderRadius = "rounded-tr-md rounded-br-md";
  } else if (append && !prepend) {
    borderRadius = "rounded-tl-md rounded-bl-md";
  } else if (!append && !prepend) {
    borderRadius = "rounded-md";
  }

  let className = `flex-grow bg-white border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out leading-6 ${borderRadius} `;

  if (disabled) {
    className = `opacity-50 rounded-lg border-transparent flex-1 appearance-none border-gray-300 flex-grow py-1 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent border leading-6 ${borderRadius} `;
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
          <div className={`relative ${extraClass}`}>
            {textarea && (
              <div className="flex">
                <textarea
                  id={id}
                  className={`${className}
                ${
                  meta.error && meta.touched
                    ? "ring-2 border-red-600 ring-red-300"
                    : "border-gray-300"
                }`}
                  placeholder={placeholder}
                  type={type}
                  autoComplete={autoComplete}
                  maxLength={maxLength}
                  min={min}
                  max={max}
                  step={step}
                  disabled={disabled}
                  {...input}
                />
              </div>
            )}
            {!textarea && (
              <div className="flex">
                {prepend && (
                  <span className="inline-flex rounded-l-md items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                    {prepend}
                  </span>
                )}
                <input
                  id={id}
                  className={`${className}
                ${
                  meta.error && meta.touched
                    ? "ring-2 border-red-600 ring-red-300"
                    : "border-gray-300"
                }`}
                  placeholder={placeholder}
                  type={type}
                  autoComplete={autoComplete}
                  maxLength={maxLength}
                  min={min}
                  max={max}
                  step={step}
                  disabled={disabled}
                  {...input}
                />
                {append && (
                  <span className="items-center inline-flex rounded-r-md px-3 border-t bg-white border-r border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                    {append}
                  </span>
                )}
              </div>
            )}
            {meta.error && meta.touched && (
              <p className="absolute text-xs text-red-500 mt-0.5">
                {meta.error}
              </p>
            )}
          </div>
        )}
      </Field>
    </>
  );
};

export default Input;
