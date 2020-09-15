import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { initUser } from "./reducers/userReducer";
import "./components/styles/App.css";

import ScrollToTopControlller from "./components/ScrollToTopControlller";
import CustomRoute from "./components/CustomRoute";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Contact from "./components/Contact";
import CreateUser from "./components/CreateUser";
import Settings from "./components/Settings";
import SavedDashboards from "./components/SavedDashboards";
import OccupierInvestorInputs from "./components/CalculatorForms/OccupierInvestor/OccupierInvestorInputs";
import DeveloperInputs from "./components/CalculatorForms/Developer/DeveloperInputs";
import DeveloperDashboard from "./components/Dashboards/DeveloperDashboard";
import OccupierInvestorDashboard from "./components/Dashboards/OccupierInvestorDashboard";
import UserTypeModal from "./components/UserTypeModal";
import SaveDashboardModal from "./components/Dashboards/SaveDashboardModal";
import Footer from "./components/Footer";

const App = (props) => {
  useEffect(() => {
    props.initUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        <ScrollToTopControlller />
        <NavigationBar />
        <div className="app-body">
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/contact" render={() => <Contact />} />
            <Route path="/create-user" render={() => <CreateUser />} />
            <Route path="/login" render={() => <Login />} />
            <Route
              exact
              path="/owner-occupier"
              render={() => (
                <OccupierInvestorInputs title="Owner Occupier Inputs" />
              )}
            />
            <Route
              exact
              path="/investor"
              render={() => <OccupierInvestorInputs title="Investor Inputs" />}
            />
            <Route exact path="/developer" render={() => <DeveloperInputs />} />
            <Route
              path="/owner-occupier/edit/:id"
              render={() => (
                <OccupierInvestorInputs title="Owner-Occupier Inputs" />
              )}
            />
            <Route
              path="/investor/edit/:id"
              render={() => <OccupierInvestorInputs title="Investor Inputs" />}
            />
            <Route
              path="/developer/edit/:id"
              render={() => <DeveloperInputs />}
            />
            <Route
              exact
              path="/owner-occupier/dash"
              render={() => (
                <OccupierInvestorDashboard title="Owner-Occupier Dashboard" />
              )}
            />
            <Route
              exact
              path="/investor/dash"
              render={() => (
                <OccupierInvestorDashboard title="Investor Dashboard" />
              )}
            />
            <Route
              path="/developer/dash"
              render={() => <DeveloperDashboard />}
            />
            <Route
              path="/owner-occupier/dash/:id"
              render={() => (
                <OccupierInvestorDashboard title="Owner-Occupier Dashboard" />
              )}
            />
            <Route
              path="/investor/dash/:id"
              render={() => (
                <OccupierInvestorDashboard title="Investor Dashboard" />
              )}
            />
            <Route
              path="/developer/dash/:id"
              render={() => <DeveloperDashboard />}
            />
            <CustomRoute
              path="/saved-dashboards"
              render={() => <SavedDashboards />}
            />
            <CustomRoute path="/settings" render={() => <Settings />} />
          </Switch>
          <UserTypeModal />
          <SaveDashboardModal />
          <Footer />
        </div>
      </Router>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  initUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);