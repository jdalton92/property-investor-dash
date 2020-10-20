import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { testDashboard, getDashboard } from "../../reducers/dashboardReducer";
import { CONSTANTS } from "../../static/constants";
import { helperMessage } from "../../static/helperMessageText";
import HelperMessage from "../Shared/HelperMessage";
import Loader from "../Shared/Loader";
import OwnerOccupierInvestorInputs from "./OwnerOccupierInvestorInputs";

const InvestorForm = ({ testDashboard, dashboards, getDashboard }) => {
  const id = useParams().id;
  const history = useHistory();

  useEffect(() => {
    if (id && !dashboards.preSave) {
      getDashboard(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = (values) => {
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
          body={helperMessage.investorForm}
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
  getDashboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestorForm);
