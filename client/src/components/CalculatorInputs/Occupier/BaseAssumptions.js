import React from "react";
import Input from "../../Shared/FinalForm/Input";
import {
  required,
  minValue,
  maxValue,
} from "../../../utils/formValidatorHelper";
import { CONSTANTS } from "../../../constants/constants";

const OccupierBaseAssumptions = () => {
  const tooltipType = CONSTANTS.TYPES.OCCUPIER;
  return (
    <>
      <h2 className="font-semibold my-2">Base Assumptions</h2>
      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 m-0 md:mr-2">
            <Input
              label={"Purchase Price"}
              name={"purchasePrice"}
              prepend={"$"}
              options={{
                id: "purchace-price",
                validators: [required, minValue(0), maxValue(100000000)],
                placeholder: "Purchase Price",
                type: "number",
                step: "1",
                extraClass: "mb-4",
                tooltipType,
              }}
            />
          </div>
          <div className="flex-1 m-0 md:ml-2">
            <Input
              label={"Ownership Length"}
              name={"ownershipLength"}
              append={"years"}
              options={{
                id: "ownership-length",
                validators: [required, minValue(0), maxValue(30)],
                placeholder: "Ownership Length",
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
              label={"Home Capital Growth"}
              name={"capitalGrowth"}
              append={"% pa"}
              options={{
                id: "capital-growth",
                validators: [minValue(0), maxValue(100)],
                placeholder: "Home Capital Growth",
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

export default OccupierBaseAssumptions;
