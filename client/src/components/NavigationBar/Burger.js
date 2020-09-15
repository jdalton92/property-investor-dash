import React from "react";
import { connect } from "react-redux";
import { StyledBurger } from "../styles/NavigationBar";
import { setSidebar } from "../../reducers/navigationReducer";

const Burger = props => {
  return (
    <StyledBurger
      open={props.navigation.sidebarOpen}
      onClick={() => props.setSidebar(!props.navigation.sidebarOpen)}
    >
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

const mapStateToProps = state => {
  return {
    navigation: state.navigation
  };
};

const mapDispatchToProps = {
  setSidebar
};

export default connect(mapStateToProps, mapDispatchToProps)(Burger);
