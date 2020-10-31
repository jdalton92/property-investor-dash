import React from "react";
import { connect } from "react-redux";

const TermsAndConditions = () => {
  return (
    <>
      <h1 className="f24 bold mt16 mb16">Terms and Conditions</h1>
      <div className="r bs-3 bg-1 p20 mb20">
        <p className="mb16">
          Neither the whole nor any part of this output nor any reference to it
          may be included in any other document without the prior written
          consent of PropertyInvestorDash. The outputs are based upon
          information provided by the user. PropertyInvestorDash have not
          carried out any separate verification of the information provided or
          sourced. PropertyInvestorDash does not warrant or represent that the
          information relied upon to prepare this output is complete or accurate
          nor has it been audited.
        </p>
        <p>
          PropertyInvestorDash does not warrant that outputs are or will be
          accurate or correct. Any act, statement or opinion made or provided by
          PropertyInvestorDash with respect to the value of any asset or
          property should not in any way be construed or relied upon as a
          representation, recommendation or guarantee from using this tool.
          PropertyInvestorDash does not accept any legal liability or
          responsibility for any cost, loss or damage incurred by the use of or
          reliance on or interpretation of any of the information. This output
          is not and does not purport to be a formal valuation of any subject
          property and should not be relied upon as such.
        </p>
      </div>
    </>
  );
};

export default connect(null, null)(TermsAndConditions);
