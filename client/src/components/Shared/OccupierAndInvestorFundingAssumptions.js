import React from "react";
import Input from "./FinalForm/Input";
import Select from "./FinalForm/Select";
import { required, minValue, maxValue } from "../../utils/formValidatorHelper";

const OccupierAndInvestorFundingAssumptions = ({ values, tooltipType }) => {
  return (
    <>
      <h2 className="font-semibold my-2">Funding</h2>
      <div className="shadow-xl rounded-2xl p-4 bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 m-0 md:mr-2">
            <Input
              label={"Deposit"}
              name={"deposit"}
              prepend={"$"}
              options={{
                id: "deposit",
                validators: [
                  required,
                  minValue(0),
                  maxValue(values.purchasePrice),
                ],
                placeholder: "Deposit",
                type: "number",
                step: "1",
                extraClass: "mb-4",
                tooltipType,
              }}
            />
          </div>
          <div className="flex-1 m-0 md:ml-2">
            <Input
              label={"Homeloan Term"}
              name={"homeloanTerm"}
              append={"years"}
              options={{
                id: "homeloan-term",
                validators: [required, maxValue(30), minValue(0)],
                placeholder: "Homeloan Term",
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
              label={"Loan Interest Rate"}
              name={"interestRate"}
              append={"% pa"}
              options={{
                id: "interest-rate",
                validators: [required, minValue(0), maxValue(100)],
                placeholder: "Loan Interest Rate",
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
              label={"Mortgage Overpayment"}
              name={"overPayment"}
              prepend={"$"}
              append={"pm"}
              options={{
                id: "over-payments",
                validators: [minValue(0)],
                placeholder: "Mortgage Overpayment",
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
    //     <div className="form-row">
    //       <div className="form-item">
    //         <div className="flex-row align-c relative">
    //           <label htmlFor="owneroccupier-repaymenttype" className="f16 mb8">
    //             Repayment Type
    //             <span className="font-red f12 bold ml4">*</span>
    //           </label>
    //           <Tooltip message={occupierTooltips.repaymentType.message} />
    //         </div>
    //         <Field
    //           name="repaymentType"
    //           component="select"
    //           validate={required}
    //           defaultValue=""
    //         >
    //           {({ input, meta }) => (
    //             <div className="relative mb20">
    //               <select
    //                 className="form-input select w100 bs-1"
    //                 id="owneroccupier-repaymenttype"
    //                 {...input}
    //               >
    //                 <option value="" disabled hidden>
    //                   Repayment Type
    //                 </option>
    //                 <option value="interestOnly">Interest Only</option>
    //                 <option value="principalAndInterest">
    //                   Principal + Interest
    //                 </option>
    //               </select>
    //               {meta.error && meta.touched && (
    //                 <span className="form-error f10">{meta.error}</span>
    //               )}
    //             </div>
    //           )}
    //         </Field>
  );
};

export default OccupierAndInvestorFundingAssumptions;
