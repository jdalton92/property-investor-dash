import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setModal } from "../../reducers/navigationReducer";
import { Modal, Button } from "react-bootstrap";
import "../styles/CalculatorFormModal.css";

const CalculatorFormModal = props => {
  const history = useHistory();
  const handleAccept = e => {
    e.preventDefault();
    props.setModal("disclaimer");
    const pathname = history.location.pathname;
    if (pathname.includes("occupier")) {
      history.push("/owner-occupier/dashboard");
    } else if (pathname.includes("investor")) {
      history.push("/investor/dashboard");
    } else if (pathname.includes("developer")) {
      history.push("/developer/dashboard");
    }
  };

  const handleCancel = e => {
    e.preventDefault();
    props.setModal("disclaimer");
  };

  return (
    <Modal
      show={props.disclaimerModalShow}
      onHide={() => props.setModal("disclaimer")}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Disclaimer © 2020
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Neither the whole nor any part of this output nor any reference to it
          may be included in any other document without the prior written
          consent of PropertyInvestorDASH. The outputs are based upon
          information provided by the user. PropertyInvestorDASH have not
          carried out any separate verification of the information provided or
          sourced. PropertyInvestorDASH does not warrant or represent that the
          information relied upon to prepare this output is complete or accurate
          nor has it been audited.
        </p>
        <p>
          PropertyInvestorDASH does not warrant that outputs are or will be
          accurate or correct. Any act, statement or opinion made or provided by
          PropertyInvestorDASH with respect to the value of any asset or
          property should not in any way be construed or relied upon as a
          representation, recommendation or guarantee from using this tool.
          PropertyInvestorDASH does not accept any legal liability or
          responsibility for any cost, loss or damage incurred by the use of or
          reliance on or interpretation of any of the information. This output
          is not and does not purport to be a formal valuation of any subject
          property and should not be relied upon as such.
        </p>
      </Modal.Body>
      <Modal.Footer className="disclaimer-footer">
        <Button
          className="disclaimer-button"
          onClick={handleAccept}
          variant="primary"
        >
          Accept and Acknowledge
        </Button>
        <Button
          className="disclaimer-button"
          variant="outline-primary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    values: state.values,
    disclaimerModalShow: state.navigation.modal.disclaimer
  };
};

const mapDispatchToProps = {
  setModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorFormModal);
