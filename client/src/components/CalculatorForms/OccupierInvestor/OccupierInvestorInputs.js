import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getDashboard } from "../../../reducers/dashboardReducer";
import { setAccordian, setModal } from "../../../reducers/navigationReducer";
import OccupierInvestorCalculatorForm from "./OccupierInvestorCalculatorForm";
import CalculatorFormModal from "../CalculatorFormModal";

const OccupierInvestorInputs = ({ title, getDashboard, dashboards }) => {
  const id = useParams().id;

  useEffect(() => {
    if (id && !dashboards.preSave) {
      getDashboard(id);
    }
  }, [id]);

  return (
    <section className="calculator-section">
      <div className="header-container">
        <h1>
          <b>{title}</b>
        </h1>
      </div>
      <OccupierInvestorCalculatorForm
        investor={title.toLowerCase().includes("investor")}
        id={id}
      />
      <CalculatorFormModal />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboards: state.dashboards,
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
