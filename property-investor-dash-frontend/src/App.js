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
import OccupierInvestorCalculatorForm from "./components/CalculatorForms/OccupierInvestor/OccupierInvestorCalculatorForm";
import DeveloperCalculatorForm from "./components/CalculatorForms/Developer/DeveloperCalculatorForm";
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
              render={() => <OccupierInvestorCalculatorForm />}
            />
            <Route
              exact
              path="/investor"
              render={() => <OccupierInvestorCalculatorForm />}
            />
            <Route
              exact
              path="/developer"
              render={() => <DeveloperCalculatorForm />}
            />
            <Route
              path="/owner-occupier/dashboard"
              render={() => <OccupierInvestorDashboard />}
            />
            <Route
              path="/investor/dashboard"
              render={() => <OccupierInvestorDashboard />}
            />
            <Route
              path="/developer/dashboard"
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
