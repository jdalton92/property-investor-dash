import React from "react";
import { connect } from "react-redux";
import Button from "../Button";

const RightMenu = () => {
  let x;
  let y = [];

  for (x = 0; x < 100; x++) {
    y = [...y, 1];
  }

  return (
    <div className="left-menu sticky flex-col border-p">
      <div className="o-y-scroll o-x-hidden p8 flex-col scrollbar">
        {y.map((c) => (
          <Button caption={"test button"} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return null;
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);
