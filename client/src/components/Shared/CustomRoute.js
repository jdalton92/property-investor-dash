import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const CustomRoute = (props) => {
  if (props.email) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};

const mapStateToProps = (state) => {
  return {
    email: state.user?.data?.email,
  };
};

export default connect(mapStateToProps, null)(CustomRoute);
