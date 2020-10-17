import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { initUser } from "./reducers/userReducer";
import "./styles/main.scss";

import Loader from "./components/Shared/Loader";
import ScrollToTopControlller from "./components/ScrollToTopControlller";
import CustomRoute from "./components/CustomRoute";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import LeftMenu from "./components/Menu/LeftMenu";
import RightMenu from "./components/Menu/RightMenu";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Contact from "./components/Contact";
import CreateUser from "./components/CreateUser";
import Settings from "./components/Settings";
import TermsAndConditions from "./components/TermsAndConditions";
import Notifications from "./components/Shared/Notification/Notifications";
import Overlay from "./components/Shared/Overlay";
import SavedDashboards from "./components/SavedDashboards";

import OccupierForm from "./components/CalculatorInputs/OccupierForm";
import InvestorForm from "./components/CalculatorInputs/InvestorForm";
import DeveloperForm from "./components/CalculatorInputs/DeveloperForm";

import DeveloperDashboard from "./components/Dashboards/DeveloperDashboard";
import OccupierInvestorDashboard from "./components/Dashboards/OccupierInvestorDashboard";
import UserTypeModal from "./components/UserTypeModal";
import SaveDashboardModal from "./components/Dashboards/SaveDashboardModal";

const App = ({ initUser, isUserFetching, overlay, user }) => {
  useEffect(() => {
    initUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isUserFetching) {
    return <Loader />;
  } else if (!user.data.username) {
    return (
      <>
        <Login />
        <Notifications />
      </>
    );
  } else {
    return (
      <div className="w100 fade-in">
        <Router>
          {overlay && <Overlay />}
          <Notifications />
          <ScrollToTopControlller />
          {/* <UserTypeModal /> */}
          {/* <SaveDashboardModal /> */}
          <NavigationBar />
          <div className="vh100 w100 flex-row justify-c">
            <LeftMenu />
            <div className="main p8 w100 border-p">
              <Switch>
                <Route path="/login" render={() => <Login />} />
                {/* <Route exact path="/" render={() => <Home />} />
              <Route path="/about" render={() => <About />} />
              <Route path="/contact" render={() => <Contact />} />
              <Route path="/create-user" render={() => <CreateUser />} /> */}
                <Route
                  path="/terms-and-conditions"
                  render={() => <TermsAndConditions />}
                />
                <Route
                  exact
                  path="/owner-occupier/edit"
                  render={() => <OccupierForm />}
                />
                <Route
                  exact
                  path="/investor/edit"
                  render={() => <InvestorForm />}
                />
                <Route
                  exact
                  path="/developer/edit"
                  render={() => <DeveloperForm />}
                />
                <Route
                  path="/owner-occupier/edit/:id"
                  render={() => <OccupierForm />}
                />
                <Route
                  path="/investor/edit/:id"
                  render={() => <InvestorForm />}
                />
                <Route
                  path="/developer/edit/:id"
                  render={() => <DeveloperForm />}
                />
                {/* <Route
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
                exact
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
              <CustomRoute path="/settings" render={() => <Settings />} /> */}
              </Switch>
            </div>
            <RightMenu />
          </div>
        </Router>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isUserFetching: state.user.isFetching,
    overlay: state.navigation.overlay,
  };
};

const mapDispatchToProps = {
  initUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
