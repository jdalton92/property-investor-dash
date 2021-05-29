import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
  if (props.isAuthenticated) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.data?._id,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
