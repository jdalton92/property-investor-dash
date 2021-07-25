import React from "react";
import Input from "./FinalForm/Input";
import { minValue, maxValue } from "../../utils/formValidatorHelper";

const OccupierAndInvestorCostAssumptions = ({ tooltipType }) => {
  return (
    <>
      <h2 className="font-semibold my-2">Costs</h2>
      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 m-0 md:mr-2">
            <Input
              label={"Upfront Costs"}
              name={"upfrontCosts"}
              append={"% of price"}
              options={{
                id: "upfront-costs",
                validators: [minValue(0), maxValue(100)],
                placeholder: "Acquisition tax's, agent/legal fees etc",
                type: "number",
                step: "0.01",
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
                placeholder: "Agent/legal fees etc",
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
              label={"Operating Costs"}
              name={"opex"}
              prepend={"$"}
              append={"pa"}
              options={{
                id: "opex",
                validators: [minValue(0)],
                placeholder: "Water, electricity, insurance, tax etc",
                type: "number",
                step: "1",
                extraClass: "mb-4",
                tooltipType,
              }}
            />
          </div>
          <div className="flex-1 m-0 md:ml-2">
            <Input
              label={"Operating Cost Growth"}
              name={"opexGrowth"}
              append={"% pa"}
              options={{
                id: "opex-growth",
                validators: [minValue(0), maxValue(100)],
                placeholder: "Operating Cost Growth",
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

export default OccupierAndInvestorCostAssumptions;
