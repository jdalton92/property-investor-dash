import React from "react";
import Input from "../../Shared/FinalForm/Input";
import {
  required,
  minValue,
  maxValue,
} from "../../../utils/formValidatorHelper";
import { CONSTANTS } from "../../../static/constants";

const DeveloperTimingAssumptions = () => {
  const tooltipType = CONSTANTS.TYPES.DEVELOPER;
  return (
    <>
      <h2 className="font-semibold my-2">Timing Assumptions</h2>
      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 m-0 md:mr-2">
            <Input
              label={"Design Period"}
              name={"planningAndDesign"}
              append={"months"}
              options={{
                id: "design-period",
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
              label={"Construction Duration"}
              name={"constructionDuration"}
              append={"months"}
              options={{
                id: "construction-duration",
                validators: [required, minValue(0)],
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
              label={"Investment Period"}
              name={"investmentPeriod"}
              append={"years"}
              options={{
                id: "investment-period",
                validators: [minValue(0), maxValue(30)],
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

export default DeveloperTimingAssumptions;
