import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setModal } from "../reducers/navigationReducer";
import { Modal, Button } from "react-bootstrap";
import ownerOccupierImage from "../styles/images/owner-occupier.jfif";
import investorImage from "../styles/images/investor.jfif";
import developerImage from "../styles/images/developer.jfif";

const UserTypeModal = ({ setModal, userModalShow }) => {
  const history = useHistory();
  const handleOwnerClick = (e) => {
    e.preventDefault();
    setModal("userType");
    history.push("/owner-occupier/edit");
  };
  const handleInvestorClick = (e) => {
    e.preventDefault();
    setModal("userType");
    history.push("/investor/edit");
  };
  const handleDeveloperClick = (e) => {
    e.preventDefault();
    setModal("userType");
    history.push("/developer/edit");
  };

  return (
    <Modal
      show={userModalShow}
      onHide={() => setModal("userType")}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose User Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="user-container">
        <div className="user-card">
          <div className="user-image-container">
            <img
              className="user-type-image"
              src={ownerOccupierImage}
              alt="owner-occupier"
            ></img>
          </div>
          <div className="user-card-text">Owner-Occupier</div>
          <Button className="user-card-button" onClick={handleOwnerClick}>
            Select
          </Button>
        </div>

        <div className="user-card">
          <div className="user-image-container">
            <img
              className="user-type-image"
              src={investorImage}
              alt="investor"
            ></img>
          </div>
          <div className="user-card-text">Investor</div>
          <Button className="user-card-button" onClick={handleInvestorClick}>
            Select
          </Button>
        </div>

        <div className="user-card">
          <div className="user-image-container">
            <img
              className="user-type-image"
              src={developerImage}
              alt="developer"
            ></img>
          </div>
          <div className="user-card-text">Developer</div>
          <Button className="user-card-button" onClick={handleDeveloperClick}>
            Select
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    userModalShow: state.navigation.modal.userType,
  };
};

const mapDispatchToProps = {
  setModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTypeModal);
