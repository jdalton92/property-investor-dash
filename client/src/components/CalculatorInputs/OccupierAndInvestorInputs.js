import React from "react";
import { Form } from "react-final-form";
import OccupierBaseAssumptions from "./Occupier/BaseAssumptions";
import InvestorBaseAssumptions from "./Investor/BaseAssumptions";
import { CONSTANTS } from "../../constants/constants";
import OccupierAndInvestorCostAssumptions from "../Shared/OccupierAndInvestorCostAssumptions";
import OccupierAndInvestorFundingAssumptions from "../Shared/OccupierAndInvestorFundingAssumptions";
import Button from "../Shared/FinalForm/Button";

const OwnerAndOccupierInvestorInputs = ({ initialValues, type, onSubmit }) => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        ...initialValues,
      }}
      render={({ handleSubmit, values, form }) => (
        <form onSubmit={handleSubmit}>
          {type === CONSTANTS.TYPES.OCCUPIER && <OccupierBaseAssumptions />}
          {type === CONSTANTS.TYPES.INVESTOR && <InvestorBaseAssumptions />}
          <OccupierAndInvestorCostAssumptions tooltipType={type} />
          <OccupierAndInvestorFundingAssumptions
            values={values}
            tooltipType={type}
          />
          <div className="flex flex-col md:flex-row">
            <Button
              label={"Submit"}
              type={"submit"}
              options={{
                styleType: "primary",
                buttonClass: "w-full md:w-28 mr-2",
              }}
            />
            <Button
              label={"Reset"}
              type={"button"}
              options={{
                styleType: "secondary",
                buttonClass: "w-full md:w-28",
                onClick: form.reset,
              }}
            />
          </div>
        </form>
      )}
    />
  );
};

export default OwnerAndOccupierInvestorInputs;
