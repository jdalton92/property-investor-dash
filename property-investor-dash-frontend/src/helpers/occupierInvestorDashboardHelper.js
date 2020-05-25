import { currencyFormatter, reducerHelper } from "./dashboardHelper";

export const occupierInvestorCalculation = ({
  housePrice,
  deposit,
  loanType,
  interestRate,
  homeloanTerm,
  overPayments,
  investmentPeriod,
  sellingCosts,
  capitalGrowth,
  upfrontCosts,
  recurringCosts,
  rentalYield,
  investor,
  inflation,
}) => {
  // If value undefined then default to zero
  // All other inputs are required
  if (!sellingCosts) {
    sellingCosts = 0;
  }
  if (!capitalGrowth) {
    capitalGrowth = 0;
  }
  if (!upfrontCosts) {
    upfrontCosts = 0;
  }
  if (!recurringCosts) {
    recurringCosts = 0;
  }
  if (!inflation) {
    inflation = 0;
  }
  if (!overPayments) {
    overPayments = [{}];
  }
  //Initalise loan variables
  const t = investmentPeriod * 12;
  const r = interestRate / 100;
  let openingBalance = 0;
  let closingBalance = 0;
  let monthSummary = [];

  //Master Loop over investment period
  for (let i = 0; i < t; i++) {
    const purchasePrice = i === 0 ? parseInt(housePrice) : null;
    const initialCosts = i === 0 ? (purchasePrice * upfrontCosts) / 100 : null;

    const grossRealisation =
      i === t - 1
        ? housePrice * Math.pow(1 + capitalGrowth / 100 / 12, i)
        : null;

    const sellingCost = (grossRealisation * sellingCosts) / 100;

    //Finance calculations
    const debtUse = i === 0 ? housePrice - deposit + initialCosts : null;
    const equityUse = i === 0 ? parseInt(deposit) : null;

    openingBalance = closingBalance + debtUse;

    const openingBalanceInterest = openingBalance * (1 + r / 12);

    const n = homeloanTerm * 12 - i;
    const monthlyRepayment =
      loanType === "interestOnly"
        ? (openingBalance * r) / 12
        : ((r / 12) * openingBalance * Math.pow(1 + r / 12, n)) /
          (Math.pow(1 + r / 12, n) - 1);

    const annualOverPayment = overPayments
      .filter((p) => parseInt(p.year) * 12 === i + 1)
      .reduce((a, b) => a + b.payment, 0);

    let loanInstallment = 0;
    if (i <= homeloanTerm * 12 - 1) {
      loanInstallment =
        monthlyRepayment + annualOverPayment > openingBalanceInterest
          ? openingBalanceInterest
          : monthlyRepayment + annualOverPayment;
    }

    const principalRepayment =
      i === homeloanTerm * 12 - 1 || i === t - 1
        ? openingBalanceInterest - loanInstallment
        : null;

    closingBalance =
      openingBalanceInterest - loanInstallment - principalRepayment;

    // Rental income
    const rentalIncome = investor
      ? (housePrice * Math.pow(1 + capitalGrowth / 100 / 12, i) * rentalYield) /
        100 /
        12
      : null;
    const opex = investor
      ? (recurringCosts / 100) * rentalIncome
      : (recurringCosts / 12) * Math.pow(1 + inflation / 100 / 12, i);

    const preFinanceCashflow =
      -purchasePrice -
      initialCosts -
      opex +
      rentalIncome +
      grossRealisation -
      sellingCost;

    const postFinanceCashflow =
      preFinanceCashflow + debtUse - loanInstallment - principalRepayment;

    monthSummary.push({
      month: i + 1,
      year: Math.ceil((i + 1) / 12),
      purchasePrice,
      initialCosts,
      rentalIncome,
      opex,
      grossRealisation,
      sellingCost,
      preFinanceCashflow,
      openingBalance,
      equityUse,
      debtUse,
      interest: openingBalanceInterest - openingBalance,
      loanInstallment,
      principalRepayment,
      closingBalance,
      postFinanceCashflow,
    });
  }
  return monthSummary;
};

export const cumulativeChartParse = (data) => {
  const labels = data.map((c) => c.month);
  const cumulativeCashflow = data.reduce((acc, c) => {
    acc.push(
      c.postFinanceCashflow + (acc.length > 0 ? acc[acc.length - 1] : 0)
    );
    return acc;
  }, []);

  const dataObject = {
    data: {
      datasets: [
        {
          data: [...cumulativeCashflow],
          fill: true,
          backgroundColor: "#92bed2",
          pointBackgroundColor: "#3282bf",
          borderColor: "#3282bf",
          pointHighlightStroke: "#3282bf",
          borderCapStyle: "butt",
        },
      ],
      labels: [...labels],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a dollar sign in the ticks
              callback: (value) => {
                return currencyFormatter.format(value);
              },
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Month",
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            return currencyFormatter.format(tooltipItem.yLabel);
          },
          beforeTitle: (tooltipItem, object) => {
            return "Month";
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };
  return dataObject;
};

export const cardParse = (data) => {
  const summaryData = reducerHelper(data);

  const dataObject = {
    months: data.length,
    rentalIncome: summaryData.rentalIncome,
    opex: summaryData.opex,
    mortgageInterest: summaryData.interest,
    mortgagePayment: summaryData.loanInstallment,
    profit: summaryData.postFinanceCashflow,
  };

  return dataObject;
};

export const tableParse = (data) => {
  let tableData = {
    summaryCashflow: [],
    annualCashflow: [],
  };

  for (let i = 1; i <= Math.ceil(data.length / 12); i++) {
    const annualData = reducerHelper(data.filter((d) => d.year === i));

    tableData.annualCashflow.push({
      year: i,
      acquisitionCosts: -annualData.purchasePrice - annualData.initialCosts,
      rentalIncome: annualData.rentalIncome,
      opex: -annualData.opex,
      netSale: annualData.grossRealisation - annualData.sellingCost,
      preFinanceCashflow: annualData.preFinanceCashflow,
      debtUse: annualData.debtUse,
      equityUse: -annualData.equityUse,
      fundingCost: -annualData.loanInstallment - annualData.principalRepayment,
      postFinanceCashflow: annualData.postFinanceCashflow,
      totalIncome: annualData.rentalIncome + annualData.grossRealisation,
      totalCost:
        -annualData.equityUse -
        annualData.initialCosts -
        annualData.opex -
        annualData.sellingCost -
        annualData.loanInstallment -
        annualData.principalRepayment,
    });
  }

  const summaryData = reducerHelper(data);

  tableData.summaryCashflow.push({
    year: null,
    acquisitionCosts: -summaryData.purchasePrice - summaryData.initialCosts,
    rentalIncome: summaryData.rentalIncome,
    opex: -summaryData.opex,
    netSale: summaryData.grossRealisation - summaryData.sellingCost,
    preFinanceCashflow: summaryData.preFinanceCashflow,
    debtUse: summaryData.debtUse,
    equityUse: -summaryData.equityUse,
    fundingCost: -summaryData.loanInstallment - summaryData.principalRepayment,
    postFinanceCashflow: summaryData.postFinanceCashflow,
    totalIncome: summaryData.rentalIncome + summaryData.grossRealisation,
    totalCost:
      -summaryData.equityUse -
      summaryData.initialCosts -
      summaryData.opex -
      summaryData.sellingCost -
      summaryData.loanInstallment -
      summaryData.principalRepayment,
  });
  return tableData;
};

export const occupierInvestorMOCCalculation = (data) => {
  const summaryData = data.reduce((accumulator, item) => {
    Object.keys(item).forEach((key) => {
      accumulator[key] = (accumulator[key] || 0) + item[key];
    });
    return accumulator;
  }, []);

  const netProfit = summaryData.postFinanceCashflow;
  const cost =
    summaryData.purchasePrice +
    summaryData.initialCosts +
    summaryData.opex +
    summaryData.loanInstallment +
    summaryData.sellingCost;

  return netProfit / cost;
};
