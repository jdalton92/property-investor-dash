import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { testDashboard, getDashboard } from "../../reducers/dashboardsReducer";
import { CONSTANTS } from "../../constants/constants";
import { helperMessage } from "../../constants/helperMessageText";
import HelperMessage from "../Shared/HelperMessage";
import Loader from "../Shared/Loader";
import OccupierAndInvestorInputs from "./OccupierAndInvestorInputs";

const OccupierForm = ({
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
    testDashboard(CONSTANTS.TYPES.OCCUPIER, assumptions);
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
      currentDashboard.type === CONSTANTS.TYPES.OCCUPIER
    ) {
      initialValues = currentDashboard.assumptions;
    }

    return (
      <>
        <h1 className="my-2 text-2xl font-semibold">Owner Occupier Inputs</h1>
        <HelperMessage
          type={CONSTANTS.HELPERMESSAGES.OWNEROCCUPIERFORM}
          body={helperMessage.occupierForm}
        />
        <OccupierAndInvestorInputs
          type={CONSTANTS.TYPES.OCCUPIER}
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

export default connect(mapStateToProps, mapDispatchToProps)(OccupierForm);
