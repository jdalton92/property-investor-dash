import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { demoUser } from "../reducers/usersReducer";
import Button from "./Shared/Button";
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
      <h1 className="my-2 text-xl font-semibold">About</h1>
      <h2 className="my-2 text-l font-semibold">
        What Is PropertyInvestorDash
      </h2>
      <div className="shadow-xl rounded-2xl p-4 bg-white my-2">
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
      <h2 className="my-2 text-l font-semibold">
        How Does PropertyInvestorDash Work
      </h2>
      <div className="flex">
        <Button
          label={"Get Started"}
          type={"button"}
          options={{
            styleType: "primary",
            buttonClass: "h-10 px-2",
            icon: "tick",
            iconClass: "h-8 w-8 mr-2",
            onClick: () => handleLink("/calculator-types"),
          }}
        />
        {!isAuthedUser && (
          <Button
            label={"Try Demo"}
            type={"button"}
            options={{
              styleType: "secondary",
              buttonClass: "h-10 px-2 ml-2",
              icon: "question",
              iconClass: "h-8 w-8 mr-2",
              onClick: () => handleViewDemo(),
            }}
          />
        )}
      </div>
      <div className="shadow-xl rounded-2xl p-4 bg-white my-2">
        PropertyInvestorDash has been developed with key input from real estate
        industry experts and helps provide a simple, easy option for property
        investors looking to estimate their next investment strategy. Our tool
        has been built so no prior experience is required, and any stakeholder
        can find useful outputs to estimate key cost, revenue, and timing
        outputs for all your property investments. PropertyInvestorDash provides
        an easy tool for all users, from individual home owners to large
        developers
      </div>
      <div className="shadow-xl rounded-2xl p-4 bg-white my-2">
        <h3 className="mb-2 text-md font-semibold">
          Step 1: Choose your investment type
        </h3>
        Choose what type of investment you would like to calculate, with each
        option displaying bespoke dashboard outputs to suit your investment
        profile
      </div>
      <div className="shadow-xl rounded-2xl p-4 bg-white my-2">
        <h3 className="mb-2 text-md font-semibold">
          Step 2: Input your assumptions
        </h3>
        Choose your inputs for simplified revenue, cost, and timing assumptions.
        With helpful validation of inputs, and relevant tooltip helpers, anyone
        is able to use the tool
      </div>
      <div className="shadow-xl rounded-2xl p-4 bg-white my-2">
        <h3 className="mb-2 text-md font-semibold">
          Step 3: View your dashboard
        </h3>
        Simple dashboard output summarise investment metrics, and forecast
        simple cashflows with easy to understand visual outputs. Log in to your
        account to modify your assumptions to test different investment
        scenarios
      </div>
      <h2 className="my-2 text-l font-semibold">Who Is It For</h2>
      <div className="shadow-xl rounded-2xl overflow-hidden bg-white my-2 flex flex-col md:flex-row md:h-80 w-full">
        <div
          className="w-700px md:w-full h-400px md:h-auto bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${owner})`,
          }}
        />
        <div className="flex flex-col justify-center p-3 mb-8 md:mb-0">
          <h3 className="mb-4 text-md font-semibold px-6">Owners</h3>
          <p className="px-6">
            Forcast monthly mortgage and home ownership payments for your own
            home, with ability to forecast future growth of property values, and
            operating costs
          </p>
        </div>
      </div>
      <div className="shadow-xl rounded-2xl overflow-hidden bg-white my-2 flex flex-col-reverse md:flex-row md:h-80 w-full">
        <div className="flex flex-col justify-center p-3 mb-8 md:mb-0">
          <h3 className="mb-4 text-md font-semibold px-6">Investors</h3>
          <p className="px-6">
            See your rental return and homeloan repayments on an investment
            property to see what type of investment your are able to afford
          </p>
        </div>
        <div
          className="w-700px md:w-full h-400px md:h-auto bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${investor})`,
          }}
        />
      </div>
      <div className="shadow-xl rounded-2xl overflow-hidden bg-white my-2 flex flex-col md:flex-row md:h-80 w-full">
        <div
          className="w-700px md:w-full h-400px md:h-auto bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${developer})`,
          }}
        />
        <div className="flex flex-col justify-center p-3 mb-8 md:mb-0">
          <h3 className="mb-4 text-md font-semibold px-6">Developers</h3>
          <p className="px-6">
            Buy, build, and then sell or rent. Forecast your total investment
            needs, with construction and investment debt
          </p>
        </div>
      </div>
      <div className="shadow-xl rounded-2xl overflow-hidden bg-white my-2 flex flex-col-reverse md:flex-row md:h-80 w-full">
        <div className="flex flex-col justify-center p-3 mb-8 md:mb-0">
          <h3 className="mb-4 text-md font-semibold px-6">First Home Buyers</h3>
          <p className="px-6">
            Test the maximum price you can pay, and estimate your monthly
            mortgage payments for purchasing your first property with easy to
            grasp inputs and helpful description on each assumption you make
          </p>
        </div>
        <div
          className="w-700px md:w-full h-400px md:h-auto bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${firstHomeBuyer})`,
          }}
        />
      </div>
      <div className="shadow-xl rounded-2xl overflow-hidden bg-white my-2 flex flex-col md:flex-row md:h-80 w-full">
        <div
          className="w-700px md:w-full h-400px md:h-auto bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${financiers})`,
          }}
        />
        <div className="flex flex-col justify-center p-3 mb-8 md:mb-0">
          <h3 className="mb-4 text-md font-semibold px-6">Financiers</h3>
          <p className="px-6">
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
