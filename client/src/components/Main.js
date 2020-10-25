import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getDashboards } from "../reducers/dashboardReducer";

// import ScrollToTopControlller from "./Shared/ScrollToTopControlller";
import CustomRoute from "./Shared/CustomRoute";

import Login from "./Login";
import Contact from "./Contact";
import PrivacyPolicy from "./PrivacyPolicy";
import About from "./About";
import CalculatorTypes from "./CalculatorTypes";
import Blog from "./Blog";
import Settings from "./Settings/Settings";
import TermsAndConditions from "./TermsAndConditions";
import OccupierForm from "./CalculatorInputs/OccupierForm";
import InvestorForm from "./CalculatorInputs/InvestorForm";
import DeveloperForm from "./CalculatorInputs/DeveloperForm";
import OccupierDashboard from "./Dashboards/OccupierDashboard";
import InvestorDashboard from "./Dashboards/InvestorDashboard";
import DeveloperDashboard from "./Dashboards/DeveloperDashboard";
import SavedDashboards from "./SavedDashboards";
import NotFound from "./NotFound";

const Main = ({ getDashboards }) => {
  useEffect(() => {
    getDashboards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main p8 w100 border-p">
      <Switch>
        <Route path="/login" render={() => <Login />} />
        <CustomRoute path="/settings" render={() => <Settings />} />
        <CustomRoute
          path="/saved-dashboards"
          render={() => <SavedDashboards />}
        />
        {/*
        <Route path="/create-user" render={() => <CreateUser />} />
        <ScrollToTopControlller />
        */}
        <Route path="/contact" render={() => <Contact />} />
        <Route
          path="/terms-and-conditions"
          render={() => <TermsAndConditions />}
        />
        <Route path="/privacy-policy" render={() => <PrivacyPolicy />} />
        <Route path="/about" render={() => <About />} />
        <Route
          exact
          path="/calculator-types"
          render={() => <CalculatorTypes />}
        />
        <Route path="/blog" render={() => <Blog />} />
        <Route
          exact
          path="/owner-occupier/edit"
          render={() => <OccupierForm />}
        />
        <Route exact path="/investor/edit" render={() => <InvestorForm />} />
        <Route exact path="/developer/edit" render={() => <DeveloperForm />} />
        <Route
          path="/owner-occupier/edit/:id"
          render={() => <OccupierForm />}
        />
        <Route path="/investor/edit/:id" render={() => <InvestorForm />} />
        <Route path="/developer/edit/:id" render={() => <DeveloperForm />} />
        <Route
          exact
          path="/owner-occupier/dash"
          render={() => <OccupierDashboard />}
        />
        <Route
          path="/owner-occupier/dash/:id"
          render={() => <OccupierDashboard />}
        />
        <Route
          exact
          path="/investor/dash"
          render={() => <InvestorDashboard />}
        />
        <Route path="/investor/dash/:id" render={() => <InvestorDashboard />} />
        <Route
          exact
          path="/developer/dash"
          render={() => <DeveloperDashboard />}
        />
        <Route
          path="/developer/dash/:id"
          render={() => <DeveloperDashboard />}
        />
        <Route render={() => <NotFound />} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    savedDashboards: state.dashboards.savedDashboards,
    isFetching: state.dashboards.isFetching,
  };
};

const mapDispatchToProps = {
  getDashboards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
