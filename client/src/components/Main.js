import React from "react";
import { Route, Switch } from "react-router-dom";
import CustomRoute from "./Shared/CustomRoute";

import NavigationBar from "./NavigationBar/NavigationBar";
import LeftMenu from "./Menu/LeftMenu";
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

const Main = () => {
  return (
    <>
      <NavigationBar />
      <div className="w100 flex-row justify-c">
        <LeftMenu />
        <div className="main p8 w100">
          <Switch>
            <Route exact path="/" render={() => <About />} />
            <CustomRoute path="/settings" render={() => <Settings />} />
            <CustomRoute
              path="/saved-dashboards"
              render={() => <SavedDashboards />}
            />
            <Route path="/contact" render={() => <Contact />} />
            <Route
              path="/terms-and-conditions"
              render={() => <TermsAndConditions />}
            />
            <Route path="/privacy-policy" render={() => <PrivacyPolicy />} />
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
            <CustomRoute
              path="/owner-occupier/edit/:id"
              render={() => <OccupierForm />}
            />
            <CustomRoute
              path="/investor/edit/:id"
              render={() => <InvestorForm />}
            />
            <CustomRoute
              path="/developer/edit/:id"
              render={() => <DeveloperForm />}
            />
            <Route
              exact
              path="/owner-occupier/dash"
              render={() => <OccupierDashboard />}
            />
            <CustomRoute
              path="/owner-occupier/dash/:id"
              render={() => <OccupierDashboard />}
            />
            <Route
              exact
              path="/investor/dash"
              render={() => <InvestorDashboard />}
            />
            <CustomRoute
              path="/investor/dash/:id"
              render={() => <InvestorDashboard />}
            />
            <Route
              exact
              path="/developer/dash"
              render={() => <DeveloperDashboard />}
            />
            <CustomRoute
              path="/developer/dash/:id"
              render={() => <DeveloperDashboard />}
            />
            <Route render={() => <NotFound />} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Main;
