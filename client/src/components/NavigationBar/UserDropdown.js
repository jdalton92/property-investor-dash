import React from "react";
import { connect } from "react-redux";
import Button from "../Shared/Button";

const UserDropdown = ({ showDropdown }) => {
  return (
    <>
      {showDropdown ? (
        <div className="user-dropdown flex-col p8 fade-in bs-1 border-p">
          <Button extraClass={"button-p"} caption={"test button"} />
          <Button extraClass={"button-p"} caption={"test button"} />
          <Button extraClass={"button-p"} caption={"test button"} />
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
