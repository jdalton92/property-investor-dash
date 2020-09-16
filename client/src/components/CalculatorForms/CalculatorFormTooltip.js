import React from "react";
import { connect } from "react-redux";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  developerTooltipHelper,
  occupierInvestorTooltipHelper,
} from "../../helpers/tooltipHelper";

const CalculatorFormTooltip = ({ type, input, placement }) => {
  const header =
    type === "developer"
      ? developerTooltipHelper[input].header
      : occupierInvestorTooltipHelper[input].header;
  const message =
    type === "developer"
      ? developerTooltipHelper[input].message
      : occupierInvestorTooltipHelper[input].message;

  const setPlacement = placement || "left";

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{header}</Popover.Title>
      <Popover.Content>{message}</Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement={setPlacement} overlay={popover}>
      <button type="button" className="input-helper-button">
        ?
      </button>
    </OverlayTrigger>
  );
};

export default connect(null, null)(CalculatorFormTooltip);
