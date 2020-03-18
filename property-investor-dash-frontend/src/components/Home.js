import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setModal } from "../reducers/navigationReducer";
import { Button } from "react-bootstrap";
import "./styles/Home.css";
import desktopDashboard from "./styles/images/desktop-dashboard.png";
import tick from "./styles/images/tick-list.png";

const Home = props => {
  const history = useHistory();
  const handleClick = e => {
    e.preventDefault();
    history.push("/create-user");
  };
  const handleModal = e => {
    e.preventDefault();
    props.setModal("userType");
  };

  return (
    <>
      <section className="home-section">
        <div className="home-container">
          <div className="home-row-top">
            <div className="home-column home-left">
              <div className="home-text">
                <h1>
                  Property Investing Made <i>Simple</i>
                </h1>
                <p className="home-subtext">
                  Estimate returns from any residential property investment with
                  simple dashboard outputs
                </p>
              </div>
              <div className="home-button-container">
                <Button className="calculate-now-button" onClick={handleClick}>
                  <h4 className="home-sign-up">Sign Up</h4>
                </Button>
                <u onClick={handleModal} className="try-now-link">
                  Or try it free now
                </u>
              </div>
            </div>
            <div className="home-column home-right">
              <img
                className="desktop-image"
                src={desktopDashboard}
                alt="desktop dashboard"
              ></img>
            </div>
          </div>
        </div>
        <div className="general-info-container">
          <div className="general-info-row">
            <div className="general-info-header">
              <h1 className="home-subheading">
                How does Property Investor DASH work?
              </h1>
            </div>
            <div className="general-info-text">
              PropertyInvestorDASH has been developed with key input from real
              estate industry experts and helps provide a simple, easy option
              for property investors looking to estimate their next investment
              strategy. ProperyInvestorDASH has been built so no prior
              experience is required, and any stakeholder can find useful
              outputs to estimate key cost, revenue, and timing outputs for all
              your property investments. PropertyInvestorDASH provides an easy
              tool for all users, from individual home owners to large
              developers
            </div>
            <div className="general-info-step-container">
              <div className="home-toast-container">
                <h3>
                  <b>Step 1: Choose your investment type</b>
                </h3>
                <p>
                  Choose what type of dashboard you would like to view, with
                  each option displaying bespoke outputs to suit your investment
                  profile
                </p>
              </div>
              <div className="home-toast-container">
                <h3>
                  <b>Step 2: Input your assumptions</b>
                </h3>
                <p>
                  Choose your inputs for simplified revenue, cost, and timing
                  assumptions. With helpful validation of inputs, and relevant
                  tooltip helpers, anyone is able to use the tool
                </p>
              </div>
              <div className="home-toast-container">
                <h3>
                  <b>Step 3: View your dashboard</b>
                </h3>
                <p>
                  Simple dashboard output summarise investment metrics, and
                  forecast simple cashflows with easy to understand visual
                  outputs. Log in to your account to modify your assumptions to
                  test different investment scenarios
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="who-container">
          <div className="who-row">
            <div className="who-heading">
              <h1 className="home-subheading">
                Who is Property Investor DASH for?
              </h1>
            </div>
            <div className="who-card-row">
              <div className="who-card">
                <div className="who-tick">
                  <img className="tick-image" src={tick} alt="tick"></img>
                </div>
                <div className="who-name">
                  <h2>Owners</h2>
                  <p>
                    Forcast monthly mortgage and home ownership payments for
                    your own home, with ability to forecast future growth of
                    property values, and operating costs
                  </p>
                </div>
              </div>
              <div className="who-card">
                <div className="who-tick">
                  <img className="tick-image" src={tick} alt="tick"></img>
                </div>
                <div className="who-name">
                  <h2>Investors</h2>
                  <p>
                    See your rental return and homeloan repayments on an
                    investment property to see what type of investment your are
                    able to afford
                  </p>
                </div>
              </div>
              <div className="who-card">
                <div className="who-tick">
                  <img className="tick-image" src={tick} alt="tick"></img>
                </div>
                <div className="who-name">
                  <h2>Developers</h2>
                  <p>
                    Buy, build, and then sell or rent. Forecast your total
                    investment needs, with construction <i>and</i> investment
                    debt
                  </p>
                </div>
              </div>
              <div className="who-card">
                <div className="who-tick">
                  <img className="tick-image" src={tick} alt="tick"></img>
                </div>
                <div className="who-name">
                  <h2>First Home Buyers</h2>
                  <p>
                    Test the maximum price you can pay, and estimate your
                    monthly mortgage payments for purchasing your first property
                    with easy to grasp inputs and helpful description on each
                    assumption you make
                  </p>
                </div>
              </div>
              <div className="who-card">
                <div className="who-tick">
                  <img className="tick-image" src={tick} alt="tick"></img>
                </div>
                <div className="who-name">
                  <h2>Financiers</h2>
                  <p>
                    Estimate returns for funding to owners, investors, and
                    developers. Including simple capability to forecast both
                    construction debt facility, and investment term facility
                    repayments for developers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="calculate-now-container">
          <div className="calculate-now-row">
            <h2 className="calculate-now-header">Create your account</h2>
            <Button className="calculate-now-button" onClick={handleClick}>
              <h4 className="home-sign-up">Sign Up</h4>
            </Button>
            <u onClick={handleModal} className="try-now-link">
              Or try it free now
            </u>
          </div>
        </div>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  setModal
};

export default connect(null, mapDispatchToProps)(Home);
