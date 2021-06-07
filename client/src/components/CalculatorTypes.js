import React from "react";
import { useHistory } from "react-router-dom";
import Icon from "./Shared/Icon";
import HomeOwnerIcon from "../styles/svg/home-owner.svg";
import FinanceIcon from "../styles/svg/finance.svg";
import UnitsIcon from "../styles/svg/units.svg";
import ownerOccupierImage from "../styles/images/owner-occupier.jfif";
import investorImage from "../styles/images/investor.jfif";
import developerImage from "../styles/images/developer.jfif";

const CalculatorTypes = () => {
  const history = useHistory();
  const handleLink = (url) => {
    history.push(url);
  };

  return (
    <>
      <h1 className="f24 bold mt16 mb8">Calculator Types</h1>
      <h2 className="f16 bold mt8 mb16">
        <span
          className="link"
          onClick={() => handleLink("/owner-occupier/edit")}
        >
          Calculator 1: Owner-Occupier
        </span>
      </h2>
      <div className="card r bs-3 bg-1 mb20 flex-row jump">
        <div
          className="card-img"
          style={{
            backgroundImage: `url(${ownerOccupierImage})`,
          }}
        />
        <div className="p20 flex-col justify-c">
          Use the owner-occupier calculator if you are looking to purchase and
          live in your own home. This profile suits users such as
          first-home-buyers, upsizers/downsizes, as well as potential financiers
          who are looking to test mortgage terms for owner-occupiers
          <button
            type="button"
            className="form-button-p bs-3 font-white mt20 pt4 pb4 flex-row align-c justify-c"
            onClick={() => handleLink("/owner-occupier/edit")}
          >
            <Icon
              size={"20px"}
              url={HomeOwnerIcon}
              color={"white"}
              hover={false}
              active={false}
            />
            <span className="ml8">Try Now</span>
          </button>
        </div>
      </div>
      <h2 className="f16 bold mt16 mb16">
        <span className="link" onClick={() => handleLink("/investor/edit")}>
          Calculator 2: Investor
        </span>
      </h2>
      <div className="card-rev r bs-3 bg-1 mb20 flex-row jump">
        <div className="p20 flex-col justify-c">
          The investor profile will suit you if you are looking to forecast
          income and expenses for the purchase an investment property to rent,
          or if you are looking to buy a home to live in and rent a room for
          additonal income.
          <button
            type="button"
            className="form-button-p bs-3 font-white mt20 pt4 pb4 flex-row align-c justify-c"
            onClick={() => handleLink("/investor/edit")}
          >
            <Icon
              size={"20px"}
              url={FinanceIcon}
              color={"white"}
              hover={false}
              active={false}
            />
            <span className="ml8">Try Now</span>
          </button>
        </div>
        <div
          className="card-img"
          style={{
            backgroundImage: `url(${investorImage})`,
          }}
        />
      </div>
      <h2 className="f16 bold mt16 mb16">
        <span className="link" onClick={() => handleLink("/developer/edit")}>
          Calculator 3: Developer
        </span>
      </h2>
      <div className="card r bs-3 bg-1 mb20 flex-row jump">
        <div
          className="card-img"
          style={{
            backgroundImage: `url(${developerImage})`,
          }}
        />
        <div className="p20 flex-col justify-c">
          If you are looking to purchase and renovate or build, then the
          developer profile is for you. Includes option to sell on completion of
          construction, or hold for an investment period. Financiers can also
          test estimated funding costs of a constructioon loan that is able to
          be rolled into an investment facility
          <button
            type="button"
            className="form-button-p bs-3 font-white mt20 pt4 pb4 flex-row align-c justify-c"
            onClick={() => handleLink("/developer/edit")}
          >
            <Icon
              size={"20px"}
              url={UnitsIcon}
              color={"white"}
              hover={false}
              active={false}
            />
            <span className="ml8">Try Now</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CalculatorTypes;
