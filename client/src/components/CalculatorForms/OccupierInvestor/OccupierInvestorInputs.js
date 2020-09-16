import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getDashboard } from "../../../reducers/dashboardReducer";
import { setAccordian, setModal } from "../../../reducers/navigationReducer";
import OccupierInvestorCalculatorForm from "./OccupierInvestorCalculatorForm";
import CalculatorFormModal from "../CalculatorFormModal";
import "../../styles/CalculatorForm.css";

const OccupierInvestorInputs = ({
  title,
  getDashboard,
  dashboards,
  isUserFetching,
}) => {
  const id = useParams().id;

  useEffect(() => {
    if (id && !dashboards.preSave && !isUserFetching) {
      getDashboard(id);
    }
  }, [id, isUserFetching]);

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
    isUserFetching: state.user.isFetching,
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
