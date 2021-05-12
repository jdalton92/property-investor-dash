import { currencyFormatter, sumFields } from "./dashboardHelper";

export const cumulativeChartParse = (data) => {
  const labels = data.map((c) => c.month);
  const cumulativeCashflow = data.reduce((acc, curr) => {
    acc.push(
      curr.postFinanceCashflow + (acc.length > 0 ? acc[acc.length - 1] : 0)
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
  const summaryData = sumFields(data);

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
    totalCashflow: {},
    annualCashflow: [],
  };

  for (let i = 1; i <= Math.ceil(data.length / 12); i++) {
    const annualData = sumFields(data.filter((d) => d.year === i));

    tableData.annualCashflow.push({
      year: i,
      acquisitionCosts: -annualData.acquisition - annualData.upfrontCost,
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
        annualData.upfrontCost -
        annualData.opex -
        annualData.sellingCost -
        annualData.loanInstallment -
        annualData.principalRepayment,
    });
  }

  const totalData = sumFields(data);

  tableData.totalCashflow = {
    year: null,
    acquisitionCosts: -totalData.acquisition - totalData.upfrontCost,
    rentalIncome: totalData.rentalIncome,
    opex: -totalData.opex,
    netSale: totalData.grossRealisation - totalData.sellingCost,
    preFinanceCashflow: totalData.preFinanceCashflow,
    debtUse: totalData.debtUse,
    equityUse: -totalData.equityUse,
    fundingCost: -totalData.loanInstallment - totalData.principalRepayment,
    postFinanceCashflow: totalData.postFinanceCashflow,
    totalIncome: totalData.rentalIncome + totalData.grossRealisation,
    totalCost:
      -totalData.equityUse -
      totalData.upfrontCost -
      totalData.opex -
      totalData.sellingCost -
      totalData.loanInstallment -
      totalData.principalRepayment,
  };
  return tableData;
};

export const occupierInvestorMOCCalculation = (data) => {
  const summaryData = sumFields(data);
  const netProfit = summaryData.postFinanceCashflow;
  const cost =
    summaryData.acquisition +
    summaryData.upfrontCost +
    summaryData.opex +
    summaryData.loanInstallment +
    summaryData.sellingCost;

  return netProfit / cost;
};
