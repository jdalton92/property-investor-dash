import React from "react";
import { connect } from "react-redux";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  developerTooltipHelper,
  occupierInvestorTooltipHelper
} from "../../helpers/tooltipHelper";

const CalculatorFormTooltip = props => {
  const header =
    props.type === "developer"
      ? developerTooltipHelper[props.input].header
      : occupierInvestorTooltipHelper[props.input].header;
  const message =
    props.type === "developer"
      ? developerTooltipHelper[props.input].message
      : occupierInvestorTooltipHelper[props.input].message;

  const placement = props.placement ? props.placement : "left";

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{header}</Popover.Title>
      <Popover.Content>{message}</Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement={placement} overlay={popover}>
      <button type="button" className="input-helper-button">
        ?
      </button>
    </OverlayTrigger>
  );
};

export default connect(null, null)(CalculatorFormTooltip);
