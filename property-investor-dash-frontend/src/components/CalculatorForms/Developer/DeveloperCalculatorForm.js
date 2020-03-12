import React from "react";
import { connect } from "react-redux";
import { Form as FinalForm } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { setValues } from "../../../reducers/formReducer";
import { setAccordian, setModal } from "../../../reducers/navigationReducer";
import CalculatorFormModal from "../CalculatorFormModal";
import DeveloperStandardAssumptions from "./DeveloperStandardAssumptions";
import DeveloperAdvancedAssumptions from "./DeveloperAdvancedAssumptions";
import { Form, Button } from "react-bootstrap";
import "../../styles/CalculatorForm.css";

const DeveloperCalculatorForm = props => {
  const onSubmit = values => {
    props.setModal("disclaimer");
    props.setValues({ ...values, type: "developer" });
  };

  const initialValues =
    props.values.type === "developer" && props.dashboards.isEditing
      ? props.values
      : null;

  return (
    <section className="calculator-section">
      <div className="header-container">
        <h1>
          <b>Developer Inputs</b>
        </h1>
      </div>
      <div className="calculator-container">
        <FinalForm
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators
          }}
          initialValues={{
            ...initialValues
          }}
          render={({
            handleSubmit,
            values,
            form,
            form: {
              mutators: { push, pop }
            }
          }) => (
            <Form onSubmit={handleSubmit}>
              <div id="accordian accordian1">
                <div className="card calculator-form-card">
                  <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                      <button
                        type="button"
                        onClick={() =>
                          props.setAccordian("developer", "standard")
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
                      props.navigation.accordianShow.developer.standard
                        ? "collapse show"
                        : "collapse"
                    }
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <DeveloperStandardAssumptions />
                  </div>
                </div>
              </div>
              <div className="card calculator-form-card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button
                      type="button"
                      onClick={() =>
                        props.setAccordian("developer", "advanced")
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
                    props.navigation.accordianShow.developer.advanced
                      ? "collapse show"
                      : "collapse"
                  }
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <DeveloperAdvancedAssumptions push={push} />
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
      <CalculatorFormModal />
    </section>
  );
};

const mapStateToProps = state => {
  return {
    values: state.values.values,
    navigation: state.navigation,
    dashboards: state.dashboards
  };
};

const mapDispatchToProps = {
  setValues,
  setAccordian,
  setModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeveloperCalculatorForm);
