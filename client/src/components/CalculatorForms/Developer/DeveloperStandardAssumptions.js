import React from "react";
import { connect } from "react-redux";
import { Field } from "react-final-form";
import FinalFormField from "../../FinalFormField";
import CalculatorFormTooltip from "../CalculatorFormTooltip";
import {
  required,
  minValue,
  maxValue
} from "../../../helpers/formValidatorHelper";
import { Form } from "react-bootstrap";

const DeveloperStandardAssumptions = () => {
  return (
    <div className="input-container">
      <div className="input-class">
        <div className="input-title">
          <h3>Timing</h3>
        </div>
        <div className="input-item-group">
          <FinalFormField
            title={"Design Period"}
            fieldName={"planningAndDesign"}
            type={"developer"}
            validators={[required, minValue(0)]}
            placeholder={"Design Period"}
            fieldType={"number"}
            step={1}
            prependEnd={"mths before constn"}
            parseType={"parseInt"}
          />
          <FinalFormField
            title={"Construction Duration"}
            fieldName={"constructionDuration"}
            type={"developer"}
            validators={[required, minValue(0)]}
            placeholder={"Construction Duration"}
            fieldType={"number"}
            step={1}
            prependEnd={"mths"}
            parseType={"parseInt"}
          />
          <FinalFormField
            title={"Investment Period"}
            fieldName={"investmentPeriod"}
            type={"developer"}
            validators={[minValue(0), maxValue(30)]}
            placeholder={"Investment Period"}
            fieldType={"number"}
            step={1}
            prependEnd={"yrs post costn"}
            parseType={"parseInt"}
          />
        </div>
      </div>
      <div className="input-class">
        <div className="input-title">
          <h3>Development Costs</h3>
        </div>
        <div className="input-item-group">
          <FinalFormField
            title={"Acquisition Price"}
            fieldName={"acquisitionPrice"}
            type={"developer"}
            validators={[required, minValue(0)]}
            placeholder={"Acquisition Price (land)"}
            fieldType={"number"}
            step={1}
            prependStart={"$"}
          />
          <FinalFormField
            title={"Dwellings"}
            fieldName={"dwellings"}
            type={"developer"}
            validators={[required, minValue(1)]}
            placeholder={"Dwellings to Build"}
            fieldType={"number"}
            step={1}
            prependEnd={"no."}
          />
          <FinalFormField
            title={"Construction Cost / Dwelling"}
            fieldName={"constructionCostPerDwelling"}
            type={"developer"}
            validators={[required, minValue(0)]}
            placeholder={"Construction Cost per Dwelling"}
            fieldType={"number"}
            step={1}
            prependStart={"$"}
          />
          <FinalFormField
            title={"Design Fees"}
            fieldName={"designFees"}
            type={"developer"}
            validators={[minValue(0)]}
            placeholder={"Design Fees"}
            fieldType={"number"}
            maxLength={3}
            step={0.01}
            prependEnd={"% of constn cost"}
          />
          <FinalFormField
            title={"Development Levy"}
            fieldName={"statutoryFees"}
            type={"developer"}
            validators={[minValue(0), maxValue(100)]}
            placeholder={"Development Levy"}
            fieldType={"number"}
            maxLength={3}
            step={0.01}
            prependEnd={"% of constn cost"}
          />
          <FinalFormField
            title={"Construction Contingency"}
            fieldName={"constructionContingency"}
            type={"developer"}
            validators={[required, minValue(0), maxValue(100)]}
            placeholder={"Construction Contingency"}
            fieldType={"number"}
            maxLength={3}
            step={0.01}
            prependEnd={"% of constn cost"}
          />
        </div>
      </div>
      <div className="input-class">
        <div className="input-title">
          <h3>Revenues</h3>
        </div>
        <div className="input-item-group">
          <FinalFormField
            title={"Revenue / Dwelling"}
            fieldName={"revenuePerDwelling"}
            type={"developer"}
            validators={[required, minValue(0)]}
            placeholder={"Revenue per Dwelling"}
            fieldType={"number"}
            step={1}
            prependStart={"$"}
          />
          <FinalFormField
            title={"Selling Costs"}
            fieldName={"sellingCosts"}
            type={"developer"}
            validators={[minValue(0), maxValue(100)]}
            placeholder={"Selling Costs"}
            fieldType={"number"}
            step={"0.01"}
            prependEnd={"% of sale"}
          />
          <FinalFormField
            title={"Rental Yield"}
            fieldName={"rentalYield"}
            type={"developer"}
            validators={[required, minValue(0), maxValue(100)]}
            placeholder={"Rental Yield"}
            fieldType={"number"}
            step={0.01}
            prependEnd={"%"}
          />
        </div>
      </div>
      <div className="input-class">
        <div className="input-title">
          <h3>Funding</h3>
        </div>
        <div className="input-item-group">
          <FinalFormField
            title={"Initial Equity"}
            fieldName={"initialEquity"}
            type={"developer"}
            validators={[required, minValue(0)]}
            placeholder={"Initial Equity"}
            fieldType={"number"}
            step={0.01}
            prependStart={"$"}
          />
          <div className="input-item">
            <Form.Label>
              <div className="input-label-container">
                <div className="input-title-separator">Repayment Type</div>
                <div className="input-helper-separator">
                  <CalculatorFormTooltip
                    input={"loanType"}
                    type={"developer"}
                  />
                </div>
              </div>
            </Form.Label>
            <Field
              name="loanType"
              component="select"
              className="custom-select"
              required
            >
              <option disabled value="" hidden defaultValue>
                Repayment Type
              </option>
              <option value="interestOnly">Interest Only</option>
              <option value="principalAndInterest">Principal + Interest</option>
            </Field>
          </div>
          <FinalFormField
            title={"Interest Rate"}
            fieldName={"interestRate"}
            type={"developer"}
            validators={[required, minValue(0), maxValue(100)]}
            placeholder={"Interest Rate"}
            fieldType={"number"}
            step={0.01}
            prependEnd={"%"}
          />
          <FinalFormField
            title={"Loan Term"}
            fieldName={"loanTerm"}
            type={"developer"}
            validators={[required, minValue(0), maxValue(30)]}
            placeholder={"Loan Term"}
            fieldType={"number"}
            step={1}
            maxLength={3}
            prependEnd={"years"}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(null, null)(DeveloperStandardAssumptions);
