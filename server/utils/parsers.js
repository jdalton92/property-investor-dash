const jwt = require("jsonwebtoken");
const sCurveData = require("./sCurve.json");

const userTokenParser = (user) => {
  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return {
    token,
    id: user._id,
    email: user.email,
    messagesRead: user.messagesRead,
  };
};

const occupierInvestorCashflow = ({
  capitalGrowth,
  opexGrowth,
  purchasePrice,
  ownershipLength,
  upfrontCosts,
  sellingCosts,
  opex,
  deposit,
  homeloanTerm,
  repaymentType,
  interestRate,
  overPayment,
  rentalYield,
}) => {
  // Initalise loan variables
  const t = ownershipLength * 12;
  const r = interestRate / 100;
  opexGrowth = opexGrowth / 100;
  capitalGrowth = capitalGrowth / 100;
  rentalYield = rentalYield / 100;
  let openingBalance = 0;
  let closingBalance = 0;
  let monthSummary = [];

  // Master Loop over investment period
  for (let i = 0; i < t; i++) {
    const year = Math.ceil((i + 1) / 12);
    const annualIndex = year - 1;
    const acquisition = i === 0 ? purchasePrice : null;
    const upfrontCost = i === 0 ? (purchasePrice * upfrontCosts) / 100 : null;

    const grossRealisation =
      i === t - 1
        ? purchasePrice * Math.pow(1 + capitalGrowth, annualIndex)
        : null;

    const sellingCost = (grossRealisation * sellingCosts) / 100;

    // Finance calculations
    const debtUse = i === 0 ? purchasePrice - deposit : null;
    const equityUse = i === 0 ? deposit + upfrontCost : null;

    openingBalance = closingBalance + debtUse;

    const openingBalanceAndInterest = openingBalance * (1 + r / 12);

    const n = homeloanTerm * 12 - i;
    const monthlyRepayment =
      repaymentType === "interestOnly"
        ? (openingBalance * r) / 12
        : ((r / 12) * openingBalance * Math.pow(1 + r / 12, n)) /
          (Math.pow(1 + r / 12, n) - 1);

    let loanInstallment = 0;
    if (i <= homeloanTerm * 12 - 1) {
      loanInstallment =
        monthlyRepayment + overPayment > openingBalanceAndInterest
          ? openingBalanceAndInterest
          : monthlyRepayment + overPayment;
    }

    const principalRepayment =
      i === homeloanTerm * 12 - 1 || i === t - 1
        ? openingBalanceAndInterest - loanInstallment
        : null;

    closingBalance =
      openingBalanceAndInterest - loanInstallment - principalRepayment;

    // Rental income
    const rentalIncome =
      (purchasePrice * Math.pow(1 + capitalGrowth, annualIndex) * rentalYield) /
      12;

    opexCosts = (opex / 12) * Math.pow(1 + opexGrowth, annualIndex);

    const preFinanceCashflow =
      -acquisition -
      upfrontCost -
      opexCosts +
      rentalIncome +
      grossRealisation -
      sellingCost;

    const postFinanceCashflow =
      preFinanceCashflow + debtUse - loanInstallment - principalRepayment;

    monthSummary.push({
      month: i + 1,
      year,
      annualIndex,
      acquisition,
      upfrontCost,
      rentalIncome,
      opex: opexCosts,
      grossRealisation,
      sellingCost,
      preFinanceCashflow,
      openingBalance,
      equityUse,
      debtUse,
      interest: openingBalanceAndInterest - openingBalance,
      loanInstallment,
      principalRepayment,
      closingBalance,
      postFinanceCashflow,
    });
  }
  return monthSummary;
};

const developerCashflow = ({
  acquisitionPrice,
  acquisitionCosts,
  dwellings,
  constructionCostPerDwelling,
  designFees,
  constructionContingency,
  statutoryFees,
  constructionDuration,
  planningAndDesign,

  revenuePerDwelling,
  sellingCosts,
  investmentPeriod,
  recurringCosts,
  rentalYield,

  initialEquity,
  loanType,
  interestRate,
  loanTerm,
  overPayments,

  capitalGrowth,
  constructionCostGrowth,
}) => {
  // If value undefined then default to zero
  // All other inputs are required
  if (!designFees) {
    designFees = 0;
  }
  if (!investmentPeriod) {
    investmentPeriod = 0;
  }
  if (!statutoryFees) {
    statutoryFees = 0;
  }
  if (!sellingCosts) {
    sellingCosts = 0;
  }
  if (!recurringCosts) {
    recurringCosts = 0;
  }
  if (!capitalGrowth) {
    capitalGrowth = 0;
  }
  if (!constructionCostGrowth) {
    constructionCostGrowth = 0;
  }
  if (!overPayments) {
    overPayments = [{}];
  }
  if (!acquisitionCosts) {
    acquisitionCosts = 0;
  }
  // Initialise constant variables
  const deliveryPhase = planningAndDesign + constructionDuration;
  const investmentEnd =
    planningAndDesign + constructionDuration + investmentPeriod * 12;
  const loanEnd = planningAndDesign + constructionDuration + loanTerm * 12;
  const sCurveRef = constructionDuration - 1;
  const totalConstructionCost =
    dwellings *
    constructionCostPerDwelling *
    Math.pow(
      1 + constructionCostGrowth / 100 / 12,
      planningAndDesign + Math.ceil(constructionDuration / 2) - 1 //escalate construction costs to middle of construction period
    );
  const grossSale =
    dwellings *
    revenuePerDwelling *
    Math.pow(
      1 + capitalGrowth / 100 / 12,
      deliveryPhase + investmentPeriod * 12 - 1
    );

  //Initalise finance variables
  let cumulativeFundableCosts = 0;
  const t = investmentEnd;
  const r = interestRate / 100;
  let closingBalance = 0;

  // Initialise summary output
  let monthSummary = [];

  // Master Loop over investment period
  for (let i = 0; i < t; i++) {
    // Initialise Flags
    const constFlag = i > planningAndDesign - 1 && i < deliveryPhase;
    const deliveryFlag = i < deliveryPhase;
    const investFlag = i > deliveryPhase - 1 && i < investmentEnd;

    // Acquisition Costs
    const acquisition =
      i === planningAndDesign
        ? acquisitionPrice *
          Math.pow(1 + capitalGrowth / 100 / 12, planningAndDesign)
        : null;

    const initialCosts =
      i === planningAndDesign ? (acquisitionCosts / 100) * acquisition : null;

    // Delivery Period Costs
    const sCurve = !constFlag
      ? null
      : constructionDuration > 50
      ? 1 / constructionDuration
      : sCurveData.default[sCurveRef][constructionDuration.toString()][
          i - planningAndDesign
        ];

    const constructionCost = constFlag
      ? totalConstructionCost * parseFloat(sCurve)
      : null;

    const professionalFees = deliveryFlag
      ? ((designFees / 100) * totalConstructionCost) / deliveryPhase
      : null;

    const statutoryCosts =
      i === planningAndDesign
        ? (statutoryFees / 100) * totalConstructionCost
        : null;

    const contingency = constFlag
      ? (constructionContingency / 100) * constructionCost
      : null;

    // Revenues & Investment Period Costs
    const grossRealisation = i === investmentEnd - 1 ? grossSale : null;

    const sellingCost = (grossRealisation * sellingCosts) / 100;

    const rentalIncome = investFlag
      ? (dwellings *
          revenuePerDwelling *
          Math.pow(1 + capitalGrowth / 100 / 12, i) *
          rentalYield) /
        100 /
        12
      : null;

    const opex = investFlag ? (recurringCosts / 100) * rentalIncome : null;

    // Finance costs
    const fundableCosts =
      acquisition +
      initialCosts +
      constructionCost +
      professionalFees +
      statutoryCosts +
      contingency;

    cumulativeFundableCosts += fundableCosts;

    const equitySource =
      cumulativeFundableCosts < initialEquity
        ? fundableCosts
        : cumulativeFundableCosts - initialEquity < fundableCosts
        ? fundableCosts - (cumulativeFundableCosts - initialEquity)
        : null;

    const equityWithdraw = i === investmentEnd - 1 ? initialEquity : null;

    const debtSource =
      cumulativeFundableCosts > initialEquity
        ? cumulativeFundableCosts - initialEquity < fundableCosts
          ? cumulativeFundableCosts - initialEquity
          : fundableCosts
        : null;

    const openingBalance = closingBalance;

    const openingBalanceInterest = openingBalance * (1 + r / 12);

    const n = deliveryPhase + loanTerm * 12 - i;
    let loanPayment = 0;
    if (i > deliveryPhase - 1 && i < loanEnd) {
      loanPayment =
        loanType === "interestOnly"
          ? (openingBalance * r) / 12
          : Math.min(
              ((r / 12) * openingBalance * Math.pow(1 + r / 12, n)) /
                (Math.pow(1 + r / 12, n) - 1),
              openingBalanceInterest
            );
    }

    const annualOverPayment = overPayments
      .filter((p) => parseInt(p?.year) * 12 === i + 1)
      .reduce((a, b) => a + b?.payment, 0);

    const loanInstallment = loanPayment + annualOverPayment;

    const principalRepayment =
      i === loanEnd - 1 || i === investmentEnd - 1
        ? openingBalanceInterest - loanInstallment
        : null;

    closingBalance =
      openingBalanceInterest +
      debtSource -
      loanInstallment -
      principalRepayment;

    //Summary cashflow items
    const preFinanceCashflow =
      -acquisition -
      initialCosts -
      constructionCost -
      professionalFees -
      statutoryCosts -
      contingency +
      grossRealisation -
      sellingCost +
      rentalIncome -
      opex;

    const postFinanceCashflow =
      preFinanceCashflow + debtSource - loanInstallment - principalRepayment;

    //Add month summary object to summary array
    monthSummary.push({
      month: i + 1,
      year: Math.ceil((i + 1) / 12),
      acquisition,
      initialCosts,
      constructionCost,
      professionalFees,
      statutoryCosts,
      contingency,
      grossRealisation,
      sellingCost,
      rentalIncome,
      opex,
      preFinanceCashflow,
      openingBalance,
      interest: openingBalanceInterest - openingBalance,
      loanInstallment,
      principalRepayment,
      closingBalance,
      equitySource,
      equityWithdraw,
      debtSource,
      postFinanceCashflow,
    });
  }
  return monthSummary;
};

module.exports = {
  userTokenParser,
  occupierInvestorCashflow,
  developerCashflow,
};
