import React from "react";
import {
  required,
  composeValidators,
} from "../../../utils/formValidatorHelper";
import { Field } from "react-final-form";

const Input = ({ label, name, options }) => {
  const textarea = options?.textarea || false;
  const isRequired = !!options?.validators?.includes(required);
  const validators = options?.validators || [];
  const placeholder = options?.placeholder || "";
  const type = options?.type || "text";
  const autoComplete = options?.autoComplete;
  const extraClass = options?.extraClass;
  const id = options?.id || label;
  const initialValue = options?.initialValue;
  const disabled = options?.disabled || false;
  const maxLength = options?.maxLength;
  const min = options?.min;
  const max = options?.max;
  const step = options?.step;

  let className = `w-full bg-white rounded-md border focus:border-indigo-500
  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
  px-3 transition-colors duration-200 ease-in-out leading-6 `;

  if (disabled) {
    className = `opacity-50 rounded-lg border-transparent flex-1 appearance-none
  border-gray-300 w-full py-1 px-3 bg-white text-gray-700 placeholder-gray-400
  shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600
  focus:border-transparent border leading-6`;
  }

  return (
    <>
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
      <Field
        name={name}
        initialValue={initialValue}
        validate={composeValidators(...validators)}
      >
        {({ input, meta }) => (
          <div className={`relative ${extraClass}`}>
            {textarea && (
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
            )}
            {!textarea && (
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
            )}
            {meta.error && meta.touched && (
              <p
                className={`absolute text-xs text-red-500 ${
                  textarea ? "-mt-1" : "mt-0.5"
                }`}
              >
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
