import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const CustomRoute = (props) => {
  if (props.user.data.username !== undefined) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(CustomRoute);
