import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { testDashboard } from "../../reducers/dashboardReducer";
import { setAccordian, setModal } from "../../reducers/navigationReducer";
import { CONSTANTS } from "../../static/constants";
import { required, minValue, maxValue } from "../../utils/formValidatorHelper";
import { developerTooltipHelper } from "../../utils/tooltipHelper";
import FinalFormField from "../Shared/FinalFormField";
import HelperMessage from "../Shared/HelperMessage";
import Loader from "../Shared/Loader";
import MortgageOverpayments from "./MortgageOverpayments";
import Tooltip from "../Shared/Tooltip";

const DeveloperForm = ({ id, testDashboard, dashboards }) => {
  const history = useHistory();

  const onSubmit = (values) => {
    testDashboard(values);
    history.push("/developer/dash");
  };

  const helperMessage = `Developer Inputs Helper Text`;

  if (dashboards.isFetching) {
    return <Loader />;
  } else {
    // const initialValues =
    //   dashboards.preSave || id ? dashboards.data[0].values : {overPayments: [{}]};

    const initialValues = {
      acquisitionPrice: 100000,
      acquisitionCosts: 5,
      dwellings: 4,
      constructionCostPerDwelling: 400000,
      designFees: 10,
      constructionContingency: 10,
      statutoryFees: 3,
      constructionDuration: 24,
      planningAndDesign: 6,

      revenuePerDwelling: 750000,
      sellingCosts: 5,
      investmentPeriod: 5,
      recurringCosts: 30,
      rentalYield: 4,

      initialEquity: 400000,
      loanType: "interestOnly",
      interestRate: 3.5,
      loanTerm: 30,
      overPayments: [{}],

      capitalGrowth: 3.5,
      constructionCostGrowth: 2.5,
    };
    return (
      <>
        <h1 className="f24 bold mt16 mb16">Developer Inputs</h1>
        <HelperMessage
          type={CONSTANTS.HELPERMESSAGES.DEVELOPERFORM}
          body={helperMessage}
        />
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
              <h2 className="f20 bold mt16 mb16">Timing Assumptions</h2>
              <div className="r bs-3 bg-1 p20 mb20">
                <div className="form-row">
                  <div className="form-item">
                    <FinalFormField
                      label={"Design Period"}
                      fieldName={"planningAndDesign"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[required, minValue(0)]}
                      placeholder={"Design Period"}
                      fieldType={"number"}
                      step={1}
                      append={"mths"}
                      parseType={CONSTANTS.PARSETYPE.INT}
                    />
                  </div>
                  <div className="form-item">
                    <FinalFormField
                      label={"Construction Duration"}
                      fieldName={"constructionDuration"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[required, minValue(0)]}
                      placeholder={"Construction Duration"}
                      fieldType={"number"}
                      step={1}
                      append={"mths"}
                      parseType={CONSTANTS.PARSETYPE.INT}
                    />
                  </div>
                </div>
                <FinalFormField
                  label={"Investment Period"}
                  fieldName={"investmentPeriod"}
                  type={CONSTANTS.TYPES.DEVELOPER}
                  validators={[minValue(0), maxValue(30)]}
                  placeholder={"Investment Period"}
                  fieldType={"number"}
                  step={1}
                  append={"yrs"}
                  parseType={CONSTANTS.PARSETYPE.INT}
                />
              </div>
              <h2 className="f20 bold mt16 mb16">Cost Assumptions</h2>
              <div className="r bs-3 bg-1 p20 mb20">
                <div className="form-row">
                  <div className="form-item">
                    <FinalFormField
                      label={"Acquisition Price"}
                      fieldName={"acquisitionPrice"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[required, minValue(0)]}
                      placeholder={"Acquisition Price (land)"}
                      fieldType={"number"}
                      step={1}
                      prepend={"$"}
                    />
                  </div>
                  <div className="form-item">
                    <FinalFormField
                      label={"Dwellings"}
                      fieldName={"dwellings"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[required, minValue(1)]}
                      placeholder={"Dwellings to Build"}
                      fieldType={"number"}
                      step={1}
                      append={"no."}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <FinalFormField
                      label={"Construction Cost / Dwelling"}
                      fieldName={"constructionCostPerDwelling"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[required, minValue(0)]}
                      placeholder={"Construction Cost per Dwelling"}
                      fieldType={"number"}
                      step={1}
                      prepend={"$"}
                    />
                  </div>
                  <div className="form-item">
                    <FinalFormField
                      label={"Design Fees"}
                      fieldName={"designFees"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[minValue(0)]}
                      placeholder={"Design Fees"}
                      fieldType={"number"}
                      maxLength={3}
                      step={0.01}
                      append={"% of cost"}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <FinalFormField
                      label={"Development Levy"}
                      fieldName={"statutoryFees"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[minValue(0), maxValue(100)]}
                      placeholder={"Development Levy"}
                      fieldType={"number"}
                      maxLength={3}
                      step={0.01}
                      append={"% of cost"}
                    />
                  </div>
                  <div className="form-item">
                    <FinalFormField
                      label={"Construction Contingency"}
                      fieldName={"constructionContingency"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[required, minValue(0), maxValue(100)]}
                      placeholder={"Construction Contingency"}
                      fieldType={"number"}
                      maxLength={3}
                      step={0.01}
                      append={"% of cost"}
                    />
                  </div>
                </div>
                <FinalFormField
                  label={"Construction Cost Growth"}
                  fieldName={"constructionCostGrowth"}
                  type={CONSTANTS.TYPES.DEVELOPER}
                  validators={[minValue(0), maxValue(100)]}
                  placeholder={"Construction Cost Growth"}
                  fieldType={"number"}
                  step={0.01}
                  append={"% pa"}
                />
              </div>
              <h2 className="f20 bold mt16 mb16">Revenue Assumptions</h2>
              <div className="r bs-3 bg-1 p20 mb20">
                <div className="form-row">
                  <div className="form-item">
                    <FinalFormField
                      label={"Revenue / Dwelling"}
                      fieldName={"revenuePerDwelling"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[required, minValue(0)]}
                      placeholder={"Revenue per Dwelling"}
                      fieldType={"number"}
                      step={1}
                      prepend={"$"}
                    />
                  </div>
                  <div className="form-item">
                    <FinalFormField
                      label={"Selling Costs"}
                      fieldName={"sellingCosts"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[minValue(0), maxValue(100)]}
                      placeholder={"Selling Costs"}
                      fieldType={"number"}
                      step={"0.01"}
                      append={"% of sale"}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <FinalFormField
                      label={"Rental Yield"}
                      fieldName={"rentalYield"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[required, minValue(0), maxValue(100)]}
                      placeholder={"Rental Yield"}
                      fieldType={"number"}
                      step={0.01}
                      prependEnd={"%"}
                    />
                  </div>
                  <div className="form-item">
                    <FinalFormField
                      label={"Dwelling Capital Growth"}
                      fieldName={"capitalGrowth"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[minValue(0), maxValue(100)]}
                      placeholder={"Capital Growth"}
                      fieldType={"number"}
                      step={0.01}
                      prependEnd={"% pa"}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <FinalFormField
                      label={"Opex Post Construction"}
                      fieldName={"recurringCosts"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[minValue(0), maxValue(100)]}
                      placeholder={"Opex Post Construction"}
                      fieldType={"number"}
                      step={0.01}
                      append={"% of gross income"}
                    />
                  </div>
                  <div className="form-item">
                    <FinalFormField
                      label={"Acquisition Costs"}
                      fieldName={"acquisitionCosts"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[minValue(0), maxValue(100)]}
                      placeholder={"Acquisition Costs"}
                      fieldType={"number"}
                      step={0.01}
                      append={"% of acquisition"}
                    />
                  </div>
                </div>
              </div>
              <h2 className="f20 bold mt16 mb16">Funding Assumptions</h2>
              <div className="r bs-3 bg-1 p20 mb20">
                <div className="form-row">
                  <div className="form-item">
                    <FinalFormField
                      label={"Initial Equity"}
                      fieldName={"initialEquity"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[required, minValue(0)]}
                      placeholder={"Initial Equity"}
                      fieldType={"number"}
                      step={0.01}
                      prepend={"$"}
                    />
                  </div>
                  <div className="form-item">
                    <FinalFormField
                      label={"Interest Rate"}
                      fieldName={"interestRate"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[required, minValue(0), maxValue(100)]}
                      placeholder={"Interest Rate"}
                      fieldType={"number"}
                      step={0.01}
                      append={"%"}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <div className="flex-row align-c relative">
                      <label htmlFor="developer-loantype" className="f16 mb8">
                        Repayment Type
                        <span className="font-red f12 bold ml4">*</span>
                      </label>
                      <Tooltip
                        message={developerTooltipHelper.loanType.message}
                      />
                    </div>
                    <Field name="loanType" validate={required}>
                      {({ input, meta }) => (
                        <div className="relative mb20">
                          <select
                            className="form-input select w100 bs-1"
                            id="developer-loantype"
                            name="loanType"
                            defaultValue={"default"}
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
                  <div className="form-item">
                    <FinalFormField
                      label={"Loan Term"}
                      fieldName={"loanTerm"}
                      type={CONSTANTS.TYPES.DEVELOPER}
                      validators={[required, minValue(0), maxValue(30)]}
                      placeholder={"Loan Term"}
                      fieldType={"number"}
                      step={1}
                      maxLength={3}
                      append={"years"}
                    />
                  </div>
                </div>
                <MortgageOverpayments
                  type={CONSTANTS.TYPES.DEVELOPER}
                  push={push}
                />
              </div>
              <div className="form-buttons">
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
  }
};

const mapStateToProps = (state) => {
  return {
    dashboards: state.dashboards,
  };
};

const mapDispatchToProps = {
  testDashboard,
  setAccordian,
  setModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperForm);
