import React from "react";
import { connect } from "react-redux";
import { Form as FinalForm } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { testDashboard } from "../../../reducers/dashboardReducer";
import { setAccordian, setModal } from "../../../reducers/navigationReducer";
import Loader from "../../Shared/Loader";
import FinalFormField from "../../Shared/FinalFormField";
import {
  required,
  minValue,
  maxValue,
} from "../../../helpers/formValidatorHelper";

const OccupierForm = ({
  id,
  investor,
  setModal,
  testDashboard,
  dashboards,
  setAccordian,
  navigation,
}) => {
  const onSubmit = (values) => {
    setModal("disclaimer");
    values.investor = investor;
    values.type = "occupierInvestor";
    testDashboard(values);
  };

  if (dashboards.isFetching) {
    return <Loader />;
  } else {
    const initialValues =
      dashboards.preSave || id ? dashboards.data[0].values : null;
    return (
      <>
        <h1 className="f24 bold mt16 mb32">Owner Occupier Inputs</h1>
        <FinalForm
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators,
          }}
          initialValues={{
            ...initialValues,
          }}
          render={({
            handleSubmit,
            values,
            form,
            form: {
              mutators: { push, pop },
            },
          }) => (
            <form onSubmit={handleSubmit}>
              <h2 className="f20 bold mb16">Input Heading 1</h2>
              <div className="r bs-3 bg-1 p16">
                <FinalFormField
                  title={"House Price"}
                  fieldName={"housePrice"}
                  type={"occupierInvestor"}
                  validators={[required, minValue(0), maxValue(100000000)]}
                  placeholder={"House Price"}
                  fieldType={"number"}
                  step={"1"}
                  prependStart={"$"}
                />
              </div>
              <button type="submit">Submit</button>
              <button type="button" onClick={form.reset}>
                Reset
              </button>
            </form>
          )}
        />
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    dashboards: state.dashboards,
    navigation: state.navigation,
  };
};

const mapDispatchToProps = {
  testDashboard,
  setAccordian,
  setModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(OccupierForm);
