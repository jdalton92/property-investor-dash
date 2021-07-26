import React from "react";
import { useHistory } from "react-router-dom";
import Button from "./Shared/Button";
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
      <h1 className="my-2 text-2xl font-semibold">Calculator Types</h1>
      <h2 className="my-2 text-l font-semibold">
        <span
          className="hover:underline cursor-pointer"
          onClick={() => handleLink("/owner-occupier/edit")}
        >
          Calculator 1: Owner-Occupier
        </span>
      </h2>
      <div className="shadow-xl rounded-2xl overflow-hidden bg-white my-2 flex flex-col md:flex-row md:h-80 w-full">
        <div
          className="w-full h-400px md:h-auto bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${ownerOccupierImage})`,
          }}
        />
        <div className="flex flex-col justify-center p-3 mb-8 md:mb-0">
          <p className="px-6 mb-4">
            Use the owner-occupier calculator if you are looking to purchase and
            live in your own home. This profile suits users such as
            first-home-buyers, upsizers/downsizes, as well as potential
            financiers who are looking to test mortgage terms for
            owner-occupiers
          </p>
          <Button
            label={"Try Now"}
            type={"button"}
            options={{
              styleType: "primary",
              buttonClass: "h-10 px-2 w-28 ml-6",
              icon: "home-owner",
              iconClass: "h-8 w-8 mr-2",
              onClick: () => handleLink("/owner-occupier/edit"),
            }}
          />
        </div>
      </div>
      <h2 className="my-2 text-l font-semibold">
        <span
          className="hover:underline cursor-pointer"
          onClick={() => handleLink("/investor/edit")}
        >
          Calculator 2: Investor
        </span>
      </h2>
      <div className="shadow-xl rounded-2xl overflow-hidden bg-white my-2 flex flex-col-reverse md:flex-row md:h-80 w-full">
        <div className="flex flex-col justify-center p-3 mb-8 md:mb-0">
          <p className="px-6 mb-4">
            The investor profile will suit you if you are looking to forecast
            income and expenses for the purchase an investment property to rent,
            or if you are looking to buy a home to live in and rent a room for
            additonal income.
          </p>
          <Button
            label={"Try Now"}
            type={"button"}
            options={{
              styleType: "primary",
              buttonClass: "h-10 px-2 w-28 ml-6",
              icon: "finance",
              iconClass: "h-8 w-8 mr-2",
              onClick: () => handleLink("/investor/edit"),
            }}
          />
        </div>
        <div
          className="w-full h-400px md:h-auto bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${investorImage})`,
          }}
        />
      </div>
      <h2 className="my-2 text-l font-semibold">
        <span
          className="hover:underline cursor-pointer"
          onClick={() => handleLink("/developer/edit")}
        >
          Calculator 3: Developer
        </span>
      </h2>
      <div className="shadow-xl rounded-2xl overflow-hidden bg-white my-2 flex flex-col md:flex-row md:h-80 w-full">
        <div
          className="w-full h-400px md:h-auto bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${developerImage})`,
          }}
        />
        <div className="flex flex-col justify-center p-3 mb-8 md:mb-0">
          <p className="px-6 mb-4">
            If you are looking to purchase and renovate or build, then the
            developer profile is for you. Includes option to sell on completion
            of construction, or hold for an investment period. Financiers can
            also test estimated funding costs of a constructioon loan that is
            able to be rolled into an investment facility
          </p>
          <Button
            label={"Try Now"}
            type={"button"}
            options={{
              styleType: "primary",
              buttonClass: "h-10 px-2 w-28 ml-6",
              icon: "units",
              iconClass: "h-8 w-8 mr-2",
              onClick: () => handleLink("/developer/edit"),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CalculatorTypes;
