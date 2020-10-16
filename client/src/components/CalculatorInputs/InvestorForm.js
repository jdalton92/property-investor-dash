import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { testDashboard } from "../../reducers/dashboardReducer";
import { setAccordian, setModal } from "../../reducers/navigationReducer";
import { CONSTANTS } from "../../static/constants";
import HelperMessage from "../Shared/HelperMessage";
import Loader from "../Shared/Loader";
import OwnerOccupierInvestorInputs from "./OwnerOccupierInvestorInputs";

const InvestorForm = ({ id, setModal, testDashboard, dashboards }) => {
  const history = useHistory();

  const onSubmit = (values) => {
    setModal("disclaimer");
    values.investor = true;
    values.type = "occupierInvestor";
    testDashboard(values);
    history.push("/investor/dash");
  };

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
      recurringCosts: 5,
      rentalYield: 3,
      investor: true,
      inflation: 3,
    };
    return (
      <>
        <h1 className="f24 bold mt16 mb16">Investor Inputs</h1>
        <HelperMessage
          type={CONSTANTS.HELPERMESSAGES.INVESTORFORM}
          body={"Helper body"}
        />
        <OwnerOccupierInvestorInputs
          investor={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(InvestorForm);
