import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { testDashboard, getDashboard } from "../../reducers/dashboardReducer";
import { CONSTANTS } from "../../static/constants";
import { helperMessage } from "../../static/helperMessageText";
import { typeAndUrl } from "../../utils/dashboardHelper";
import HelperMessage from "../Shared/HelperMessage";
import Loader from "../Shared/Loader";
import OwnerOccupierInvestorInputs from "./OwnerOccupierInvestorInputs";

const InvestorForm = ({
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
    values.investor = true;
    values.type = "occupierInvestor";
    testDashboard(values);
    history.push("/investor/dash");
  };

  if (isFetching) {
    return (
      <div className="w100 flex-row justify-c">
        <Loader />
      </div>
    );
  } else {
    const { type } = typeAndUrl(currentDashboard);

    let initialValues = { overPayments: [{}] };
    if ((preSave || id) && type === "Investor") {
      initialValues = currentDashboard.values;
    }

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
    currentDashboard: state.dashboards.currentDashboard.data,
    preSave: state.dashboards.currentDashboard.preSave,
    isFetching: state.dashboards.isFetching,
  };
};

const mapDispatchToProps = {
  testDashboard,
  getDashboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestorForm);
