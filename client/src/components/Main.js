import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import PrivateRoute from "./Shared/PrivateRoute";

import NavigationBar from "./NavigationBar/NavigationBar";
import Menu from "./Menu/Menu";
import Contact from "./Contact";
import PrivacyPolicy from "./PrivacyPolicy";
import About from "./About";
import CalculatorTypes from "./CalculatorTypes";
import Blog from "./Blog";
import Settings from "./Settings/Settings";
import ResetPassword from "./ResetPassword";
import NewPassword from "./NewPassword";
import TermsAndConditions from "./TermsAndConditions";
import OccupierForm from "./CalculatorInputs/OccupierForm";
import InvestorForm from "./CalculatorInputs/InvestorForm";
import DeveloperForm from "./CalculatorInputs/DeveloperForm";
import Dashboard from "./Dashboards/Dashboard";
import SavedDashboards from "./SavedDashboards/SavedDashboards";
import NotFound from "./NotFound";
import Loader from "./Shared/Loader";

const Main = ({ isUserFetching }) => {
  return (
    <div className="animate-fade-in">
      {isUserFetching && <Loader />}
      {!isUserFetching && (
        <>
          <NavigationBar />
          <div className="w-full flex justify-center">
            <Menu />
            <div className="w-full p-2 max-w-screen-lg">
              <Switch>
                <Route exact path="/" render={() => <About />} />
                <PrivateRoute path="/settings" render={() => <Settings />} />
                <Route path="/new-password" render={() => <NewPassword />} />
                <Route
                  path="/reset-password"
                  render={() => <ResetPassword />}
                />
                <PrivateRoute
                  path="/saved-dashboards"
                  render={() => <SavedDashboards />}
                />
                <Route path="/contact" render={() => <Contact />} />
                <Route
                  path="/terms-and-conditions"
                  render={() => <TermsAndConditions />}
                />
                <Route
                  path="/privacy-policy"
                  render={() => <PrivacyPolicy />}
                />
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
                <PrivateRoute
                  path="/owner-occupier/edit/:id"
                  render={() => <OccupierForm />}
                />
                <PrivateRoute
                  path="/investor/edit/:id"
                  render={() => <InvestorForm />}
                />
                <PrivateRoute
                  path="/developer/edit/:id"
                  render={() => <DeveloperForm />}
                />
                <Route exact path="/dashboard" render={() => <Dashboard />} />
                <PrivateRoute
                  path="/dashboard/:id"
                  render={() => <Dashboard />}
                />
                <Route path="/404" render={() => <NotFound />} />
                <Redirect from="*" to="/404" />
              </Switch>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserFetching: state.users.isFetching,
  };
};

export default connect(mapStateToProps, null)(Main);
