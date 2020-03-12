export const required = value => (value ? undefined : "Required");

export const mustBeNumber = value =>
  isNaN(value) ? "Must be a number" : undefined;

export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const maxValue = max => value =>
  isNaN(value) || value <= max
    ? undefined
    : `Should be less than ${max ? max : "house price"}`;

export const minLength = min => value =>
  value.length < min ? `Should be greater than ${min} characters` : undefined;

export const maxLength = max => value =>
  value.length > max ? `Should be less than ${max} characters` : undefined;

export const isEmail = value => {
  const email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return email.test(value) ? undefined : "Please use valid email address";
};

export const equalTo = match => value =>
  value === match ? undefined : "Passwords must match";

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
