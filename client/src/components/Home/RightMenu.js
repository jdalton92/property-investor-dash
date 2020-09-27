import React from "react";
import { connect } from "react-redux";
import Button from "../Shared/Button";

const RightMenu = () => {
  let x;
  let y = [];

  for (x = 0; x < 100; x++) {
    y = [...y, 1];
  }

  return (
    <div className="right-menu sticky-below-nav flex-col border-p">
      <div className="o-y-scroll o-x-hidden p8 flex-col scrollbar">
        {y.map((c, i) => (
          <Button extraClass={"button-p"} caption={"test button"} key={i} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return null;
};

const mapDispatchToProps = null;

export default connect(null, null)(RightMenu);
