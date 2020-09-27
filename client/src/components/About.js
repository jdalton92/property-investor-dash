import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ownerOccupierImage from "../styles/images/owner-occupier.jfif";
import investorImage from "../styles/images/investor.jfif";
import developerImage from "../styles/images/developer.jfif";

const About = () => {
  const history = useHistory();
  const handleOwnerClick = (e) => {
    e.preventDefault();
    history.push("/owner-occupier");
  };
  const handleInvestorClick = (e) => {
    e.preventDefault();
    history.push("/investor");
  };
  const handleDeveloperClick = (e) => {
    e.preventDefault();
    history.push("/developer");
  };

  return (
    <section className="about-section">
      <div className="what-is-container">
        <h1 className="what-is-header">
          <b>What is Property Investor DASH?</b>
        </h1>
        <p className="what-is-paragraph">
          PropertyInvestorDASH was created to provide a simple property
          investment calculator for people who are looking for a free alternate
          to what's currently available. There are many software providers that
          offer property investment feasibilities, but these are unnecessarily
          sophisticated and expensive. There are many free online tools to
          estimate mortgage repayments, but these do not provide estimates of
          your total investment, including rent and sale value.
          PropertyInvestorDASH aims to provide a <i>simple</i> and <i>free</i>{" "}
          tool for all property investors
        </p>
      </div>
      <div className="info-container">
        <h1 className="info-header">
          <b>Calculator Types</b>
        </h1>
        <div className="about-row">
          <div className="about-column image-column">
            <img
              className="owner-occupier-image"
              src={ownerOccupierImage}
              alt="owner-occupier"
            ></img>
          </div>
          <div onClick={handleOwnerClick} className="about-column text-column">
            <h1>Calculator 1: Owner-Occupier</h1>
            <p>
              Use the owner-occupier calculator if you are looking to purchase
              and live in your own home. This profile suits first-home-buyers,
              as well as potential financiers who are looking to test mortgage
              terms for owner-occupiers
            </p>
          </div>
        </div>
        <div className="about-row reverse">
          <div className="about-column image-column">
            <img
              className="investor-image"
              src={investorImage}
              alt="investor"
            ></img>
          </div>
          <div
            onClick={handleInvestorClick}
            className="about-column text-column"
          >
            <h1>Calculator 2: Investor</h1>
            <p>
              The investor profile will suit you if you are looking to forecast
              income and expenses for the purchase an investment property to
              rent, or if you are looking to buy a home to live in and rent a
              room for additonal income.
            </p>
          </div>
        </div>
        <div className="about-row">
          <div className="about-column image-column">
            <img
              className="developer-image"
              src={developerImage}
              alt="developer"
            ></img>
          </div>
          <div
            onClick={handleDeveloperClick}
            className="about-column text-column"
          >
            <h1>Calculator 3: Developer</h1>
            <p>
              If you are looking to purchase and renovate or build, then the
              developer profile is for you. Includes option to sell on
              completion of construction, or hold for an investment period.
              Financiers can also test estimated funding costs of a
              constructioon loan that is able to be rolled into an investment
              facility
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(null, null)(About);
