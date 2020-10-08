import React from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { testDashboard } from "../../../reducers/dashboardReducer";
import { setAccordian, setModal } from "../../../reducers/navigationReducer";
import MortgageOverpayments from "../MortgageOverpayments";
import Loader from "../../Shared/Loader";
import FinalFormField from "../../Shared/FinalFormField";
import {
  required,
  minValue,
  maxValue,
  composeValidators,
} from "../../../utils/formValidatorHelper";
import { occupierInvestorTooltipHelper } from "../../../utils/tooltipHelper";
import { CONSTANTS } from "../../../static/constants";

const OccupierForm = ({
  id,
  investor,
  setModal,
  testDashboard,
  dashboards,
  navigation,
}) => {
  const onSubmit = (values) => {
    setModal("disclaimer");
    values.investor = investor;
    values.type = "occupierInvestor";
    testDashboard(values);
  };

  if (dashboards.isFetching) {
    return <Loader />;
  } else {
    const initialValues =
      dashboards.preSave || id ? dashboards.data[0].values : null;
    return (
      <>
        <h1 className="f24 bold mt16 mb32">Owner Occupier Inputs</h1>
        {/* <Helper type="Owner Occupier" /> */}
        <Form
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators,
          }}
          initialValues={{
            ...initialValues,
          }}
          render={({
            handleSubmit,
            values,
            form,
            form: {
              mutators: { push, pop },
            },
          }) => (
            <form onSubmit={handleSubmit}>
              <h2 className="f20 bold mb16">Base Assumptions</h2>
              <div className="r bs-3 bg-1 p20 mb20">
                <FinalFormField
                  label={"House Price"}
                  placeholder={"House Price"}
                  fieldName={"housePrice"}
                  type={CONSTANTS.TYPES.OWNEROCCUPIER}
                  validators={[required, minValue(0), maxValue(100000000)]}
                  fieldType={"number"}
                  step={"1"}
                  prepend={"$"}
                />
                <div className="form-row">
                  <div className="form-item">
                    <FinalFormField
                      label={"Ownership Length"}
                      fieldName={"investmentPeriod"}
                      type={"occupierInvestor"}
                      validators={[required, minValue(0), maxValue(30)]}
                      placeholder={"Ownership Length"}
                      fieldType={"number"}
                      step={1}
                      append={"years"}
                      parseType={"parseInt"}
                    />
                  </div>
                  <div className="form-item">
                    <FinalFormField
                      label={"Home Capital Growth"}
                      fieldName={"capitalGrowth"}
                      type={"occupierInvestor"}
                      validators={[minValue(0), maxValue(100)]}
                      placeholder={"Home Capital Growth"}
                      fieldType={"number"}
                      step={0.01}
                      append={"% pa"}
                    />
                  </div>
                </div>
              </div>
              <h2 className="f20 bold mb16">Costs</h2>
              <div className="r bs-3 bg-1 p20 mb20">
                <div className="form-row">
                  <div className="form-item">
                    <FinalFormField
                      label={"Upfront Costs"}
                      fieldName={"upfrontCosts"}
                      type={"occupierInvestor"}
                      validators={[minValue(0), maxValue(100)]}
                      placeholder={"Agents/legal fees etc"}
                      fieldType={"number"}
                      step={0.01}
                      append={"% of cost"}
                    />
                  </div>
                  <div className="form-item">
                    <FinalFormField
                      label={"Selling Costs"}
                      fieldName={"sellingCosts"}
                      type={"occupierInvestor"}
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
                      fieldName={"recurringCosts"}
                      type={"occupierInvestor"}
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
                      label={"Inflation"}
                      fieldName={"inflation"}
                      type={"occupierInvestor"}
                      validators={[minValue(0), maxValue(100)]}
                      placeholder={"Inflation"}
                      fieldType={"number"}
                      step={0.01}
                      append={"% pa"}
                    />
                  </div>
                </div>
              </div>
              <h2 className="f20 bold mb16">Funding</h2>
              <div className="r bs-3 bg-1 p20 mb20">
                <FinalFormField
                  label={"Deposit"}
                  fieldName={"deposit"}
                  type={"occupierInvestor"}
                  validators={[
                    required,
                    minValue(0),
                    maxValue(values.housePrice),
                  ]}
                  placeholder={"Deposit"}
                  fieldType={"number"}
                  step={"1"}
                  prepend={"$"}
                />
                <div className="form-row">
                  <div className="form-item">
                    <FinalFormField
                      label={"Homeloan Term"}
                      fieldName={"homeloanTerm"}
                      type={"occupierInvestor"}
                      validators={[required, maxValue(30), minValue(0)]}
                      placeholder={"Homeloan Term"}
                      fieldType={"number"}
                      step={"1"}
                      append={"years"}
                      parseType={"parseInt"}
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="owneroccupier-loantype" className="f16 mb8">
                      Repayment Type
                      <span className="font-red f12 bold ml4">*</span>
                    </label>
                    {/* <button type="button" className="ml8">
                      <span
                        aria-label={
                          occupierInvestorTooltipHelper.loanType.message
                        }
                        data-balloon-pos="up"
                        className="f12"
                      >
                        ?
                      </span>
                    </button> */}
                    <Field name="loanType" validate={required}>
                      {({ input, meta }) => (
                        <div className="relative mb20">
                          <select
                            className="form-input select w100"
                            id="owneroccupier-loantype"
                            name="loanType"
                            defaultValue={"default"}
                            required
                          >
                            <option value="default" disabled hidden>
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
                </div>
                <FinalFormField
                  label={"Loan Interest Rate"}
                  fieldName={"interestRate"}
                  type={"occupierInvestor"}
                  validators={[required, maxValue(100), minValue(0)]}
                  placeholder={"Loan Interest Rate"}
                  maxLength={3}
                  fieldType={"number"}
                  step={"0.01"}
                  append={"% pa"}
                />
                <MortgageOverpayments
                  type={CONSTANTS.TYPES.OWNEROCCUPIER}
                  push={push}
                />
              </div>
              <div className="form-buttons">
                <button
                  type="submit"
                  className="form-button-p font-white bs-2 mt12 pt8 pb8"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="form-button-s font-white bs-2 mt12 pt8 pb8 r"
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
  }
};

const mapStateToProps = (state) => {
  return {
    dashboards: state.dashboards,
    navigation: state.navigation,
  };
};

const mapDispatchToProps = {
  testDashboard,
  setAccordian,
  setModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(OccupierForm);
