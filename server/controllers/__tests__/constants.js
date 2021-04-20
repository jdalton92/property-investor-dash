const constants = {
  ownerData: {
    housePrice: 1000000,
    deposit: 200000,
    loanType: "principalAndInterest",
    interestRate: 3.5,
    homeloanTerm: 30,
    overPayments: [{}],
    investmentPeriod: 15,
    sellingCosts: 3,
    capitalGrowth: 3.5,
    upfrontCosts: 3,
    recurringCosts: 1000,
    rentalYield: 3,
    investor: false,
    inflation: 3,
  },
  developerData: {
    acquisitionPrice: 100000,
    acquisitionCosts: 5,
    dwellings: 4,
    constructionCostPerDwelling: 400000,
    designFees: 10,
    constructionContingency: 10,
    statutoryFees: 3,
    constructionDuration: 24,
    planningAndDesign: 6,

    revenuePerDwelling: 750000,
    sellingCosts: 5,
    investmentPeriod: 5,
    recurringCosts: 30,
    rentalYield: 4,

    initialEquity: 400000,
    loanType: "interestOnly",
    interestRate: 3.5,
    loanTerm: 30,
    overPayments: [{}],

    capitalGrowth: 3.5,
    constructionCostGrowth: 2.5,
  },
};

module.exports = constants;
