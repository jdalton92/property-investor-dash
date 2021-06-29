import React from "react";
import Input from "../../Shared/FinalForm/Input";
import {
  required,
  minValue,
  maxValue,
} from "../../../utils/formValidatorHelper";
import { CONSTANTS } from "../../../static/constants";

const DeveloperCostAssumptions = () => {
  const tooltipType = CONSTANTS.TYPES.DEVELOPER;
  return (
    <>
      <h2 className="font-semibold my-2">Cost Assumptions</h2>
      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 m-0 md:mr-2">
            <Input
              label={"Acquisition Price"}
              name={"acquisitionPrice"}
              prepend={"$"}
              options={{
                id: "acquisition-price",
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
              label={"Dwellings"}
              name={"dwellings"}
              append={"no."}
              options={{
                id: "construction-duration",
                validators: [required, minValue(1)],
                placeholder: "Dwellings to build",
                type: "number",
                step: "1",
                extraClass: "mb-4",
                tooltipType,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 m-0 md:mr-2">
            <Input
              label={"Acquisition Costs"}
              name={"acquisitionCosts"}
              append={"% of acquisition"}
              options={{
                id: "acquisition-costs",
                validators: [minValue(0), maxValue(100)],
                type: "number",
                step: "0.01",
                extraClass: "mb-4",
                tooltipType,
              }}
            />
          </div>
          <div className="flex-1 m-0 md:ml-2">
            <Input
              label={"Operational Costs"}
              name={"recurringCosts"}
              append={"% of operating income"}
              options={{
                id: "recurring-costs",
                validators: [minValue(0), maxValue(100)],
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
            <Input
              label={"Construction Cost Per Dwelling"}
              name={"constructionCostPerDwelling"}
              prepend={"$"}
              options={{
                id: "construction-cost-per-dwelling",
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
              label={"Design Fees"}
              name={"designFees"}
              append={"% of construction cost"}
              options={{
                id: "design-fees",
                validators: [minValue(0), maxValue(100)],
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
            <Input
              label={"Statutory Fees"}
              name={"statutoryFees"}
              append={"% of construction cost"}
              options={{
                id: "statutory-fees",
                validators: [minValue(0), maxValue(100)],
                type: "number",
                step: "0.01",
                extraClass: "mb-4",
                tooltipType,
              }}
            />
          </div>
          <div className="flex-1 m-0 md:ml-2">
            <Input
              label={"Construction Contingency"}
              name={"designFees"}
              append={"% of construction cost"}
              options={{
                id: "construction-contingency",
                validators: [minValue(0), maxValue(100)],
                type: "number",
                step: "0.01",
                extraClass: "mb-4",
                tooltipType,
              }}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-full md:w-1/2 p-0 md:pr-2">
            <Input
              label={"Construction Cost Growth"}
              name={"constructionCostGrowth"}
              append={"% pa"}
              options={{
                id: "construction-cost-growth",
                validators: [minValue(0), maxValue(100)],
                type: "number",
                step: "0.01",
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

export default DeveloperCostAssumptions;
