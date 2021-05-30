const occupierDashboardAssumptions = {
  capitalGrowth: 5,
  opexGrowth: 2.5,
  purchasePrice: 1000000,
  ownershipLength: 2,
  upfrontCosts: 5,
  sellingCosts: 2,
  opex: 5000,
  deposit: 200000,
  homeloanTerm: 2,
  repaymentType: "principalAndInterest",
  interestRate: 2,
  overPayment: 0,
};

const investorDashboardAssumptions = {
  capitalGrowth: 5,
  opexGrowth: 2.5,
  purchasePrice: 1000000,
  ownershipLength: 2,
  upfrontCosts: 5,
  sellingCosts: 2,
  opex: 5000,
  deposit: 200000,
  homeloanTerm: 2,
  repaymentType: "principalAndInterest",
  interestRate: 2,
  overPayment: 0,
  rentalYield: 3,
};

const developerDashboardAssumptions = {
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
  repaymentType: "interestOnly",
  interestRate: 3.5,
  loanTerm: 30,
  overPayment: 0,

  capitalGrowth: 3.5,
  constructionCostGrowth: 2.5,
};

const occupierCashflowFields = [
  "month",
  "year",
  "annualIndex",
  "acquisition",
  "upfrontCost",
  "rentalIncome",
  "opex",
  "grossRealisation",
  "sellingCost",
  "preFinanceCashflow",
  "openingBalance",
  "equityUse",
  "debtUse",
  "interest",
  "loanInstallment",
  "principalRepayment",
  "closingBalance",
  "postFinanceCashflow",
];

const investorCashflowFields = occupierCashflowFields;

const developerCashflowFields = [
  "month",
  "year",
  "acquisition",
  "initialCosts",
  "constructionCost",
  "professionalFees",
  "statutoryCosts",
  "contingency",
  "grossRealisation",
  "sellingCost",
  "rentalIncome",
  "opex",
  "preFinanceCashflow",
  "openingBalance",
  "interest",
  "loanInstallment",
  "principalRepayment",
  "closingBalance",
  "equitySource",
  "equityWithdraw",
  "debtSource",
  "postFinanceCashflow",
];

const dashboardFields = [
  "assumptions",
  "created",
  "type",
  "_id",
  "user",
  "description",
  "address",
];

module.exports = {
  dashboardFields,
  occupierCashflowFields,
  investorCashflowFields,
  developerCashflowFields,
  occupierDashboardAssumptions,
  investorDashboardAssumptions,
  developerDashboardAssumptions,
};
