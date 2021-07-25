import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { initUser } from "./reducers/usersReducer";
import { CONSTANTS } from "./constants/constants";
import AnalyticsController from "./components/Shared/AnalyticsController";
import ScrollToTopControlller from "./components/Shared/ScrollToTopControlller";
import PageTitleController from "./components/Shared/PageTitleController";
import Notifications from "./components/Notification/Notifications";
import SaveDashboardModal from "./components/SaveDashboardModal/SaveDashboardModal";
import Login from "./components/Login";
import Main from "./components/Main";

const App = ({ initUser, saveDashboardModal }) => {
  useEffect(() => {
    initUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-200">
      <Router>
        <PageTitleController />
        <ScrollToTopControlller />
        <Notifications />
        {saveDashboardModal && <SaveDashboardModal />}
        <Switch>
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/sign-up" render={() => <Login />} />
          <Route render={() => <Main />} />
        </Switch>
        {process.env.NODE_ENV === "production" && <AnalyticsController />}
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    saveDashboardModal: state.navigation.modal[CONSTANTS.MODALS.SAVEDASHBOARD],
  };
};

const mapDispatchToProps = {
  initUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
