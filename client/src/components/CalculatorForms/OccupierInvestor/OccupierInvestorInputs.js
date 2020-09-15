import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getDashboard } from "../../../reducers/dashboardReducer";
import { setValues } from "../../../reducers/formReducer";
import { setAccordian, setModal } from "../../../reducers/navigationReducer";
import OccupierInvestorCalculatorForm from "./OccupierInvestorCalculatorForm";
import CalculatorFormModal from "../CalculatorFormModal";
import "../../styles/CalculatorForm.css";

const OccupierInvestorInputs = (props) => {
  const id = useParams().id;

  useEffect(() => {
    if (id) {
      props.getDashboard(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="calculator-section">
      <div className="header-container">
        <h1>
          <b>{props.title}</b>
        </h1>
      </div>
      <OccupierInvestorCalculatorForm
        investor={props.title.toLower().includes("investor")}
      />
      <CalculatorFormModal />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    values: state.values.values,
    dashboards: state.dashboards,
    navigation: state.navigation,
  };
};

const mapDispatchToProps = {
  getDashboard,
  setValues,
  setAccordian,
  setModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OccupierInvestorInputs);
