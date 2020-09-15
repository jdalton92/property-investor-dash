import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getDashboard } from "../../../reducers/dashboardReducer";
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
  }, [id]);

  return (
    <section className="calculator-section">
      <div className="header-container">
        <h1>
          <b>{props.title}</b>
        </h1>
      </div>
      <OccupierInvestorCalculatorForm
        investor={props.title.toLowerCase().includes("investor")}
        id={id}
      />
      <CalculatorFormModal />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboards: state.dashboards,
    navigation: state.navigation,
  };
};

const mapDispatchToProps = {
  getDashboard,
  setAccordian,
  setModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OccupierInvestorInputs);
