import React from "react";
import { FieldArray } from "react-final-form-arrays";
import { Field } from "react-final-form";
import {
  minValue,
  maxValue,
  composeValidators,
} from "../../utils/formValidatorHelper";

const MortgageOverpayments = ({ push, type }) => {
  return (
    <>
      <label htmlFor={`${type}-overpayments`} className="f16 mb8">
        Mortgage Overpayments
      </label>
      <FieldArray name="overPayments">
        {({ fields }) => (
          <>
            <table id={`${type}-overpayments`} className="w100 mb20">
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <span className="mb8">Year</span>
                  </th>
                  <th>
                    <span className="ml8 mb8">Overpayment</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {fields.map((name, index) => (
                  <tr key={index}>
                    <th>
                      <span>{index + 1}</span>
                    </th>
                    <td>
                      <Field name={`${name}.year`} validate={minValue(0)}>
                        {({ input, meta }) => (
                          <div className="relative mr8">
                            <input
                              className="form-input w100"
                              placeholder="Year"
                              type="number"
                              step="1"
                            />
                            {meta.error && meta.touched && (
                              <span className="form-error f10">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                    </td>
                    <td>
                      <Field
                        name={`${name}.payment`}
                        validate={composeValidators(
                          minValue(0),
                          maxValue(1000000)
                        )}
                      >
                        {({ input, meta }) => (
                          <div className="relative ml8">
                            <input
                              className="form-input w100 pl32"
                              placeholder="Overpayment"
                              type="number"
                              step="1"
                            />
                            <span className="prepend absolute f16 pl12 pt10">
                              $
                            </span>
                            {meta.error && meta.touched && (
                              <span className="form-error f10">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="form-button-p font-white"
              onClick={() => push("overPayments", undefined)}
              type="button"
            >
              Add Overpayment
            </button>
          </>
        )}
      </FieldArray>
    </>
  );
};

export default MortgageOverpayments;
