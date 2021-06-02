import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { demoUser } from "../reducers/usersReducer";
import { Icon } from "./Shared/Icon";
import TickIcon from "../styles/svg/tick.svg";
import QuestionIcon from "../styles/svg/question.svg";
import developer from "../styles/images/card-developer.png";
import financiers from "../styles/images/card-financiers.png";
import firstHomeBuyer from "../styles/images/card-first-home-buyer.png";
import investor from "../styles/images/card-investor.png";
import owner from "../styles/images/card-owner.png";

const About = ({ isAuthedUser, demoUser }) => {
  const history = useHistory();
  const handleLink = (url) => {
    history.push(url);
  };
  const handleViewDemo = () => {
    demoUser();
    handleLink(`/saved-dashboards`);
  };
  return (
    <>
      <h1 className="f24 bold mt16 mb16">About</h1>
      <h2 className="f20 bold mt16 mb16">What Is PropertyInvestorDash</h2>
      <div className="r bs-3 bg-1 p20 mb20">
        PropertyInvestorDash was created to provide a simple property investment
        calculator for people who are looking for a free alternate to what's
        currently available. There are many software providers that offer
        property investment feasibilities, but these are unnecessarily
        sophisticated and expensive. There are many free online tools to
        estimate mortgage repayments, but these do not provide estimates of your
        total investment, including rental income and sale value.
        PropertyInvestorDash aims to provide a simple and free tool for all type
        of investors
      </div>
      <h2 className="f20 bold mt16 mb16">How Does PropertyInvestorDash Work</h2>
      <div className="flex-row">
        <button
          type="button"
          className="form-button-p bs-3 font-white mb16 pt4 pb4 flex-row align-c justify-c"
          onClick={() => handleLink("/calculator-types")}
        >
          <Icon
            size={"20px"}
            url={TickIcon}
            color={"white"}
            hover={false}
            active={false}
          />
          <span className="ml8">Get Started</span>
        </button>
        {!isAuthedUser && (
          <button
            type="button"
            className="form-button-s bs-3 ml12 font-white mb16 pt4 pb4 flex-row align-c justify-c"
            onClick={handleViewDemo}
          >
            <Icon
              size={"20px"}
              url={QuestionIcon}
              color={"white"}
              hover={false}
              active={false}
            />
            <span className="ml8">Show Demo</span>
          </button>
        )}
      </div>
      <div className="r bs-3 bg-1 p20 mb16">
        PropertyInvestorDash has been developed with key input from real estate
        industry experts and helps provide a simple, easy option for property
        investors looking to estimate their next investment strategy. Our tool
        has been built so no prior experience is required, and any stakeholder
        can find useful outputs to estimate key cost, revenue, and timing
        outputs for all your property investments. PropertyInvestorDash provides
        an easy tool for all users, from individual home owners to large
        developers
      </div>
      <div className="r bs-3 bg-1 p20 mb16 jump">
        <h3 className="f16 bold mb16">Step 1: Choose your investment type</h3>
        Choose what type of investment you would like to calculate, with each
        option displaying bespoke dashboard outputs to suit your investment
        profile
      </div>
      <div className="r bs-3 bg-1 p20 mb16 jump">
        <h3 className="f16 bold mb16">Step 2: Input your assumptions</h3>
        Choose your inputs for simplified revenue, cost, and timing assumptions.
        With helpful validation of inputs, and relevant tooltip helpers, anyone
        is able to use the tool
      </div>
      <div className="r bs-3 bg-1 p20 mb16 jump">
        <h3 className="f16 bold mb16">Step 3: View your dashboard</h3>
        Simple dashboard output summarise investment metrics, and forecast
        simple cashflows with easy to understand visual outputs. Log in to your
        account to modify your assumptions to test different investment
        scenarios
      </div>
      <h2 className="f20 bold mt16 mb16">Who Is It For</h2>
      <div className="card r bs-3 bg-1 mb20 flex-row jump">
        <div
          className="card-img"
          style={{
            backgroundImage: `url(${owner})`,
          }}
        />
        <div className="flex-col justify-c p20">
          <h3 className="f16 bold mb20">Owners</h3>
          <p>
            Forcast monthly mortgage and home ownership payments for your own
            home, with ability to forecast future growth of property values, and
            operating costs
          </p>
        </div>
      </div>
      <div className="card-rev r bs-3 bg-1 mb20 flex-row jump">
        <div className="flex-col justify-c p20">
          <h3 className="f16 bold mb20">Investors</h3>
          <p>
            See your rental return and homeloan repayments on an investment
            property to see what type of investment your are able to afford
          </p>
        </div>
        <div
          className="card-img"
          style={{
            backgroundImage: `url(${investor})`,
          }}
        />
      </div>
      <div className="card r bs-3 bg-1 mb20 flex-row jump">
        <div
          className="card-img"
          style={{
            backgroundImage: `url(${developer})`,
          }}
        />
        <div className="flex-col justify-c p20">
          <h3 className="f16 bold mb20">Developers</h3>
          <p>
            Buy, build, and then sell or rent. Forecast your total investment
            needs, with construction <i>and</i> investment debt
          </p>
        </div>
      </div>
      <div className="card-rev r bs-3 bg-1 mb20 flex-row jump">
        <div className="flex-col justify-c p20">
          <h3 className="f16 bold mb20">First Home Buyers</h3>
          <p>
            Test the maximum price you can pay, and estimate your monthly
            mortgage payments for purchasing your first property with easy to
            grasp inputs and helpful description on each assumption you make
          </p>
        </div>
        <div
          className="card-img"
          style={{
            backgroundImage: `url(${firstHomeBuyer})`,
          }}
        />
      </div>
      <div className="card r bs-3 bg-1 mb20 flex-row jump">
        <div
          className="card-img"
          style={{
            backgroundImage: `url(${financiers})`,
          }}
        />
        <div className="flex-col justify-c p20">
          <h3 className="f16 bold mb20">Financiers</h3>
          <p>
            Estimate returns for funding to owners, investors, and developers.
            Including simple capability to forecast both construction debt
            facility, and investment term facility repayments for developers.
          </p>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthedUser: !!state.users.data?._id,
  };
};

const mapDispatchToProps = {
  demoUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
