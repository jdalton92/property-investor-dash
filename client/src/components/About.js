import React from "react";
import developer from "../styles/images/card-developer.png";
import financiers from "../styles/images/card-financiers.png";
import firstHomeBuyer from "../styles/images/card-first-home-buyer.png";
import investor from "../styles/images/card-investor.png";
import owner from "../styles/images/card-owner.png";

const About = () => {
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
        total investment, including rent and sale value. PropertyInvestorDash
        aims to provide a <i>simple</i> and <i>free</i> tool for all type of
        investors
      </div>
      <h2 className="f20 bold mt16 mb16">How Does PropertyInvestorDash Work</h2>
      <div className="r bs-3 bg-1 p20 mb16">
        PropertyInvestorDash has been developed with key input from real estate
        industry experts and helps provide a simple, easy option for property
        investors looking to estimate their next investment strategy.
        ProperyInvestorDASH has been built so no prior experience is required,
        and any stakeholder can find useful outputs to estimate key cost,
        revenue, and timing outputs for all your property investments.
        PropertyInvestorDash provides an easy tool for all users, from
        individual home owners to large developers
      </div>
      <div className="r bs-3 bg-1 p20 mb16 jump">
        <h3 className="f12 bold mb16">Step 1: Choose your investment type</h3>
        Choose what type of dashboard you would like to view, with each option
        displaying bespoke outputs to suit your investment profile
      </div>
      <div className="r bs-3 bg-1 p20 mb16 jump">
        <h3 className="f12 bold mb16">Step 2: Input your assumptions</h3>
        Choose your inputs for simplified revenue, cost, and timing assumptions.
        With helpful validation of inputs, and relevant tooltip helpers, anyone
        is able to use the tool
      </div>
      <div className="r bs-3 bg-1 p20 mb16 jump">
        <h3 className="f12 bold mb16">Step 3: View your dashboard</h3>
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

export default About;
