import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { initUser } from "./reducers/userReducer";
import { CONSTANTS } from "./static/constants";

// Shared Components/Utils
// import ScrollToTopControlller from "./components/ScrollToTopControlller";
import CustomRoute from "./components/CustomRoute";
import Loader from "./components/Shared/Loader";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import LeftMenu from "./components/Menu/LeftMenu";
import RightMenu from "./components/Menu/RightMenu";
import Notifications from "./components/Shared/Notification/Notifications";
import Overlay from "./components/Shared/Overlay";

// Views
import Login from "./components/Login";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import About from "./components/About";
import CalculatorTypes from "./components/CalculatorTypes";
import Blog from "./components/Blog";
import Settings from "./components/Settings/Settings";
import TermsAndConditions from "./components/TermsAndConditions";
import OccupierForm from "./components/CalculatorInputs/OccupierForm";
import InvestorForm from "./components/CalculatorInputs/InvestorForm";
import DeveloperForm from "./components/CalculatorInputs/DeveloperForm";
import OccupierDashboard from "./components/Dashboards/OccupierDashboard";
import InvestorDashboard from "./components/Dashboards/InvestorDashboard";
import DeveloperDashboard from "./components/Dashboards/DeveloperDashboard";
import SaveDashboardModal from "./components/Dashboards/SaveDashboardModal";
import SavedDashboards from "./components/SavedDashboards";
import NotFound from "./components/NotFound";

import "./styles/main.scss";

const App = ({
  initUser,
  isUserFetching,
  overlay,
  user,
  saveDashboardModal,
}) => {
  useEffect(() => {
    initUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isUserFetching) {
    return <Loader />;
  } else if (user.data?.username) {
    return (
      <div className="w100 fade-in">
        <Router>
          {overlay && <Overlay />}
          {saveDashboardModal && <SaveDashboardModal />}
          <Notifications />
          <NavigationBar />
          <div className="w100 flex-row justify-c">
            <LeftMenu />
            <div className="main p8 w100 border-p">
              <Switch>
                <Route path="/login" render={() => <Login />} />
                <CustomRoute path="/settings" render={() => <Settings />} />
                <CustomRoute
                  path="/saved-dashboards"
                  render={() => <SavedDashboards />}
                />
                {/* <Route path="/create-user" render={() => <CreateUser />} />
                <ScrollToTopControlller /> */}
                <Route path="/contact" render={() => <Contact />} />
                <Route
                  path="/terms-and-conditions"
                  render={() => <TermsAndConditions />}
                />
                <Route
                  path="/privacy-policy"
                  render={() => <PrivacyPolicy />}
                />
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
                <Route
                  path="/investor/dash/:id"
                  render={() => <InvestorDashboard />}
                />
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
            <RightMenu />
          </div>
        </Router>
      </div>
    );
  } else {
    return (
      <>
        <Login />
        <Notifications />
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isUserFetching: state.user.isFetching,
    overlay: state.navigation.overlay,
    saveDashboardModal: state.navigation.modal[CONSTANTS.MODALS.SAVEDASHBOARD],
  };
};

const mapDispatchToProps = {
  initUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
