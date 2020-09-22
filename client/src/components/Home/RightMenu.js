import React from "react";
import { connect } from "react-redux";

const RightMenu = () => {
  return (
    <container className="p8 flex-col vh100 menu b-primary">
      <div className="w100 h100 fixed o-y-scroll">right menu</div>
    </container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isUserFetching: state.user.isFetching,
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);
