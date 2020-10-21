import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { testDashboard, getDashboard } from "../../reducers/dashboardReducer";
import { CONSTANTS } from "../../static/constants";
import { helperMessage } from "../../static/helperMessageText";
import HelperMessage from "../Shared/HelperMessage";
import Loader from "../Shared/Loader";
import OwnerOccupierInvestorInputs from "./OwnerOccupierInvestorInputs";

const OccupierForm = ({
  testDashboard,
  preSave,
  currentDashboard,
  isFetching,
  getDashboard,
}) => {
  const id = useParams().id;
  const history = useHistory();

  useEffect(() => {
    if (id && !preSave) {
      getDashboard(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = (values) => {
    values.investor = false;
    values.type = "occupierInvestor";
    testDashboard(values);
    history.push("/owner-occupier/dash");
  };

  if (isFetching) {
    return <Loader />;
  } else {
    // const initialValues =
    //   preSave || id ? currentDashboard : {overPayments: [{}]};

    const initialValues = {
      housePrice: 1000000,
      deposit: 200000,
      loanType: "principalAndInterest",
      interestRate: 3.5,
      homeloanTerm: 30,
      overPayments: [{}],
      investmentPeriod: 15,
      sellingCosts: 3,
      capitalGrowth: 3.5,
      upfrontCosts: 3,
      recurringCosts: 1000,
      rentalYield: 3,
      investor: false,
      inflation: 3,
    };
    return (
      <>
        <h1 className="f24 bold mt16 mb16">Owner Occupier Inputs</h1>
        <HelperMessage
          type={CONSTANTS.HELPERMESSAGES.OWNEROCCUPIERFORM}
          body={helperMessage.occupierForm}
        />
        <OwnerOccupierInvestorInputs
          investor={false}
          initialValues={initialValues}
          onSubmit={onSubmit}
        />
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentDashboard: state.dashboards.currentDashboard.values,
    preSave: state.dashboards.currentDashboard.preSave,
    isFetching: state.dashboards.isFetching,
  };
};

const mapDispatchToProps = {
  testDashboard,
  getDashboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(OccupierForm);
