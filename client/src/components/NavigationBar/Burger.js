import React from "react";
import { connect } from "react-redux";
import { StyledBurger } from "./StyledBurger";
import { setSidebar } from "../../reducers/navigationReducer";

const Burger = ({ navigation, setSidebar, customClass }) => {
  return (
    <div className={customClass}>
      <StyledBurger
        open={navigation.sidebarOpen}
        onClick={() => setSidebar(!navigation.sidebarOpen)}
      >
        <div />
        <div />
        <div />
      </StyledBurger>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    navigation: state.navigation,
  };
};

const mapDispatchToProps = {
  setSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Burger);
