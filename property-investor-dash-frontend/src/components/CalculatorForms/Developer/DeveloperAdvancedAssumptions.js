import React from "react";
import { connect } from "react-redux";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import CalculatorFormTooltip from "../CalculatorFormTooltip";
import FinalFormField from "../../FinalFormField";
import { minValue, maxValue } from "../../../helpers/formValidatorHelper";
import { Table, Button, InputGroup } from "react-bootstrap";

const DeveloperAdvancedAssumptions = props => {
  return (
    <div className="input-container">
      <div className="input-class">
        <div className="input-title">
          <h3>Other Costs</h3>
        </div>
        <div className="input-item-group">
          <FinalFormField
            title={"Acquisition Costs"}
            fieldName={"acquisitionCosts"}
            type={"developer"}
            validators={[minValue(0), maxValue(100)]}
            placeholder={"Acquisition Costs"}
            fieldType={"number"}
            step={0.01}
            prependEnd={"% of acquisition"}
          />
          <FinalFormField
            title={"Opex Post Construction"}
            fieldName={"recurringCosts"}
            type={"developer"}
            validators={[minValue(0), maxValue(100)]}
            placeholder={"Opex Post Construction"}
            fieldType={"number"}
            step={0.01}
            prependEnd={"% of gross income"}
          />
        </div>
      </div>
      <div className="input-class">
        <div className="input-title">
          <h3>Growth Rates</h3>
        </div>
        <div className="input-item-group">
          <FinalFormField
            title={"Dwelling Capital Growth"}
            fieldName={"capitalGrowth"}
            type={"developer"}
            validators={[minValue(0), maxValue(100)]}
            placeholder={"Capital Growth"}
            fieldType={"number"}
            step={0.01}
            prependEnd={"% pa"}
          />
          <FinalFormField
            title={"Construction Cost Growth"}
            fieldName={"constructionCostGrowth"}
            type={"developer"}
            validators={[minValue(0), maxValue(100)]}
            placeholder={"Construction Cost Growth"}
            fieldType={"number"}
            step={0.01}
            prependEnd={"% pa"}
          />
        </div>
      </div>
      <div className="input-class">
        <div className="input-title">
          <div className="input-label-container">
            <div className="input-title-separator">
              <h3>Mortgage Overpayments</h3>
            </div>
            <div className="input-helper-separator">
              <CalculatorFormTooltip
                input={"overPayments"}
                type={"developer"}
              />
            </div>
          </div>
        </div>
        <FieldArray name="overPayments">
          {({ fields }) => (
            <div className="input-table">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>#</th>
                    <th>Year</th>
                    <th>Overpayment</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((name, index) => (
                    <tr key={index}>
                      <th
                        scope="row"
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        {index + 1}
                      </th>
                      <td>
                        <Field
                          className="form-control"
                          name={`${name}.year`}
                          component="input"
                          placeholder="Year"
                          type="number"
                          min="0"
                        />
                      </td>
                      <td>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                          </InputGroup.Prepend>
                          <Field
                            className="form-control"
                            name={`${name}.payment`}
                            component="input"
                            placeholder="Overpayment"
                            type="number"
                            min="0"
                          />
                        </InputGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                onClick={() => props.push("overPayments", undefined)}
                variant="primary"
              >
                Add Overpayment
              </Button>
            </div>
          )}
        </FieldArray>
      </div>
    </div>
  );
};

export default connect(null, null)(DeveloperAdvancedAssumptions);
