import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Field } from "react-final-form";
import CalculatorFormTooltip from "../CalculatorFormTooltip";
import FinalFormField from "../../FinalFormField";
import { Form } from "react-bootstrap";
import {
  required,
  minValue,
  maxValue,
} from "../../../utils/formValidatorHelper";

const OccupierInvestorStandardAssumptions = (props) => {
  const history = useHistory();
  const occupier = history.location.pathname.includes("occupier");

  return (
    <div className="input-container">
      <div className="input-class">
        <div className="input-title">
          <h3>Property</h3>
        </div>
        <div className="input-item-group">
          <FinalFormField
            title={"House Price"}
            fieldName={"housePrice"}
            type={"occupierInvestor"}
            validators={[required, minValue(0), maxValue(100000000)]}
            placeholder={"House Price"}
            fieldType={"number"}
            step={"1"}
            prependStart={"$"}
          />
          <FinalFormField
            title={"Ownership Length"}
            fieldName={"investmentPeriod"}
            type={"occupierInvestor"}
            validators={[required, minValue(0), maxValue(30)]}
            placeholder={"Ownership Length"}
            fieldType={"number"}
            step={1}
            prependEnd={"years"}
            parseType={"parseInt"}
          />
          {occupier ? null : (
            <FinalFormField
              title={"Rental Yield"}
              fieldName={"rentalYield"}
              type={"occupierInvestor"}
              validators={[required, minValue(0), maxValue(100)]}
              placeholder={"Rental Yield"}
              fieldType={"number"}
              maxLength={3}
              step={0.1}
              prependEnd={"% pa"}
            />
          )}
        </div>
      </div>
      <div className="input-class">
        <div className="input-title">
          <h3>Funding</h3>
        </div>
        <div className="input-item-group">
          <FinalFormField
            title={"Deposit"}
            fieldName={"deposit"}
            type={"occupierInvestor"}
            validators={[
              required,
              minValue(0),
              maxValue(props.values.housePrice),
            ]}
            placeholder={"Deposit"}
            fieldType={"number"}
            step={"1"}
            prependStart={"$"}
          />
          <FinalFormField
            title={"Homeloan Term"}
            fieldName={"homeloanTerm"}
            type={"occupierInvestor"}
            validators={[required, maxValue(30), minValue(0)]}
            placeholder={"Homeloan Term"}
            fieldType={"number"}
            step={"1"}
            prependEnd={"years"}
            parseType={"parseInt"}
          />
          <div className="input-item">
            <Form.Label>
              <div className="input-label-container">
                <div className="input-title-separator">Repayment Type</div>
                <div className="input-helper-separator">
                  <CalculatorFormTooltip
                    input={"loanType"}
                    type={"occupierInvestor"}
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
            title={"Loan Interest Rate"}
            fieldName={"interestRate"}
            type={"occupierInvestor"}
            validators={[required, maxValue(100), minValue(0)]}
            placeholder={"Loan Interest Rate"}
            maxLength={3}
            fieldType={"number"}
            step={"0.01"}
            prependEnd={"% pa"}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(null, null)(OccupierInvestorStandardAssumptions);
