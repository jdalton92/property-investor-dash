import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Form as FinalForm } from "react-final-form";
import arrayMutators from "final-form-arrays";
import {
  getDashboard,
  testDashboard,
} from "../../../reducers/dashboardReducer";
import { setAccordian, setModal } from "../../../reducers/navigationReducer";
import CalculatorFormModal from "../CalculatorFormModal";
import DeveloperStandardAssumptions from "./DeveloperStandardAssumptions";
import DeveloperAdvancedAssumptions from "./DeveloperAdvancedAssumptions";
import { Form, Button, Spinner } from "react-bootstrap";

const DeveloperCalculatorForm = ({
  getDashboard,
  setModal,
  testDashboard,
  dashboards,
  navigation,
}) => {
  const id = useParams().id;

  useEffect(() => {
    if (id && !dashboards.preSave) {
      getDashboard(id);
    }
  }, [id]);

  const onSubmit = (values) => {
    setModal("disclaimer");
    values.type = "developer";
    testDashboard(values);
  };

  if (dashboards.isFetching || !dashboards.data[0]) {
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
      dashboards.preSave || id ? dashboards.data[0].values : null;
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
                          onClick={() => setAccordian("developer", "standard")}
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
                        navigation.accordianShow.developer.standard
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
                        onClick={() => setAccordian("developer", "advanced")}
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
                      navigation.accordianShow.developer.advanced
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
  getDashboard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeveloperCalculatorForm);
