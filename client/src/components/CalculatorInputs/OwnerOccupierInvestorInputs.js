import React from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import FinalFormField from "../Shared/FinalFormField";
import { required, minValue, maxValue } from "../../utils/formValidatorHelper";
import { occupierInvestorTooltip } from "../../static/tooltipText";
import { CONSTANTS } from "../../static/constants";
import Tooltip from "../Shared/Tooltip";

const OwnerOccupierInvestorInputs = ({ initialValues, investor, onSubmit }) => {
  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          ...initialValues,
        }}
        render={({ handleSubmit, values, form }) => (
          <form onSubmit={handleSubmit}>
            <h2 className="f20 bold mt16 mb16">Base Assumptions</h2>
            <div className="r bs-3 bg-1 p20 mb20">
              {investor ? (
                <>
                  <div className="form-row">
                    <div className="form-item">
                      <FinalFormField
                        label={"Purchase Price"}
                        placeholder={"Purchase Price"}
                        fieldName={"purchasePrice"}
                        type={CONSTANTS.TYPES.OWNEROCCUPIER}
                        validators={[
                          required,
                          minValue(0),
                          maxValue(100000000),
                        ]}
                        fieldType={"number"}
                        step={"1"}
                        prepend={"$"}
                      />
                    </div>
                    <div className="form-item">
                      <FinalFormField
                        label={"Rental Yield"}
                        fieldName={"rentalYield"}
                        type={CONSTANTS.TYPES.OWNEROCCUPIER}
                        validators={[required, minValue(0), maxValue(100)]}
                        placeholder={"Rental Yield"}
                        fieldType={"number"}
                        maxLength={3}
                        step={0.1}
                        append={"% pa"}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-item">
                      <FinalFormField
                        label={"Ownership Length"}
                        fieldName={"ownershipLength"}
                        type={CONSTANTS.TYPES.OWNEROCCUPIER}
                        validators={[required, minValue(0), maxValue(30)]}
                        placeholder={"Ownership Length"}
                        fieldType={"number"}
                        step={1}
                        append={"years"}
                        parseType={CONSTANTS.PARSETYPE.INT}
                      />
                    </div>
                    <div className="form-item">
                      <FinalFormField
                        label={"Home Capital Growth"}
                        fieldName={"capitalGrowth"}
                        type={CONSTANTS.TYPES.OWNEROCCUPIER}
                        validators={[minValue(0), maxValue(100)]}
                        placeholder={"Home Capital Growth"}
                        fieldType={"number"}
                        step={0.01}
                        append={"% pa"}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-row">
                    <div className="form-item">
                      <FinalFormField
                        label={"Purchase Price"}
                        placeholder={"Purchase Price"}
                        fieldName={"purchasePrice"}
                        type={CONSTANTS.TYPES.OWNEROCCUPIER}
                        validators={[
                          required,
                          minValue(0),
                          maxValue(100000000),
                        ]}
                        fieldType={"number"}
                        step={"1"}
                        prepend={"$"}
                      />
                    </div>
                    <div className="form-item">
                      <FinalFormField
                        label={"Ownership Length"}
                        fieldName={"ownershipLength"}
                        type={CONSTANTS.TYPES.OWNEROCCUPIER}
                        validators={[required, minValue(0), maxValue(30)]}
                        placeholder={"Ownership Length"}
                        fieldType={"number"}
                        step={1}
                        append={"years"}
                        parseType={CONSTANTS.PARSETYPE.INT}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-item">
                      <FinalFormField
                        label={"Home Capital Growth"}
                        fieldName={"capitalGrowth"}
                        type={CONSTANTS.TYPES.OWNEROCCUPIER}
                        validators={[minValue(0), maxValue(100)]}
                        placeholder={"Home Capital Growth"}
                        fieldType={"number"}
                        step={0.01}
                        append={"% pa"}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <h2 className="f20 bold mb16">Costs</h2>
            <div className="r bs-3 bg-1 p20 mb20">
              <div className="form-row">
                <div className="form-item">
                  <FinalFormField
                    label={"Upfront Costs"}
                    fieldName={"upfrontCosts"}
                    type={CONSTANTS.TYPES.OWNEROCCUPIER}
                    validators={[minValue(0), maxValue(100)]}
                    placeholder={"Agents/legal fees etc"}
                    fieldType={"number"}
                    step={0.01}
                    append={"% of price"}
                  />
                </div>
                <div className="form-item">
                  <FinalFormField
                    label={"Selling Costs"}
                    fieldName={"sellingCosts"}
                    type={CONSTANTS.TYPES.OWNEROCCUPIER}
                    validators={[minValue(0), maxValue(100)]}
                    placeholder={"Acquisition Costs"}
                    fieldType={"number"}
                    step={0.01}
                    append={"% of sale"}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-item">
                  <FinalFormField
                    label={"Operating Costs"}
                    fieldName={"opex"}
                    type={CONSTANTS.TYPES.OWNEROCCUPIER}
                    validators={[minValue(0)]}
                    placeholder={"Water, electricity, insurance etc"}
                    fieldType={"number"}
                    step={1}
                    prepend={"$"}
                    append={"pa"}
                  />
                </div>
                <div className="form-item">
                  <FinalFormField
                    label={"Operating Cost Growth"}
                    fieldName={"opexGrowth"}
                    type={CONSTANTS.TYPES.OWNEROCCUPIER}
                    validators={[minValue(0), maxValue(100)]}
                    placeholder={"Operating Cost Growth"}
                    fieldType={"number"}
                    step={0.01}
                    append={"% pa"}
                  />
                </div>
              </div>
            </div>
            <h2 className="f20 bold mb16">Funding</h2>
            <div className="r bs-3 bg-1 p20 mb20">
              <div className="form-row">
                <div className="form-item">
                  <FinalFormField
                    label={"Deposit"}
                    fieldName={"deposit"}
                    type={CONSTANTS.TYPES.OWNEROCCUPIER}
                    validators={[
                      required,
                      minValue(0),
                      maxValue(values.purchasePrice),
                    ]}
                    placeholder={"Deposit"}
                    fieldType={"number"}
                    step={"1"}
                    prepend={"$"}
                  />
                </div>
                <div className="form-item">
                  <FinalFormField
                    label={"Homeloan Term"}
                    fieldName={"homeloanTerm"}
                    type={CONSTANTS.TYPES.OWNEROCCUPIER}
                    validators={[required, maxValue(30), minValue(0)]}
                    placeholder={"Homeloan Term"}
                    fieldType={"number"}
                    step={"1"}
                    append={"years"}
                    parseType={CONSTANTS.PARSETYPE.INT}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-item">
                  <div className="flex-row align-c relative">
                    <label
                      htmlFor="owneroccupier-repaymenttype"
                      className="f16 mb8"
                    >
                      Repayment Type
                      <span className="font-red f12 bold ml4">*</span>
                    </label>
                    <Tooltip
                      message={occupierInvestorTooltip.repaymentType.message}
                    />
                  </div>
                  <Field
                    name="repaymentType"
                    component="select"
                    validate={required}
                    defaultValue=""
                  >
                    {({ input, meta }) => (
                      <div className="relative mb20">
                        <select
                          className="form-input select w100 bs-1"
                          id="owneroccupier-repaymenttype"
                          {...input}
                        >
                          <option value="" disabled hidden>
                            Repayment Type
                          </option>
                          <option value="interestOnly">Interest Only</option>
                          <option value="principalAndInterest">
                            Principal + Interest
                          </option>
                        </select>
                        {meta.error && meta.touched && (
                          <span className="form-error f10">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="form-item">
                  <FinalFormField
                    label={"Loan Interest Rate"}
                    fieldName={"interestRate"}
                    type={CONSTANTS.TYPES.OWNEROCCUPIER}
                    validators={[required, maxValue(100), minValue(0)]}
                    placeholder={"Loan Interest Rate"}
                    maxLength={3}
                    fieldType={"number"}
                    step={"0.01"}
                    append={"% pa"}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-item">
                  <FinalFormField
                    label={"Mortgage Overpayment"}
                    fieldName={"overPayment"}
                    type={CONSTANTS.TYPES.OWNEROCCUPIER}
                    validators={[minValue(0)]}
                    placeholder={"Mortgage Overpayment"}
                    maxLength={3}
                    fieldType={"number"}
                    step={"0.01"}
                    prepend={"$"}
                    append={"pm"}
                  />
                </div>
              </div>
            </div>
            <div className="form-buttons mb20">
              <button
                type="submit"
                className="form-button-p bs-3 font-white mt12 pt8 pb8"
              >
                Submit
              </button>
              <button
                type="button"
                className="form-button-s bs-3 font-white mt12 pt8 pb8 r"
                onClick={form.reset}
              >
                Reset
              </button>
            </div>
          </form>
        )}
      />
    </>
  );
};

export default connect(null, null)(OwnerOccupierInvestorInputs);
