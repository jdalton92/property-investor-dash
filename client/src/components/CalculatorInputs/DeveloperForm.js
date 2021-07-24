import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "react-final-form";
import { testDashboard, getDashboard } from "../../reducers/dashboardsReducer";
import { CONSTANTS } from "../../static/constants";
import { helperMessage } from "../../static/helperMessageText";
import TimingAssumptions from "./Developer/TimingAssumptions";
import CostAssumptions from "./Developer/CostAssumptions";
import RevenueAssumptions from "./Developer/RevenueAssumptions";
import FundingAssumptions from "./Developer/FundingAssumptions";
import HelperMessage from "../Shared/HelperMessage";
import Loader from "../Shared/Loader";
import Button from "../Shared/FinalForm/Button";

const DeveloperForm = ({
  testDashboard,
  currentDashboard,
  isFetching,
  isEditing,
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
    testDashboard(CONSTANTS.TYPES.DEVELOPER, assumptions);
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
      currentDashboard.type === CONSTANTS.TYPES.DEVELOPER
    ) {
      initialValues = currentDashboard.assumptions;
    }

    return (
      <>
        <h1 className="my-2 text-xl font-semibold">Developer Inputs</h1>
        <HelperMessage
          type={CONSTANTS.HELPERMESSAGES.DEVELOPERFORM}
          body={helperMessage.developerForm}
        />
        <Form
          onSubmit={onSubmit}
          initialValues={{
            ...initialValues,
          }}
          render={({ handleSubmit, values, form }) => (
            <form onSubmit={handleSubmit}>
              <TimingAssumptions />
              <CostAssumptions />
              <RevenueAssumptions />
              <FundingAssumptions />
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

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperForm);
