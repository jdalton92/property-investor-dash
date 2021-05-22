import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { initUser } from "./reducers/userReducer";
import { CONSTANTS } from "./static/constants";
import AnalyticsController from "./components/Shared/AnalyticsController";
import ScrollToTopControlller from "./components/Shared/ScrollToTopControlller";
import PageTitleController from "./components/Shared/PageTitleController";
import Loader from "./components/Shared/Loader";
import Notifications from "./components/Shared/Notification/Notifications";
import Overlay from "./components/Shared/Overlay";
import SaveDashboardModal from "./components/Dashboards/SaveDashboardModal";
import Login from "./components/Login";
import Main from "./components/Main";

import "./styles/main.scss";

const App = ({ initUser, isUserFetching, overlay, saveDashboardModal }) => {
  useEffect(() => {
    initUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isUserFetching) {
    return <Loader />;
  } else {
    return (
      <div className="app bg-base w100 fade-in">
        <Router>
          <PageTitleController />
          <ScrollToTopControlller />
          {overlay && <Overlay />}
          {saveDashboardModal && <SaveDashboardModal />}
          <Notifications />
          <Switch>
            <Route exact path="/login" render={() => <Login />} />
            <Route render={() => <Main />} />
          </Switch>
          {process.env.NODE_ENV === "production" && <AnalyticsController />}
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
    saveDashboardModal: state.navigation.modal[CONSTANTS.MODALS.SAVEDASHBOARD],
  };
};

const mapDispatchToProps = {
  initUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
