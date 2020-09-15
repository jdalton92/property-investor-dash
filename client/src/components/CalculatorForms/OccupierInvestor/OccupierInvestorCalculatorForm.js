import React from "react";
import { connect } from "react-redux";
import { Form as FinalForm } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { setValues } from "../../../reducers/formReducer";
import { setAccordian, setModal } from "../../../reducers/navigationReducer";
import OccupierInvestorStandardAssumptions from "./OccupierInvestorStandardAssumptions";
import OccupierInvestorAdvancedAssumptions from "./OccupierInvestorAdvancedAssumptions";
import { Form, Button, Spinner } from "react-bootstrap";
import "../../styles/CalculatorForm.css";

const OccupierInvestorCalculatorForm = (props) => {
  const onSubmit = (values) => {
    props.setModal("disclaimer");
    props.setValues({
      ...values,
      investor: props.investor,
      type: "occupierInvestor",
    });
  };

  if (props.values.isFetching || !props.values.data[0]) {
    return (
      <div className="dashboard-spinner-container">
        <Spinner
          className="loading-spinner"
          animation="border"
          variant="primary"
        />
      </div>
    );
  } else {
    const initialValues =
      props.values.preSave || props.id ? props.values.data[0].values : null;
    return (
      <div className="calculator-container">
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
            <Form onSubmit={handleSubmit}>
              <div id="accordian accordian1">
                <div className="card calculator-form-card">
                  <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                      <button
                        type="button"
                        onClick={() =>
                          props.setAccordian("ownerOccupier", "standard")
                        }
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Standard Assumptions
                      </button>
                    </h5>
                  </div>

                  <div
                    id="collapseOne"
                    className={
                      props.navigation.accordianShow.ownerOccupier.standard
                        ? "collapse show"
                        : "collapse"
                    }
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <OccupierInvestorStandardAssumptions values={values} />
                  </div>
                </div>
              </div>
              <div className="card calculator-form-card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button
                      type="button"
                      onClick={() =>
                        props.setAccordian("ownerOccupier", "advanced")
                      }
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Advanced Assumptions
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className={
                    props.navigation.accordianShow.ownerOccupier.advanced
                      ? "collapse show"
                      : "collapse"
                  }
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <OccupierInvestorAdvancedAssumptions push={push} />
                </div>
              </div>
              <div className="calculator-button-container">
                <Button
                  type="submit"
                  className="button submit-button"
                  variant="primary"
                >
                  Submit
                </Button>

                <Button
                  className="button reset-button"
                  type="button"
                  variant="outline-primary"
                  onClick={form.reset}
                >
                  Reset
                </Button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    values: state.dashboards,
    navigation: state.navigation,
  };
};

const mapDispatchToProps = {
  setValues,
  setAccordian,
  setModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OccupierInvestorCalculatorForm);
