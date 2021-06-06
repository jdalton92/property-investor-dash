import React from "react";
import {
  required,
  composeValidators,
} from "../../../utils/formValidatorHelper";
import { Field } from "react-final-form";

const Input = ({ label, name, options }) => {
  const isRequired = !!options?.validators?.includes(required);
  const validators = options?.validators || [];
  const placeholder = options?.placeholder || "";
  const type = options?.type || "text";
  const autoComplete = options?.autoComplete;
  const extraClass = options?.extraClass;
  const id = options?.id || label;
  const maxLength = options?.maxLength;
  const min = options?.min;
  const max = options?.max;
  const step = options?.step;
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
      <Field name={name} validate={composeValidators(...validators)}>
        {({ input, meta }) => (
          <div className={`relative ${extraClass}`}>
            <input
              id={id}
              className={`w-full bg-white rounded-md border
                focus:border-indigo-500 focus:ring-2
                focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 transition-colors
                duration-200 ease-in-out leading-6
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
              {...input}
            />
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
