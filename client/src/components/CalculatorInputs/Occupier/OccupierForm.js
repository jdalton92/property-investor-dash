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
} from "../../../utils/formValidatorHelper";
import { CONSTANTS } from "../../../static/constants";

const OccupierForm = ({
  id,
  investor,
  setModal,
  testDashboard,
  dashboards,
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
                  label={"House Price"}
                  placeholder={"House Price"}
                  fieldName={"housePrice"}
                  type={CONSTANTS.TYPES.OWNEROCCUPIER}
                  validators={[required, minValue(0), maxValue(100000000)]}
                  fieldType={"number"}
                  step={"1"}
                  prepend={"$"}
                />
                <FinalFormField
                  label={"Ownership Length"}
                  fieldName={"investmentPeriod"}
                  type={"occupierInvestor"}
                  validators={[required, minValue(0), maxValue(30)]}
                  placeholder={"Ownership Length"}
                  fieldType={"number"}
                  step={1}
                  append={"years"}
                  parseType={"parseInt"}
                />
              </div>
              <button
                type="submit"
                className="form-button-p mr12 font-white bs-2 mt12 pt8 pb8 r"
              >
                Submit
              </button>
              <button
                type="button"
                className="form-button-s font-white bs-2 mt12 pt8 pb8 r"
                onClick={form.reset}
              >
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
