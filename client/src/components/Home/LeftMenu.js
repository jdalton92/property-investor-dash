import React from "react";
import { connect } from "react-redux";

const LeftMenu = () => {
  let x;
  let y = [];

  for (x = 0; x < 100; x++) {
    y = [...y, 1];
  }

  return (
    <container className="sticky p8 flex-col menu b-primary">
      <div className="o-y-scroll o-x-hidden">
        {y.map((c) => (
          <div>test</div>
        ))}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
