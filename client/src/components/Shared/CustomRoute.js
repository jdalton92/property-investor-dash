import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const CustomRoute = (props) => {
  if (props.isLoggedIn) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.users.data?._id,
  };
};

export default connect(mapStateToProps, null)(CustomRoute);
