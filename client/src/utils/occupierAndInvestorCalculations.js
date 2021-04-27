import { currencyFormatter, reducerHelper } from "./dashboardHelper";

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
