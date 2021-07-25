import React from "react";
import Input from "../../Shared/FinalForm/Input";
import Select from "../../Shared/FinalForm/Select";
import {
  required,
  minValue,
  maxValue,
} from "../../../utils/formValidatorHelper";
import { CONSTANTS } from "../../../constants/constants";

const DeveloperFundingAssumptions = () => {
  const tooltipType = CONSTANTS.TYPES.DEVELOPER;
  return (
    <>
      <h2 className="font-semibold my-2">Funding Assumptions</h2>
      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 m-0 md:mr-2">
            <Input
              label={"Initial Equity"}
              name={"initialEquity"}
              prepend={"$"}
              options={{
                id: "initial-equity",
                validators: [required, minValue(0)],
                type: "number",
                step: "1",
                extraClass: "mb-4",
                tooltipType,
              }}
            />
          </div>
          <div className="flex-1 m-0 md:ml-2">
            <Input
              label={"Interest Rate"}
              name={"interestRate"}
              append={"% pa"}
              options={{
                id: "interest-rate",
                validators: [required, minValue(0), maxValue(100)],
                type: "number",
                step: "0.01",
                extraClass: "mb-4",
                tooltipType,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 m-0 md:mr-2">
            <Select
              label={"Repayment Type"}
              name={"repaymentType"}
              options={{
                id: "repayment-type",
                validators: [required],
                defaultLabel: "Repayment Type",
                dropdownOptions: [
                  {
                    label: "Principal and Interest",
                    value: "principalAndInterest",
                  },
                  { label: "Interest Only", value: "interestOnly" },
                ],
                extraClass: "mb-4",
                tooltipType,
              }}
            />
          </div>
          <div className="flex-1 m-0 md:ml-2">
            <Input
              label={"Loan Term"}
              name={"loanTerm"}
              append={"years"}
              options={{
                id: "loan-term",
                validators: [required, minValue(0), maxValue(30)],
                type: "number",
                step: "1",
                extraClass: "mb-4",
                tooltipType,
              }}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-full md:w-1/2 p-0 md:pr-2">
            <Input
              label={"Mortgage Overpayment"}
              name={"overPayment"}
              prepend={"$"}
              append={"pm"}
              options={{
                id: "overpayment",
                validators: [minValue(0)],
                type: "number",
                step: "1",
                extraClass: "mb-4",
                tooltipType,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperFundingAssumptions;
