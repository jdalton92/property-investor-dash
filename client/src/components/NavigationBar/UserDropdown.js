import React from "react";
import { connect } from "react-redux";
import Button from "../Shared/Button";

const UserDropdown = ({ showDropdown }) => {
  return (
    <>
      {showDropdown ? (
        <div className="user-dropdown flex-col p8 fade-in bs-1 border-p">
          <Button caption={"Settings"} />
          <Button caption={"Item 2"} />
          <Button caption={"Item 3"} />
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    showDropdown: state.navigation.dropdown.username,
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
