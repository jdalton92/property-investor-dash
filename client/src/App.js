import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { initUser } from "./reducers/userReducer";
import { CONSTANTS } from "./static/constants";

import ScrollToTopControlller from "./components/Shared/ScrollToTopControlller";
import Loader from "./components/Shared/Loader";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import LeftMenu from "./components/Menu/LeftMenu";
import Main from "./components/Main";
import Notifications from "./components/Shared/Notification/Notifications";
import Overlay from "./components/Shared/Overlay";
import Login from "./components/Login";
import SaveDashboardModal from "./components/Dashboards/SaveDashboardModal";

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
  } else {
    return (
      <div className="w100 fade-in">
        <Router>
          <ScrollToTopControlller />
          {overlay && <Overlay />}
          {saveDashboardModal && <SaveDashboardModal />}
          <Notifications />
          <Route exact path="/login" render={() => <Login />} />
          <NavigationBar />
          <div className="w100 flex-row justify-c">
            <LeftMenu />
            <Main />
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
    saveDashboardModal: state.navigation.modal[CONSTANTS.MODALS.SAVEDASHBOARD],
  };
};

const mapDispatchToProps = {
  initUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
