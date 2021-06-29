import React from "react";
import Input from "../../Shared/FinalForm/Input";
import {
  required,
  minValue,
  maxValue,
} from "../../../utils/formValidatorHelper";
import { CONSTANTS } from "../../../static/constants";

const DeveloperRevenueAssumptions = () => {
  const tooltipType = CONSTANTS.TYPES.DEVELOPER;
  return (
    <>
      <h2 className="font-semibold my-2">Revenue Assumptions</h2>
      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 m-0 md:mr-2">
            <Input
              label={"Revenue Per Dwelling"}
              name={"revenuePerDwelling"}
              prepend={"$"}
              options={{
                id: "revenue-per-dwelling",
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
              label={"Selling Costs"}
              name={"sellingCosts"}
              append={"% of sale"}
              options={{
                id: "selling-costs",
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
              label={"Rental Yield"}
              name={"rentalYield"}
              prepend={"%"}
              options={{
                id: "rental-yield",
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
              label={"Capital Growth"}
              name={"capitalGrowth"}
              append={"% pa"}
              options={{
                id: "capital-growth",
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

export default DeveloperRevenueAssumptions;
