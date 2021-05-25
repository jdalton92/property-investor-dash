import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { testDashboard, getDashboard } from "../../reducers/dashboardsReducer";
import { CONSTANTS } from "../../static/constants";
import { helperMessage } from "../../static/helperMessageText";
import HelperMessage from "../Shared/HelperMessage";
import Loader from "../Shared/Loader";
import OwnerOccupierInvestorInputs from "./OwnerOccupierInvestorInputs";

const InvestorForm = ({
  testDashboard,
  isEditing,
  currentDashboard,
  isFetching,
  getDashboard,
}) => {
  const id = useParams().id;
  const history = useHistory();

  useEffect(() => {
    if (id) {
      getDashboard(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = (assumptions) => {
    testDashboard(CONSTANTS.TYPES.INVESTOR, assumptions);
    history.push("/dashboard");
  };

  if (isFetching) {
    return (
      <div className="w100 flex-row justify-c">
        <Loader />
      </div>
    );
  } else {
    let initialValues = {};
    if (
      (id || isEditing) &&
      currentDashboard.type === CONSTANTS.TYPES.INVESTOR
    ) {
      initialValues = currentDashboard.assumptions;
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
    currentDashboard: state.dashboards.currentDashboard,
    isEditing: state.dashboards.isEditing,
    isFetching: state.dashboards.isFetching,
  };
};

const mapDispatchToProps = {
  testDashboard,
  getDashboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestorForm);
