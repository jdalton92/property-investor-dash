import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { testDashboard } from "../../reducers/dashboardReducer";
import { setAccordian, setModal } from "../../reducers/navigationReducer";
import { CONSTANTS } from "../../static/constants";
import HelperMessage from "../Shared/HelperMessage";
import Loader from "../Shared/Loader";
import OwnerOccupierInvestorInputs from "./OwnerOccupierInvestorInputs";

const OccupierForm = ({ id, setModal, testDashboard, dashboards }) => {
  const history = useHistory();

  const onSubmit = (values) => {
    setModal("disclaimer");
    values.investor = false;
    values.type = "occupierInvestor";
    testDashboard(values);
    history.push("/owner-occupier/dash");
  };

  const helperMessage = `Owner Occupier inputs to help you forecast your financial return if you buy a house and live in it for the ownership length, and then sell the property`;

  if (dashboards.isFetching) {
    return <Loader />;
  } else {
    // const initialValues =
    //   dashboards.preSave || id ? dashboards.data[0].values : {overPayments: [{}]};

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
          body={helperMessage}
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
    dashboards: state.dashboards,
  };
};

const mapDispatchToProps = {
  testDashboard,
  setAccordian,
  setModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(OccupierForm);
